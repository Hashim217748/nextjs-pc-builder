"use server";
import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Gpus from "../../../../Models/Gpus";
export const GET = async () => {
  await connectDB();
  const gpus = await Gpus.find({});
  return NextResponse.json({ data: gpus });
};

export const POST = async (req) => {
  await connectDB();
  const data = await req.json();
  const newGpu = new Gpus(data);
  await newGpu.save();
  return NextResponse.json({ data: newGpu });
};

export const PUT = async (req) => {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("_id");
  const data = await req.json();
  const updatedGpu = await Gpus.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json({ data: updatedGpu });
};

export const DELETE = async (req) => {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const deletedGpu = await Gpus.findByIdAndDelete(id);
  return NextResponse.json({ data: deletedGpu });
};
