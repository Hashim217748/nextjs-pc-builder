"use client";
import Link from "next/link";
import Screen from "../Components/Screen";
import Sidebar from "../Components/sidebar";

export default function Guides() {
  return (
    <Screen>
      <Sidebar />
      <div className="w-full min-h-screen">
        <p className="text-center font-extrabold font-funnel px-32 text-3xl pt-10">
          PC Build Guides To make sure you know everything before you get to
          building
        </p>
        <div className="px-32 py-10">
          <h2 className="text-2xl font-bold mb-4">AMD Build Guides</h2>
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-2">
              Entry-Level AMD Gaming Build
            </h3>
            <p className="mb-2">
              Perfect for those new to PC building, this guide provides a
              budget-friendly option without sacrificing performance. Components
              include an AMD Ryzen 3 processor, 8GB RAM, and a GTX 1650 GPU.
            </p>

            <h3 className="text-xl font-semibold mb-2">
              Mid-Range AMD Gaming Build
            </h3>
            <p className="mb-2">
              For gamers who want a bit more power, this build features an AMD
              Ryzen 5 processor, 16GB RAM, and an RX 5700 XT GPU, providing
              excellent performance for most games at 1080p.
            </p>

            <h3 className="text-xl font-semibold mb-2">
              High-End AMD Gaming Build
            </h3>
            <p className="mb-2">
              Designed for enthusiasts, this build includes an AMD Ryzen 7
              processor, 32GB RAM, and an RX 6800 XT GPU, delivering high
              performance for 1440p or even 4K gaming.
            </p>

            <h3 className="text-xl font-semibold mb-2">AMD Streaming Build</h3>
            <p className="mb-2">
              Ideal for content creators, this setup features an AMD Ryzen 9
              processor, 32GB RAM, and a GTX 1660 SUPER GPU, providing both high
              gaming performance and excellent streaming capabilities.
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-4">Intel Build Guides</h2>
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-2">
              Entry-Level Intel Gaming Build
            </h3>
            <p className="mb-2">
              This build is great for beginners, featuring an Intel Core i3
              processor, 8GB RAM, and a GTX 1650 GPU, offering a solid entry
              point into PC gaming.
            </p>

            <h3 className="text-xl font-semibold mb-2">
              Mid-Range Intel Gaming Build
            </h3>
            <p className="mb-2">
              For those looking to step up their game, this setup includes an
              Intel Core i5 processor, 16GB RAM, and an RTX 2060 GPU, providing
              smooth performance for 1080p gaming.
            </p>

            <h3 className="text-xl font-semibold mb-2">
              High-End Intel Gaming Build
            </h3>
            <p className="mb-2">
              Targeted at hardcore gamers, this build features an Intel Core i7
              processor, 32GB RAM, and an RTX 3080 GPU, ensuring top-tier
              performance for 1440p and 4K gaming.
            </p>

            <h3 className="text-xl font-semibold mb-2">
              Intel Streaming Build
            </h3>
            <p className="mb-2">
              Designed for streamers, this setup includes an Intel Core i9
              processor, 32GB RAM, and an RTX 2070 GPU, offering exceptional
              gaming and streaming performance.
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-4">Streaming Build Guides</h2>
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Budget Streaming Build
            </h3>
            <p className="mb-2">
              This build is perfect for beginners on a budget, featuring an AMD
              Ryzen 5 processor, 16GB RAM, and a GTX 1650 SUPER GPU, providing
              good performance for streaming at 720p or 1080p.
            </p>

            <h3 className="text-xl font-semibold mb-2">
              Mid-Range Streaming Build
            </h3>
            <p className="mb-2">
              For those looking to take their streams to the next level, this
              build includes an Intel Core i7 processor, 32GB RAM, and an RTX
              2060 GPU, offering smooth performance for streaming and gaming at
              1080p.
            </p>

            <h3 className="text-xl font-semibold mb-2">
              High-End Streaming Build
            </h3>
            <p className="mb-2">
              This setup is designed for professional streamers, featuring an
              AMD Ryzen 9 processor, 32GB RAM, and an RTX 3070 GPU, delivering
              outstanding performance for gaming and streaming at 1440p or
              higher.
            </p>
          </div>
        </div>
      </div>
    </Screen>
  );
}
