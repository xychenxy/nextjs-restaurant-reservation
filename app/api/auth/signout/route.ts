import { NextResponse } from "next/server";

export async function POST() {
	const response = NextResponse.json({}, { status: 200 });

	response.cookies.set("jwt", "", {
		path: "/",
		httpOnly: true,
		maxAge: 0,
	});

	return response;
}
