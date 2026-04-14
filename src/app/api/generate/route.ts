import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { bhk, style, rooms } = data;

    // Simulate AI Processing Delay
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Placeholder response with Mock URLs 
    // In a real scenario, this would call Replicate/DALL-E/Midjourney APIs
    const response = {
      id: Math.random().toString(36).substr(2, 9),
      status: "completed",
      bhk,
      style,
      rooms: Object.entries(rooms).map(([name, files]: any) => ({
        name,
        beforeUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
        afterUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800",
        variations: [
          "https://images.unsplash.com/photo-1618221195710-dd6b41faeaa6?auto=format&fit=crop&q=40&w=200"
        ]
      })),
      createdAt: new Date().toISOString()
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate design" }, { status: 500 });
  }
}
