import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    creator: { type: String, required: true },
    code: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.models.Room ||
  mongoose.model("Room", RoomSchema);