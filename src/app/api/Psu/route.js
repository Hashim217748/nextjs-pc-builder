"use server";
import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Psus from "../../../../Models/Psus";
export const GET = async () => {
  await connectDB();
  const psus = await Psus.find({});
  return NextResponse.json({ data: psus });
};

export const POST = async (req) => {
  await connectDB();
  const data = await req.json();
  const newPsu = new Psus(data);
  await newPsu.save();
  return NextResponse.json({ data: newPsu });
};

export const DELETE = async (req) => {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const deletedPsu = await Psus.findByIdAndDelete(id);
  return NextResponse.json({ data: deletedPsu });
};

export const PUT = async (req) => {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("_id");
  const data = await req.json();
  const updatedPsu = await Psus.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json({ data: updatedPsu });
};
