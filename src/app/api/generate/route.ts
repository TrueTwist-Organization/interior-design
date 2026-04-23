import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const maxDuration = 60;

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

// This is the stable, pinned version of adirik/interior-design
const MODEL_VERSION = "76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38";

async function refinePromptWithGemini(roomType: string, style: string, userPrompt: string, angle: string) {
  if (!GEMINI_API_KEY) {
    console.warn(">>> [GEMINI] API Key missing, skipping refinement.");
    return `${style} ${roomType}, ${angle}, ${userPrompt}`;
  }

  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([
      `You are a Master Architectural Prompt Engineer. 
      CONTEXT:
      - Room Identity: ${roomType} (GROUND TRUTH)
      - Camera Angle/Perspective: ${angle} (CRITICAL: The prompt must describe looking at this specific side/view of the room)
      - Design Style: ${style}
      - User Input: "${userPrompt}"

      TASK:
      Create a high-end, extremely detailed English architectural prompt for an AI image generator. 
      
      RULES:
      1. TRANSLATE & PRIORITIZE: The User Input might be in Hindi, Gujarati, or English. You MUST translate it to English and make it the ABSOLUTE CENTRAL FOCUS of the prompt. If they ask for a specific color or furniture, it MUST be included.
      2. PERSPECTIVE: Tailor the layout to the ${angle}. (e.g., if it's a living room South View, maybe describe the sofa facing away, or a window view. If it's the North View, describe the TV wall). This ensures different angles of the same room look distinct!
      3. AESTHETICS: Use the ${style} aesthetic for all other elements.
      4. OUTPUT: Return ONLY a comma-separated list of professional photography keywords. No intro/outro.

      OUTPUT FORMAT:
      [Translated User Input Elements], [Angle-specific furniture arrangement for ${roomType}], ${style} style, architectural photography, 8k, cinematic lighting, masterpiece.`
    ]);

    const refined = result.response.text().trim();
    console.log(`>>> [GEMINI] Refined Prompt for ${angle}:`, refined);
    return refined;
  } catch (err) {
    console.error(">>> [GEMINI ERROR]:", err);
    return `${style} ${roomType}, ${angle}, ${userPrompt}`;
  }
}

export async function POST(req: Request) {
  try {
    const { image, roomType, style, prompt, seed, angle } = await req.json();

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    console.log(`>>> [API] Generating ${roomType} (${angle}) in ${style} style...`);
    
    // Refine prompt using the segregated ground-truth values
    const refinedPrompt = await refinePromptWithGemini(roomType, style, prompt || "", angle || "Primary View");

    console.log(">>> [API] Creating Replicate prediction...");

    // Step 1: Create prediction via correct REST endpoint
    const createRes = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: MODEL_VERSION,
        input: {
          image: `data:image/jpeg;base64,${image}`,
          prompt: refinedPrompt,
          negative_prompt: "empty room, unfurnished, bare walls, missing furniture, no sofa, no bed, low quality, worst quality, unrealistic, bad proportions, distorted, messy, cluttered, lowres, text, watermark, bad anatomy, different room type",
          a_prompt: "fully furnished, extremely detailed, professional architectural photography, cinematic lighting, masterpiece",
          n_prompt: "empty room, bare walls, missing furniture",
          guidance_scale: 15.0, // Maximum adherence to the refined prompt
          num_inference_steps: 45,
          prompt_strength: 0.82, // High strength while maintaining structural consistency
          ...(seed ? { seed } : {})
        },
      }),
    });

    const prediction = await createRes.json();

    if (!createRes.ok) {
      console.error(">>> [API] Create Error:", prediction);
      throw new Error(prediction?.detail || JSON.stringify(prediction));
    }

    console.log(">>> [API] Prediction created, ID:", prediction.id);

    // Step 2: Poll for the result (max 55 seconds)
    let result = prediction;
    const deadline = Date.now() + 55000;

    while (result.status !== "succeeded" && result.status !== "failed") {
      if (Date.now() > deadline) throw new Error("Generation timed out after 55s");
      
      await new Promise(r => setTimeout(r, 2000));

      const pollRes = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
        headers: { "Authorization": `Token ${REPLICATE_API_TOKEN}` },
      });
      result = await pollRes.json();
      console.log(">>> [API] Polling status:", result.status);
    }

    if (result.status === "failed") {
      throw new Error(result.error || "AI generation failed");
    }

    // output is usually [canny_map_url, final_image_url]
    const outputArr = result.output;
    const finalImage = Array.isArray(outputArr)
      ? outputArr[outputArr.length - 1]
      : outputArr;

    console.log(">>> [API] Success! Image URL:", finalImage);

    if (!finalImage || !String(finalImage).startsWith("http")) {
      throw new Error("Invalid image URL returned from AI");
    }

    return NextResponse.json({ image: String(finalImage) });

  } catch (error: any) {
    console.error(">>> [API ERROR]:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
