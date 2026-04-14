import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  image: { type: String },
  role: { type: String, default: "user", enum: ["user", "admin"] },
  plan: { type: String, default: "free", enum: ["free", "pro", "agency"] },
  credits: { type: Number, default: 2 },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
