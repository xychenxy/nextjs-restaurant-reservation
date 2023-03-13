import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
	const bearerToken = req.headers.get("authorization") as string;

	const token = bearerToken.split(" ")[1];

	const payload = jwt.decode(token) as { email: string };

	if (!payload.email) {
		return NextResponse.json(
			{ errorMessage: "Unauthorized request" },
			{ status: 401 }
		);
	}

	const user = await prisma.user.findUnique({
		where: {
			email: payload.email,
		},
		select: {
			id: true,
			first_name: true,
			last_name: true,
			email: true,
			city: true,
			phone: true,
		},
	});

	if (!user) {
		return NextResponse.json(
			{ errorMessage: "User not found" },
			{ status: 401 }
		);
	}

	return NextResponse.json(
		{
			id: user.id,
			firstName: user.first_name,
			lastName: user.last_name,
			phone: user.phone,
			city: user.city,
		},
		{ status: 200 }
	);
}
