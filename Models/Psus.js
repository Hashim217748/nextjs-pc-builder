import mongoose from "mongoose";

const PsusSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    priceRange: { type: String, required: true },
    stock: { type: Number, required: true },
    wattage: { type: Number, required: true },
    formFactor: { type: String, required: true },
    efficiencyRating: { type: String, required: true },
    modular: { type: String, required: true },
  },
  { collection: "Psus" }
);

const Psus = mongoose.models.Psus || mongoose.model("Psus", PsusSchema);
export default Psus;
