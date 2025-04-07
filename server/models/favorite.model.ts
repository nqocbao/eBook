import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            required: true
        },
        doc_id: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    },
);

const Favorite = mongoose.model('Favorite', FavoriteSchema, "favorites");

export default Favorite;