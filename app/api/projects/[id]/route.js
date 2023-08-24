import connectMongoDB from "@/libs/mongodb";
import Project from "@/models/project";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { title, description, image, url, priorityNumber, company } =
      await request.json();
    await connectMongoDB();
    await Project.findByIdAndUpdate(id, {
      title,
      description,
      image,
      url,
      priorityNumber,
      company,
    });
    return NextResponse.json({ message: "Project Updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Error: ${error}` }, { status: 400 });
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();
    const project = await Project.findOne({ _id: id });
    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Error: ${error}` }, { status: 400 });
  }
}
