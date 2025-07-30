import mongoose from "mongoose";

const CpusSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    priceRange: { type: String, required: true },
    stock: { type: Number, required: true },
    wattage: { type: Number, required: true },
    ddr: { type: String, required: true },
    socket: { type: String, required: true },
  },
  { collection: "Cpus" }
);

const Cpus = mongoose.models.Cpus || mongoose.model("Cpus", CpusSchema);
export default Cpus;
