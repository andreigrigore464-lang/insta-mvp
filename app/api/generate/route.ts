import { NextResponse } from "next/server";

type GenerateRequest = {
  url: string;
};

type GenerateResponse = {
  caption: string;
  hashtags: string;
  image: string;
};

export async function POST(req: Request): Promise<NextResponse<GenerateResponse>> {
  try {
    const body = (await req.json()) as GenerateRequest;
    const { url } = body;

    // For now, return mock data. Later you'll replace this
    // with your real "link → Instagram post" logic.
    const response: GenerateResponse = {
      caption: `Here’s a quick summary for: ${url}`,
      hashtags: "#news #automation #insta",
      image: "https://via.placeholder.com/600x600.png?text=Generated+Post",
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error("Error in /api/generate:", err);
    return NextResponse.json(
      { caption: "", hashtags: "", image: "" },
      { status: 400 }
    );
  }
}
