import mongoose from "mongoose";

const GenerationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bhk: { type: String, required: true },
  style: { type: String, required: true },
  rooms: [{
    name: { type: String },
    beforeUrl: { type: String },
    afterUrl: { type: String },
    variations: [String]
  }],
  videoUrl: { type: String },
  status: { type: String, default: "completed", enum: ["pending", "processing", "completed", "failed"] },
  createdAt: { type: Date, default: Date.now }
});

export const Generation = mongoose.models.Generation || mongoose.model("Generation", GenerationSchema);
