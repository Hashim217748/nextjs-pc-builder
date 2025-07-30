import mongoose from "mongoose";

const StorageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    priceRange: { type: String, required: true },
    stock: { type: Number, required: true },
    wattage: { type: Number, required: true },
    type: { type: String, required: true },
    capacity: { type: String, required: true },
  },
  { collection: "Storage" }
);

const Storage =
  mongoose.models.Storage || mongoose.model("Storage", StorageSchema);
export default Storage;
