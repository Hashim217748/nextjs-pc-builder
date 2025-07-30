"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Screen from "@/app/Components/Screen";
import Link from "next/link";
import { ArrowBackIos } from "@mui/icons-material";

export default function adminGpus() {
  const [gpus, setGpus] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    priceRange: "",
    stock: 0,
    wattage: 0,
    memory: "",
    pcie: "",
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
    fetchGpus();
  }, []);

  const fetchGpus = async () => {
    const data = await fetchData("/api/Gpu");
    setGpus(data.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const addGpus = async () => {
    await axios.post("/api/Gpu", form);
    fetchGpus();
  };

  const updateGpus = async (id) => {
    await axios.put(`/api/Gpu?_id=${id}`, form);
    fetchGpus();
  };

  const deleteGpus = async (id) => {
    await axios.delete(`/api/Gpu?id=${id}`);
    fetchGpus();
  };

  return (
    <Screen>
      <Link href="/admin">
        <button className=" m-4 pr-2 pl-5 mb-4 py-3 rounded-2xl bg-purple-600  p-2  text-white font-extrabold font-funnel  hover:text-white ">
          <ArrowBackIos></ArrowBackIos>
        </button>
      </Link>
      <div className="p-4 m-6 rounded-lg">
        <p className="text-2xl font-bold mb-4 text-center">GPUs</p>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Price Range</th>
              <th className="py-2 px-4 border-b">Stock</th>
              <th className="py-2 px-4 border-b">Wattage</th>
              <th className="py-2 px-4 border-b">Memory</th>
              <th className="py-2 px-4 border-b">PCIe</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {gpus.map((gpu) => (
              <tr key={gpu._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{gpu.name}</td>
                <td className="py-2 px-4 border-b">{gpu.price}</td>
                <td className="py-2 px-4 border-b">{gpu.priceRange}</td>
                <td className="py-2 px-4 border-b">{gpu.stock}</td>
                <td className="py-2 px-4 border-b">{gpu.wattage}</td>
                <td className="py-2 px-4 border-b">{gpu.memory}</td>
                <td className="py-2 px-4 border-b">{gpu.pcie}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => updateGpus(gpu._id)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => deleteGpus(gpu._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Add GPU</h3>
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
              name="memory"
              value={form.memory}
              onChange={handleInputChange}
              placeholder="Memory"
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
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={addGpus}
            >
              Add GPU
            </button>
          </div>
        </div>
      </div>
    </Screen>
  );
}
