import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
    password: String,
    token: String, //ma bao mat
    avatar: String,
    status: String,
    createdBy : String,
    updatedBy : String,
    deletedBy : String,
    deleted: {
        type: Boolean,
        default: false
    }
} , {
    timestamps: true // Tu dong them truong createAt va updateAt
});

const Admin = mongoose.model('Admin', adminSchema, "admins");
export default Admin;
