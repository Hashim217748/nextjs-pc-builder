"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Screen from "@/app/Components/Screen";
import Link from "next/link";
import { ArrowBackIos } from "@mui/icons-material";

export default function adminMb() {
  const [Mb, setMb] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    priceRange: "",
    stock: 0,
    wattage: 0,
    ddr: "",
    socket: "",
    maxMemory: 0,
    memorySlots: 0,
    pcie: "",
    formFactor: "",
  });
  const fetchData = async (path) => {
    try {
      const response = await fetch(path);

      if (!response.ok) {
        // Handle HTTP errors
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null; // Return null in case of error to handle it gracefully
    }
  };

  useEffect(() => {
    fetchMb();
  }, []);

  const fetchMb = async () => {
    const data = await fetchData("/api/Mb");
    setMb(data.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const addMb = async () => {
    await axios.post("/api/Mb", form);
    fetchMb();
  };
  const updateMb = async (id) => {
    await axios.put(`/api/Mb?_id=${id}`, form);
    fetchMb();
  };
  const deleteMb = async (id) => {
    await axios.delete(`/api/Mb?id=${id}`);
    fetchMb();
  };
  return (
    <Screen>
      <Link href="/admin">
        <button className=" m-4 pr-2 pl-5 mb-4 py-3 rounded-2xl bg-purple-600  p-2  text-white font-extrabold font-funnel  hover:text-white ">
          <ArrowBackIos></ArrowBackIos>
        </button>
      </Link>
      <div className="p-4 m-6 rounded-lg">
        <p className="text-2xl font-bold mb-4 text-center">MotherBoards</p>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Price Range</th>
              <th className="py-2 px-4 border-b">Stock</th>
              <th className="py-2 px-4 border-b">Wattage</th>
              <th className="py-2 px-4 border-b">DDR</th>
              <th className="py-2 px-4 border-b">Socket</th>
              <th className="py-2 px-4 border-b">Max Memory</th>
              <th className="py-2 px-4 border-b">Memory Slots</th>
              <th className="py-2 px-4 border-b">PCIe</th>
              <th className="py-2 px-4 border-b">Form Factor</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Mb.map((mb) => (
              <tr key={mb._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{mb.name}</td>
                <td className="py-2 px-4 border-b">{mb.price}</td>
                <td className="py-2 px-4 border-b">{mb.priceRange}</td>
                <td className="py-2 px-4 border-b">{mb.stock}</td>
                <td className="py-2 px-4 border-b">{mb.wattage}</td>
                <td className="py-2 px-4 border-b">{mb.ddr}</td>
                <td className="py-2 px-4 border-b">{mb.socket}</td>
                <td className="py-2 px-4 border-b">{mb.maxMemory}</td>
                <td className="py-2 px-4 border-b">{mb.memorySlots}</td>
                <td className="py-2 px-4 border-b">{mb.pcie}</td>
                <td className="py-2 px-4 border-b">{mb.formFactor}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => updateMb(mb._id)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => deleteMb(mb._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Add MotherBoard</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="border rounded px-3 py-2"
            />
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              name="priceRange"
              value={form.priceRange}
              onChange={handleInputChange}
              placeholder="Price Range"
              className="border rounded px-3 py-2"
            />
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleInputChange}
              placeholder="Stock"
              className="border rounded px-3 py-2"
            />
            <input
              type="number"
              name="wattage"
              value={form.wattage}
              onChange={handleInputChange}
              placeholder="Wattage"
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              name="ddr"
              value={form.ddr}
              onChange={handleInputChange}
              placeholder="DDR"
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              name="socket"
              value={form.socket}
              onChange={handleInputChange}
              placeholder="Socket"
              className="border rounded px-3 py-2"
            />
            <input
              type="number"
              name="maxMemory"
              value={form.maxMemory}
              onChange={handleInputChange}
              placeholder="Max Memory"
              className="border rounded px-3 py-2"
            />
            <input
              type="number"
              name="memorySlots"
              value={form.memorySlots}
              onChange={handleInputChange}
              placeholder="Memory Slots"
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              name="pcie"
              value={form.pcie}
              onChange={handleInputChange}
              placeholder="PCIe"
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              name="formFactor"
              value={form.formFactor}
              onChange={handleInputChange}
              placeholder="Form Factor"
              className="border rounded px-3 py-2"
            />
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={addMb}
            >
              Add MotherBoard
            </button>
          </div>
        </div>
      </div>
    </Screen>
  );
}
