import mongoose from "mongoose";

// One document per (walletAddress, pollId) pair — enforces one vote per user per poll
const PollVoteSchema = new mongoose.Schema(
  {
    pollId: { type: String, required: true, index: true },
    walletAddress: { type: String, required: true, index: true },
    optionId: { type: String, required: true },
  },
  { timestamps: true },
);

PollVoteSchema.index({ pollId: 1, walletAddress: 1 }, { unique: true });

export default mongoose.model("PollVote", PollVoteSchema);
