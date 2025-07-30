"use server";
import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Storage from "../../../../Models/Storage";
export const GET = async () => {
  await connectDB();
  const storage = await Storage.find({});
  return NextResponse.json({ data: storage });
};

export const POST = async (req) => {
  await connectDB();
  const data = await req.json();
  const storage = await Storage.create(data);
  return NextResponse.json({ data: storage });
};

export const PUT = async (req) => {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("_id");
  const data = await req.json();
  const storage = await Storage.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return NextResponse.json({ data: storage });
};

export const DELETE = async (req) => {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const storage = await Storage.findOneAndDelete({ _id: id });
  return NextResponse.json({ data: storage });
};
