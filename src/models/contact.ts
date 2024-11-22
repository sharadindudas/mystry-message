import mongoose, { Schema, Document, Model } from "mongoose";

// Contact schema type
interface Contact extends Document {
    name: string;
    email: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}

// Contact schema
const contactSchema: Schema<Contact> = new Schema(
    {
        name: String,
        email: String,
        message: String
    },
    { timestamps: true }
);

// Contact model
export const ContactModel =
    (mongoose.models.Contact as Model<Contact>) ||
    mongoose.model<Contact>("Contact", contactSchema);
