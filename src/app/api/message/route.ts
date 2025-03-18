import { NextResponse } from "next/server";

const AGENT_ID = "659bf6bf-09fe-0ba3-ab08-6b3523517f03"; // Your agent ID

export async function POST(req: Request) {
  try {
    const { input } = await req.json();
    const response = await fetch(`http://5.161.209.159/app1/${AGENT_ID}/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: input,
        userId: "user", // Static user ID for now
        userName: "User", // Static user name for now
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${errorText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in message API route:", error);
    return NextResponse.json(
      { 
        error: "Failed to communicate with agent",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
