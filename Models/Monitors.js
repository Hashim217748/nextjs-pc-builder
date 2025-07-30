import mongoose from "mongoose";

const MonitorsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    priceRange: { type: String, required: true },
    stock: { type: Number, required: true },
    wattage: { type: Number, required: true },
    size: { type: String, required: true },
    resolution: { type: String, required: true },
  },
  { collection: "Monitors" }
);

const Monitors =
  mongoose.models.Monitors || mongoose.model("Monitors", MonitorsSchema);
export default Monitors;
