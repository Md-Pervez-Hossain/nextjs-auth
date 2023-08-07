import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../libs/mongodb";
import GitUser from "../../../../models/githubUserSchema/githubUserSchema";

export async function POST(req) {
  const { name, email } = await req.json();
  await connectMongoDB();
  await GitUser.create({ name, email });
  return NextResponse.json({ message: "Github User Created" }, { status: 201 });
}
