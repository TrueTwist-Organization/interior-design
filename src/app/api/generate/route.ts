import { NextResponse } from "next/server";

export const maxDuration = 60;

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
// This is the stable, pinned version of adirik/interior-design
const MODEL_VERSION = "76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38";

export async function POST(req: Request) {
  try {
    const { image, prompt } = await req.json();

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

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
          prompt: prompt || "modern luxury interior design, ultra realistic, 4k",
          guidance_scale: 7.5,
          num_inference_steps: 40,
        },
      }),
    });

    const prediction = await createRes.json();

    if (!createRes.ok) {
      console.error(">>> [API] Create Error:", prediction);
      throw new Error(prediction?.detail || JSON.stringify(prediction));
    }

    console.log(">>> [API] Prediction created, ID:", prediction.id, "Status:", prediction.status);

    // Step 2: Poll for the result (max 55 seconds)
    let result = prediction;
    const deadline = Date.now() + 55000;

    while (result.status !== "succeeded" && result.status !== "failed") {
      if (Date.now() > deadline) throw new Error("Generation timed out after 55s");
      
      await new Promise(r => setTimeout(r, 2500));

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
