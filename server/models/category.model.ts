import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title: String,
    description: String,
    type: {
        type: String,
        enum: ["book", "news", "both"],
        default: "both",
    },
}, {
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema, "categories");

export default Category;