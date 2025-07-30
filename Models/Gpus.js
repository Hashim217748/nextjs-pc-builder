import mongoose from "mongoose";

const GpusSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    priceRange: { type: String, required: true },
    stock: { type: Number, required: true },
    wattage: { type: Number, required: true },
    memory: { type: String, required: true },
    pcie: { type: String, required: true },
  },
  { collection: "Gpus" }
);

const Gpus = mongoose.models.Gpus || mongoose.model("Gpus", GpusSchema);
export default Gpus;
