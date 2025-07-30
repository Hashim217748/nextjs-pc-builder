import mongoose from "mongoose";

const CasingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    priceRange: { type: String, required: true },
    stock: { type: Number, required: true },
    wattage: { type: Number, required: true },
    type: { type: String, required: true },
    formFactor: { type: Array, required: true },
  },
  { collection: "Casings" }
);

const Casing = mongoose.models.Casing || mongoose.model("Casing", CasingSchema);
export default Casing;
