import * as mongoose from "mongoose";
import {IProduct} from "../interfaces/Product";
import {categorySchema} from "./CategoryModel";

const productSchema = new mongoose.Schema<IProduct>({
    name: { type: String, default: null, unique: true, required: true },
    description: { type: String, default: null },
    color: {type: String},
    category: categorySchema
});

const ProductModel = mongoose.model<IProduct>("product", productSchema)

export {
    ProductModel
}