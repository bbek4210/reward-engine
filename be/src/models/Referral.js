import mongoose from "mongoose";

const referralSchema = new mongoose.Schema(
  {
    referrerAddress: { type: String, required: true, index: true },
    refereeAddress: { type: String, default: null },
    referralCode: { type: String, required: true, index: true },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    pointsEarned: { type: Number, default: 0 },
    completedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

// One referral per code (unique referees)
referralSchema.index(
  { referralCode: 1, refereeAddress: 1 },
  { unique: true, sparse: true },
);

export default mongoose.model("Referral", referralSchema);
