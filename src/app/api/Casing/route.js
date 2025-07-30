"use server";
import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Casing from "../../../../Models/Casing";
export const GET = async () => {
  await connectDB();
  const casing = await Casing.find({});
  return NextResponse.json({ data: casing });
};

export const POST = async (req) => {
  await connectDB();
  const casing = await Casing.create(await req.json());
  return NextResponse.json({ data: casing });
};

export const PUT = async (req) => {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("_id");
  const data = await req.json();
  const casing = await Casing.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json({ data: casing });
};

export const DELETE = async (req) => {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const casing = await Casing.findByIdAndDelete(id);
  return NextResponse.json({ data: casing });
};
