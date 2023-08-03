import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../libs/mongodb";
import User from "../../../../models/userSchema/userSchema";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { email } = await req.json();
    const user = await User.findOne({ email }).select("_id");
    console.log("user:", user);
    if (user) {
      return NextResponse.json({ user });
    } else {
      return NextResponse.json({ user: null }); // Return null or some other appropriate value
    }
  } catch (error) {
    console.log(error);
  }
}
