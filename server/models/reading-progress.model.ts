import mongoose from "mongoose";

const ReadingProgressSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true
    },
    doc_id: {
      type: String,
      required: true
    },
    doc_type: {
      type: String,
      required: true
    },
    currentPage: {
      type: Number,
      default: 0
    },
    lastReadAt: Date,
    completionPercentage: {
      type: Number,
      default: 0
    },
  },
  {
    timestamps: true
  }
);

const ReadingProgress = mongoose.model('ReadingProgress', ReadingProgressSchema, 'readingProgress');

export default ReadingProgress;