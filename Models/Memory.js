import mongoose from "mongoose";

const MemorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    priceRange: { type: String, required: true },
    stock: { type: Number, required: true },
    wattage: { type: Number, required: true },
    type: { type: String, required: true },
    capacity: { type: String, required: true },
  },
  { collection: "Memory" }
);

const Memory = mongoose.models.Memory || mongoose.model("Memory", MemorySchema);
export default Memory;
