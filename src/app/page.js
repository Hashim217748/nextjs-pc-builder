"use client";
import Link from "next/link";
import Sidebar from "./Components/sidebar";
import Screen from "./Components/Screen";

export default function Home() {
  return (
    <Screen>
      <Sidebar />
      <div className="bg-slate-200">
        <div className=" flex flex-col w-full text-center p-20 mr-36">
          <p className="font-funnel text-8xl  font-extrabold text-gray-900 mb-5">
            Welcome To TechForge,
          </p>
          <p className="font-funnel text-2xl mb-4 font-extrabold text-gray-900">
            Dive into the world of PC Building
          </p>
          <Link
            className="px-2 mx-40 py-4 rounded-2xl bg-secondary  p-2  text-main font-extrabold font-funnel mb-4 text-2xl hover:text-white"
            href="/Builder"
          >
            Start Building Your PC
          </Link>
          <p className="font-funnel text-2xl mb-4 font-extrabold text-gray-900">
            Or Take a look at our guides to help your PC building journey
          </p>
          <Link
            className="px-2 mx-40 py-4 rounded-2xl bg-secondary  p-2  text-main font-extrabold font-funnel mb-3 text-2xl hover:text-white"
            href="/Guides"
          >
            Guides
          </Link>
        </div>
      </div>
    </Screen>
  );
}
