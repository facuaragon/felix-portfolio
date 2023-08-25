import connectMongoDB from "@/libs/mongodb";
import Profile from "@/models/profile";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const profile = await Profile.findOne({ name: "felix ramallo" });
    return NextResponse.json({ profile });
  } catch (error) {
    return NextResponse.json({ message: `Error: ${error}` }, { status: 400 });
  }
}

export async function PUT(request) {
  try {
    const { job, description } = await request.json();
    await connectMongoDB();
    await Profile.findOneAndUpdate(
      { name: "felix ramallo" },
      {
        job,
        description,
      }
    );
    return NextResponse.json({ message: "Project Updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Error: ${error}` }, { status: 400 });
  }
}
