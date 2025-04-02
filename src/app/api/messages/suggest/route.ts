import { GEMINI_API_KEY } from "@/config";
import { TryCatchHandler } from "@/utils/handlers";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const runtime = "edge";

export const POST = TryCatchHandler(async () => {
    // Set the model
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });

    // Get the prompt
    const prompt =
        "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    // Use the model to generate texts
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Convert the response into stream
    const stream = new ReadableStream({
        async start(controller) {
            controller.enqueue(new TextEncoder().encode(text));
            controller.close();
        }
    });

    // Return the response
    return new NextResponse(stream, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8"
        }
    });
});
