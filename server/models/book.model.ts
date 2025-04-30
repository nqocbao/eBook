import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
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
      description: {
        type: String,
        required: true,
      },
      thumbnail: {
        type: String,
        required: true,
      },
      likes: {
        type: String
      },
      read: {
        type: String
      },
      content: {
        type: String,
        required: true,
      },
      category_id: {
        type: Array,
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

const Book = mongoose.model('Book', bookSchema, "books");

export default Book;