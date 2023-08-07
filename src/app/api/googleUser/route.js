import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../libs/mongodb";
import GUser from "../../../../models/googleUserSchema/googleUserSchema";

export async function POST(req) {
  const { name, email } = await req.json();
  await connectMongoDB();
  await GUser.create({ name, email });
  return NextResponse.json({ message: "Google User Created" }, { status: 201 });
}
