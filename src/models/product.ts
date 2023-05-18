import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct {
    name: string;
    description: string;
}

export interface IProductModel extends IProduct, Document {}

const ProductSchema = new Schema(
    {
        name: { type: String, required: true},
        description: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IProductModel>('Product', ProductSchema);