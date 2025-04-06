import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title: String,
    description: String,
    thumbnail: String,
}, {
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema, "categories");

export default Category;