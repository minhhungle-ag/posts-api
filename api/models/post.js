const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: Number,
  updatedAt: Number,
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model("Post", postSchema);
