import mongoose, { Document, Schema } from 'mongoose';

export interface IUser {
    name: string;
    email: string;
    password: string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema = new Schema(
    {
        name: { type: String, required: true},
        email: { type: String, required: true},
        password: { type: String, required: true},
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IUserModel>('User', UserSchema);