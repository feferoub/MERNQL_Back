const mongoose = require("mongoose");

ObjectId = mongoose.Schema.ObjectId;

const commentSchema = mongoose.Schema(
  {
    user_id: { type: ObjectId },
    video_id: { type: ObjectId },
    content: { type: String },
  },
  { timestamps: { postedAt: "posted_at" } }
);

commentSchema.methods = {};

module.exports = mongoose.model("Comment", commentSchema);
