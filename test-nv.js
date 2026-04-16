const NVIDIA_API_KEY = "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";

async function test() {
  const imageUrl = "https://replicate.delivery/pbxt/VwftUeWkXWb1I5B6Rbfh8K5b5K5L2zEqWeTfqf75BxfOSe0QA/output.png";
  console.log("Calling NVIDIA NIM...");
  try {
    const res = await fetch("https://ai.api.nvidia.com/v1/genai/stabilityai/stable-video-diffusion", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${NVIDIA_API_KEY}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: imageUrl,
        seed: 0,
        cfg_scale: 2.5,
        motion_bucket_id: 127
      })
    });
    const text = await res.text();
    console.log("Response status:", res.status);
    console.log(text);
  } catch (e) {
    console.error(e);
  }
}

test();
