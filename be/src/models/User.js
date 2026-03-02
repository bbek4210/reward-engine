import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    walletAddress: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    username: { type: String, default: "" },
    points: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    weeklyRank: { type: Number, default: 999 },
    missionsCompleted: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    constituency: { type: String, default: "" },
    // Track which missions the user has made progress on: { missionId: count }
    missionProgress: { type: Map, of: Number, default: {} },
    lastActiveAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default mongoose.model("User", UserSchema);
