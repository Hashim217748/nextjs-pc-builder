"use server";
import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Memory from "../../../../Models/Memory";
export const GET = async () => {
  await connectDB();
  const memory = await Memory.find({});
  return NextResponse.json({ data: memory });
};

export const POST = async (req) => {
  await connectDB();
  const memory = await Memory.create(await req.json());
  return NextResponse.json({ data: memory });
};

export const PUT = async (req) => {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("_id");
  const data = await req.json();
  const updatedMemory = await Memory.findByIdAndUpdate(id, data, {
    new: true,
  });
  return NextResponse.json({ data: updatedMemory });
};

export const DELETE = async (req) => {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const deletedMemory = await Memory.findByIdAndDelete(id);
  return NextResponse.json({ data: deletedMemory });
};
