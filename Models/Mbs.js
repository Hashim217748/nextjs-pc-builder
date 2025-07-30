import mongoose from "mongoose";

const MbsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    priceRange: { type: String, required: true },
    stock: { type: Number, required: true },
    wattage: { type: Number, required: true },
    ddr: { type: String, required: true },
    socket: { type: String, required: true },
    maxMemory: { type: Number, required: true },
    memorySlots: { type: Number, required: true },
    pcie: { type: String, required: true },
    formFactor: { type: String, required: true },
  },
  { collection: "Motherboards" }
);

const Mbs = mongoose.models.Mbs || mongoose.model("Mbs", MbsSchema);
export default Mbs;
