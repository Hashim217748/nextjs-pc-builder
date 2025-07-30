"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Screen from "@/app/Components/Screen";
import Link from "next/link";
import { ArrowBackIos } from "@mui/icons-material";

export default function adminCpus() {
  const [cpus, setCpus] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    priceRange: "",
    stock: 0,
    wattage: 0,
    ddr: "",
    socket: "",
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
    fetchCpus();
  }, []);

  const fetchCpus = async () => {
    const data = await fetchData("/api/Cpu");
    setCpus(data.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const addCpus = async () => {
    await axios.post("/api/Cpu", form);
    fetchCpus();
  };

  const updateCpus = async (id) => {
    await axios.put(`/api/Cpu?_id=${id}`, form);
    fetchCpus();
  };

  const deleteCpus = async (id) => {
    await axios.delete(`/api/Cpu?id=${id}`);
    fetchCpus();
  };

  return (
    <Screen>
      <Link href="/admin">
        <button className=" m-4 pr-2 pl-5 mb-4 py-3 rounded-2xl bg-purple-600  p-2  text-white font-extrabold font-funnel  hover:text-white ">
          <ArrowBackIos></ArrowBackIos>
        </button>
      </Link>
      <div className="p-4 m-6 rounded-lg">
        <p className="text-2xl font-bold mb-4 text-center">CPUs</p>
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
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cpus.map((cpu) => (
              <tr key={cpu._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{cpu.name}</td>
                <td className="py-2 px-4 border-b">{cpu.price}</td>
                <td className="py-2 px-4 border-b">{cpu.priceRange}</td>
                <td className="py-2 px-4 border-b">{cpu.stock}</td>
                <td className="py-2 px-4 border-b">{cpu.wattage}</td>
                <td className="py-2 px-4 border-b">{cpu.ddr}</td>
                <td className="py-2 px-4 border-b">{cpu.socket}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => updateCpus(cpu._id)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => deleteCpus(cpu._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Add CPU</h3>
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
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={addCpus}
            >
              Add CPU
            </button>
          </div>
        </div>
      </div>
    </Screen>
  );
}
