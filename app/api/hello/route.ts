// import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	return new Response("Hello, Next.js! ?");
}

export async function POST(request: Request) {
	return NextResponse.json({ data: "hi from post" });
}
