"use server";
import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Cpus from "../../../../Models/Cpus";
export const GET = async () => {
  await connectDB();
  const cpus = await Cpus.find({});
  return NextResponse.json({ data: cpus });
};

export const POST = async (req) => {
  await connectDB();
  const { name, price, priceRange, stock, wattage, ddr, socket } =
    await req.json();
  const newCpu = new Cpus({
    name,
    price,
    priceRange,
    stock,
    wattage,
    ddr,
    socket,
  });
  await newCpu.save();
  return NextResponse.json({ data: newCpu });
};

export const PUT = async (req) => {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("_id");
  const data = await req.json();
  const updatedCpu = await Cpus.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json({ data: updatedCpu });
};

export const DELETE = async (req) => {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const deletedCpu = await Cpus.findByIdAndDelete(id);
  return NextResponse.json({ data: deletedCpu });
};
