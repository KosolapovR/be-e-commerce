import * as mongoose from "mongoose";
import {IProduct} from "../interfaces/Product";
import {categorySchema} from "./CategoryModel";

const productSchema = new mongoose.Schema<IProduct>({
    name: { type: String, default: null, unique: true, required: true },
    description: { type: String, default: null },
    color: {type: String},
    size: {type: String},
    badge: {type: String},
    category: categorySchema,
    img_src: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    priceWithSale: { type: Number },
    isSale: { type: Boolean, default: false }
});
/**
 * @typedef Product
 * @property {string} _id
 * @property {string} name.required
 * @property {string} color
 * @property {string} size
 * @property {string} badge
 * @property {CategoryModel.model} category
 * @property {string} img_src.required
 * @property {number} price.required
 * @property {string} currency.required
 * @property {number} priceWithSale
 * @property {boolean} isSale
 */
const Product = mongoose.model<IProduct>("product", productSchema)

export {
    Product
}
