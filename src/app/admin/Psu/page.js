"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Screen from "@/app/Components/Screen";
import { ArrowBackIos, BackHand, Backspace } from "@mui/icons-material";
import Link from "next/link";

export default function adminPsus() {
  const [psus, setPsus] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    priceRange: "",
    stock: 0,
    wattage: 0,
    formFactor: "",
    efficiencyRating: "",
    modular: "",
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
    fetchPsus();
  }, []);

  const fetchPsus = async () => {
    const data = await fetchData("/api/Psu");
    setPsus(data.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const addPsus = async () => {
    await axios.post("/api/Psu", form);
    fetchPsus();
  };

  const updatePsus = async (id) => {
    await axios.put(`/api/Psu?_id=${id}`, form);
    fetchPsus();
  };

  const deletePsus = async (id) => {
    await axios.delete(`/api/Psu?id=${id}`);
    fetchPsus();
  };

  return (
    <Screen>
      <Link href="/admin">
        <button className=" m-4 pr-2 pl-5 mb-4 py-3 rounded-2xl bg-purple-600  p-2  text-white font-extrabold font-funnel  hover:text-white ">
          <ArrowBackIos></ArrowBackIos>
        </button>
      </Link>
      <div className="p-4 m-6 rounded-lg">
        <p className="text-2xl font-bold mb-4 text-center">PSUs</p>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Price Range</th>
              <th className="py-2 px-4 border-b">Stock</th>
              <th className="py-2 px-4 border-b">Wattage</th>
              <th className="py-2 px-4 border-b">Form Factor</th>
              <th className="py-2 px-4 border-b">Efficiency Rating</th>
              <th className="py-2 px-4 border-b">Modular</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {psus.map((psu) => (
              <tr key={psu._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{psu.name}</td>
                <td className="py-2 px-4 border-b">{psu.price}</td>
                <td className="py-2 px-4 border-b">{psu.priceRange}</td>
                <td className="py-2 px-4 border-b">{psu.stock}</td>
                <td className="py-2 px-4 border-b">{psu.wattage}</td>
                <td className="py-2 px-4 border-b">{psu.formFactor}</td>
                <td className="py-2 px-4 border-b">{psu.efficiencyRating}</td>
                <td className="py-2 px-4 border-b">{psu.modular}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => updatePsus(psu._id)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => deletePsus(psu._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Add PSU</h3>
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
              name="formFactor"
              value={form.formFactor}
              onChange={handleInputChange}
              placeholder="Form Factor"
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              name="efficiencyRating"
              value={form.efficiencyRating}
              onChange={handleInputChange}
              placeholder="Efficiency Rating"
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              name="modular"
              value={form.modular}
              onChange={handleInputChange}
              placeholder="Modular"
              className="border rounded px-3 py-2"
            />
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={addPsus}
            >
              Add PSU
            </button>
          </div>
        </div>
      </div>
    </Screen>
  );
}
