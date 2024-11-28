import OpenAI from "openai";
import { NextResponse } from "next/server";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  console.log("API Route: Starting request processing");

  try {
    // Check API key
    if (!process.env.OPENAI_API_KEY) {
      console.error("API Route: OpenAI API key is missing");
      return NextResponse.json(
        { error: "OpenAI API key is not configured" },
        { status: 500 }
      );
    }

    // Parse request body
    const body = await request.json();
    console.log("API Route: Received request body:", JSON.stringify(body));

    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      console.error("API Route: Invalid messages format:", messages);
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }

    console.log("API Route: Sending request to OpenAI");
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant for Popular Content, a blogging platform. 
          You help users with questions about content creation, writing, and digital marketing. 
          Keep your responses friendly, professional, and concise. 
          Focus on providing practical, actionable advice.
          If asked about technical details, provide specific examples and best practices.`,
        },
        ...messages.map((msg: any) => ({
          role: msg.role,
          content: msg.content,
        })),
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    console.log("API Route: Received response from OpenAI");
    const responseMessage = completion.choices[0].message.content;

    if (!responseMessage) {
      console.error("API Route: Empty response from OpenAI");
      throw new Error("No response from OpenAI");
    }

    console.log("API Route: Sending successful response");
    return NextResponse.json({ message: responseMessage });
  } catch (error: any) {
    console.error("API Route Error:", {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack,
    });

    // Handle specific OpenAI errors
    if (error.code === "insufficient_quota") {
      return NextResponse.json(
        { error: "API quota exceeded. Please try again later." },
        { status: 429 }
      );
    }

    if (error.code === "rate_limit_exceeded") {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a moment." },
        { status: 429 }
      );
    }

    // If it's an OpenAI API error, return the specific error message
    if (error.response?.data?.error?.message) {
      return NextResponse.json(
        { error: error.response.data.error.message },
        { status: error.response.status || 500 }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to get response from OpenAI",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
