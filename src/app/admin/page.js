"use client";
import Link from "next/link";
import ModalComponent from "../Components/Modal";
import { useEffect, useState } from "react";
import { connectDB } from "../../../lib/mongodb";
import axios from "axios";

export default function adminPage() {
  const [modal, setModal] = useState(false);
  const [mb, setMb] = useState([]);
  const [price, setprice] = useState(0);
  useEffect(() => {
    fetchMb();
  }, []);
  const fetchData = async (path) => {
    try {
      const response = await fetch(path);

      if (!response.ok) {
        // Handle HTTP errors
        throw new Error(`HTTP error! status: ${response.status} in ${path}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null; // Return null in case of error to handle it gracefully
    }
  };
  const checkprice = (item) => {
    setprice(item.price);
  };
  const fetchMb = async () => {
    const data = await fetchData("/api/Mb");
    setMb(data.data);
  };
  console.log(mb);
  return (
    <div className=" font-funnel bg-slate-200 min-h-screen">
      <p className="text-center font-extrabold font-funnel text-2xl pt-10">
        Edit Products
      </p>
      <div className=" bg-white p-6 m-10 items-center text-center rounded-lg grid grid-cols-1 gap-4 md:grid-cols-3">
        <Link href="/admin/Mb">
          <button className=" px-9 mb-4 py-4 rounded-2xl bg-purple-600  p-2  text-white font-extrabold font-funnel  hover:text-white ">
            MotherBoards
          </button>
        </Link>
        <Link href="/admin/Gpu">
          <button className=" px-9 mb-4 py-4 rounded-2xl bg-purple-600  p-2  text-white font-extrabold font-funnel  hover:text-white ">
            GPUs
          </button>
        </Link>
        <Link href="/admin/Cpu">
          <button className=" px-9 mb-4 py-4 rounded-2xl bg-purple-600  p-2  text-white font-extrabold font-funnel  hover:text-white ">
            CPUs
          </button>
        </Link>
        <Link href="/admin/Memory">
          <button className=" px-9 mb-4 py-4 rounded-2xl bg-purple-600  p-2  text-white font-extrabold font-funnel  hover:text-white ">
            Memory
          </button>
        </Link>
        <Link href="/admin/Casing">
          <button className=" px-9 mb-4 py-4 rounded-2xl bg-purple-600  p-2  text-white font-extrabold font-funnel  hover:text-white ">
            Casing
          </button>
        </Link>
        <Link href="/admin/Monitor">
          <button className=" px-9 mb-4 py-4 rounded-2xl bg-purple-600  p-2  text-white font-extrabold font-funnel  hover:text-white ">
            Monitors
          </button>
        </Link>
        <Link href="/admin/Storage">
          <button className=" px-9 mb-4 py-4 rounded-2xl bg-purple-600  p-2  text-white font-extrabold font-funnel  hover:text-white ">
            Storage
          </button>
        </Link>
        <Link href="/admin/Psu">
          <button className=" px-9 mb-4 py-4 rounded-2xl bg-purple-600  p-2  text-white font-extrabold font-funnel  hover:text-white ">
            PSUs
          </button>
        </Link>
      </div>
    </div>
  );
}
