import { NextResponse } from "next/server";

export const maxDuration = 300; // 5 minutes for image generation
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { prompt, image } = await req.json();
    console.log("Image generation request for:", prompt);

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Call Replicate API for image generation
    // Using stability-ai/stable-diffusion for interior design
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${process.env.REPLICATE_API_KEY}`,
      },
      body: JSON.stringify({
        version: "ac732df83cea7fff18b8472768c88ad041fa750ff7682a21f818609fc6cd15d3",
        input: {
          prompt: prompt,
          negative_prompt: "blurry, low quality, distorted, ugly, deformed",
          width: 1024,
          height: 1024,
          num_outputs: 1,
          num_inference_steps: 50,
          guidance_scale: 7.5,
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Replicate API Error:", errorData);
      return NextResponse.json(
        { error: errorData.detail || "Replicate API request failed" },
        { status: response.status }
      );
    }

    const prediction = await response.json();
    console.log("Prediction started:", prediction.id);

    // Poll for the result
    let result = prediction;
    const maxAttempts = 60; // 5 minutes max (with 5 second delays)
    let attempts = 0;

    while (result.status !== "succeeded" && result.status !== "failed" && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
      
      const pollResponse = await fetch(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
        headers: {
          "Authorization": `Token ${process.env.REPLICATE_API_KEY}`,
        },
      });
      
      if (!pollResponse.ok) {
        throw new Error(`Poll failed: ${pollResponse.status}`);
      }
      
      result = await pollResponse.json();
      console.log("Poll status:", result.status);
      attempts++;
    }

    if (result.status === "failed") {
      return NextResponse.json({ error: "Image generation failed" }, { status: 500 });
    }

    if (attempts >= maxAttempts) {
      return NextResponse.json({ error: "Generation timed out" }, { status: 504 });
    }

    const imageUrl = result.output?.[0];
    
    if (!imageUrl) {
      return NextResponse.json({ error: "No image generated" }, { status: 500 });
    }

    console.log("Image generated successfully:", imageUrl);
    return NextResponse.json({ image: imageUrl });

  } catch (error: any) {
    console.error("Image generation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate image" },
      { status: 500 }
    );
  }
}
