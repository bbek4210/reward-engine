import mongoose from "mongoose";

const PollCommentSchema = new mongoose.Schema(
  {
    pollId: { type: String, required: true, index: true },
    walletAddress: { type: String, required: true },
    author: { type: String, required: true },
    text: { type: String, required: true, maxlength: 1000 },
    likes: { type: Number, default: 0 },
    likedBy: [{ type: String }], // wallet addresses that liked this comment
  },
  { timestamps: true },
);

export default mongoose.model("PollComment", PollCommentSchema);
