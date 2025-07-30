"use server";
import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Monitors from "../../../../Models/Monitors";
export const GET = async () => {
  await connectDB();
  const monitors = await Monitors.find({});
  return NextResponse.json({ data: monitors });
};

export const POST = async (req) => {
  await connectDB();
  const data = await req.json();
  const newMonitor = await Monitors.create(data);
  return NextResponse.json({ data: newMonitor });
};

export const DELETE = async (req) => {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const deletedMonitor = await Monitors.findByIdAndDelete(id);
  return NextResponse.json({ data: deletedMonitor });
};

export const PUT = async (req) => {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("_id");
  const data = await req.json();
  const updatedMonitor = await Monitors.findByIdAndUpdate(id, data, {
    new: true,
  });
  return NextResponse.json({ data: updatedMonitor });
};
