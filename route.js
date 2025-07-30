"use server";

import { NextResponse } from "next/server";
import { client, connectDB, db } from "@/app/lib/MongoConfig";
import { ObjectId } from "mongodb";
import User from "@/app/Models/user";
export async function GET(req) {
     // Code to get all the users data
     const { searchParams } = new URL(req.url);
     const id = searchParams.get("id")
     await connectDB()
     let collection = []
     if (!id) {
          collection = await User.find({})
     } else {
          collection = await User.find({ _id: new ObjectId(id) })

     }
     return NextResponse.json({ data: collection });
}

export async function POST(req) {
     // Code to create or save the users data
     const data = await req.json();
     await connectDB()
     const resp = await User.insertMany(data)
     return NextResponse.json({ message: "User created", data: resp });
}

export async function PUT(req) {
     // Code to update specific user's data
     const { searchParams } = new URL(req.url);
     const id = searchParams.get("id");
     if (!id) {
          return NextResponse.json({ message: "id is required", status: 400 });
     }
     else {

          await connectDB()
          const data = await req.json()
          const resp = await User.findOneAndUpdate({ "_id": new ObjectId(id) }, { $set: data })
          return NextResponse.json({ message: `User with ${id} is Updated`, data: resp });
     }

}

export async function DELETE(req) {
     // Code to delete specific user's data
     const { searchParams } = new URL(req.url);
     const id = searchParams.get("id");
     console.log(id)
     if (!id) {
          return NextResponse.json({ message: "id is required", status: 400 });
     }
     else {
          await connectDB()
          const resp = await User.findOneAndDelete({ " _id": new ObjectId(id) })
          return NextResponse.json({ message: `User with is deleted successfully`, data: resp });
     }

}