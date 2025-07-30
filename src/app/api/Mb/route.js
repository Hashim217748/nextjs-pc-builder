"use server";
import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Mbs from "../../../../Models/Mbs";
export const GET = async (req) => {
  await connectDB();
  const mb = await Mbs.find({});
  return NextResponse.json({ data: mb });
};

export const POST = async (req) => {
  await connectDB();
  const newMb = await req.json();
  const mb = await Mbs.create(newMb);
  return NextResponse.json({ data: mb });
};
export const DELETE = async (req) => {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ message: "id is required", status: 400 });
  }
  const mb = await Mbs.findByIdAndDelete(id);
  return NextResponse.json({ data: mb });
};
export const PUT = async (req) => {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("_id");
  if (!id) {
    return NextResponse.json({ message: "id is required", status: 400 });
  }
  const newMb = await req.json();
  const mb = await Mbs.findByIdAndUpdate(id, newMb, { new: true });
  return NextResponse.json({ data: mb });
};
