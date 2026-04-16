import { NextResponse } from "next/server";

export const maxDuration = 120; 

// Using the same Replicate token that works for images
const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

export async function POST(req: Request) {
  try {
    const { rooms, roomIndex = 0 } = await req.json();

    if (!rooms || rooms.length === 0) {
      return NextResponse.json({ error: "No rooms provided" }, { status: 400 });
    }

    const targetRoom = rooms[roomIndex] || rooms[0];
    const imageUrl = targetRoom.afterUrl;

    if (!imageUrl || !imageUrl.startsWith("http")) {
      return NextResponse.json({ error: "Please generate AI images first." }, { status: 400 });
    }

    console.log(`>>> [REPLICATE VIDEO] Starting generation for: ${targetRoom.name}`);

    // Using Stable Video Diffusion (SVD) on Replicate for realistic walkthrough motion
    const createRes = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // model: stability-ai/stable-video-diffusion-img2vid-xt-1-1
        version: "ac7327c20fcb11a84ec8197c36c4832551525992a5d9101d93273e04e43e7c85",
        input: {
          image: imageUrl,
          video_length: "25_frames_with_svd_xt",
          motion_bucket_id: 127,
          fps: 7
        },
      }),
    });

    const prediction = await createRes.json();

    if (!createRes.ok) {
      console.error(">>> [REPLICATE VIDEO ERROR]:", prediction);
      throw new Error(prediction?.detail || "Replicate Video API Error");
    }

    // Polling
    let result = prediction;
    const deadline = Date.now() + 115000;

    while (result.status !== "succeeded" && result.status !== "failed" && Date.now() < deadline) {
      await new Promise(r => setTimeout(r, 4000));
      const pollRes = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
        headers: { "Authorization": `Token ${REPLICATE_API_TOKEN}` },
      });
      result = await pollRes.json();
      console.log(`>>> [REPLICATE VIDEO] Status: ${result.status}`);
    }

    if (result.status === "failed") {
      throw new Error(result.error || "Video generation failed");
    }

    if (result.status !== "succeeded") {
      return NextResponse.json({ error: "Generation timed out" }, { status: 408 });
    }

    // result.output is usually a URL string for SVD
    const videoUrl = result.output;
    console.log(">>> [REPLICATE VIDEO] Ready:", videoUrl);

    return NextResponse.json({ video: videoUrl, name: targetRoom.name });

  } catch (error: any) {
    console.error(">>> [VIDEO API ERROR]:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
