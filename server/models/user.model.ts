import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    token: String,
    avatar: String,
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema, "users");

export default User;