import * as mongoose from "mongoose";
import {ICategory} from "../interfaces/Category";

const categorySchema = new mongoose.Schema<ICategory>({
    name: { type: String, default: null, required: true },
    description: { type: String, default: null },
    sex: {type: String, default: 'unisex' },
});

/**
 * @typedef Category
 * @property {string} _id
 * @property {string} name.required
 * @property {string} description
 * @property {string} sex
 */
const Category = mongoose.model<ICategory>("category", categorySchema)

export {
    Category,
    categorySchema
}
