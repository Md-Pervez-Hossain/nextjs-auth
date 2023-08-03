import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../libs/mongodb";
import User from "../../../../models/userSchema/userSchema";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    console.log(name, email, password);
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();

    await User.create({ name, email, password: hashedPassword });
    return NextResponse.json({ message: "user created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "failed" }, { status: 201 });
  }
}
