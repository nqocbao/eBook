import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      author: {
        type: String,
        required: true,
        trim: true,
      },
      thumbnail: {
        type: String,
        required: true,
      },
      content: {
        type: Text,
        required: true,
      },
      category_id: {
        type: String,
        required: true,
      },
      isPublished: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    },
  )

const News = mongoose.model('News', newsSchema, "news");

export default News;