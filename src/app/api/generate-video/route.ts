import { NextResponse } from "next/server";

export const maxDuration = 300; 

const VIDEO_API_KEY = "02c256c961b4b2d2fb15a492e06223b206f0dd85dd4669e2c7cc2373a3e6d8f2f0ba982fa6ead9a2cfdf64beeeac5f47d581635d2543c782e3d7655a44316b13";

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    console.log(">>> [VIDEO API] Calling NVIDIA NIM SVD...");

    const response = await fetch("https://ai.api.nvidia.com/v1/genai/stabilityai/svd", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${VIDEO_API_KEY}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: image, // NVIDIA usually handles base64 or URL
        seed: 0,
        cfg_scale: 2.5,
        motion_bucket_id: 127
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(">>> [VIDEO API] NVIDIA Error:", data);
      throw new Error(data?.detail || "NVIDIA Video synthesis failed");
    }

    // NVIDIA NIM returns the video as a base64 or a direct link depending on the exact version
    // Usually it's { "artifacts": [{ "base64": "..." }] } or { "video": "url" }
    const videoData = data.artifacts?.[0]?.base64 || data.video || data.url;

    if (!videoData) {
      throw new Error("No video content returned from NVIDIA");
    }

    // If it's pure base64, we convert it to a data URI
    const finalVideo = videoData.startsWith("http") ? videoData : `data:video/mp4;base64,${videoData}`;

    return NextResponse.json({ video: finalVideo });

  } catch (error: any) {
    console.error(">>> [VIDEO API ERROR]:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
