import { NextResponse } from "next/server";

type ParamsProps = {
	params: {
		id: string;
	};
};
export async function GET(request: Request, { params }: ParamsProps) {
	// localhost:3000/api/hello/abc
	const id = params.id;
	// localhost:3000/api/hello/abc?sort=xiugou
	// const { searchParams } = request.nextUrl;
	const { searchParams } = new URL(request.url);
	const sort = searchParams.get("sort");
	return NextResponse.json({ data: `hi, ${id}, ${sort}` }, { status: 200 });
}
