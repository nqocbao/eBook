import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            required: true
        },
        book_id: {
            type: String,
            required: true
        },
        lastReadAt: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true,
    },
);

const History = mongoose.model('History', HistorySchema, "histories");

export default History;