import * as mongoose from "mongoose";
import {ICategory} from "../interfaces/Category";

const categorySchema = new mongoose.Schema<ICategory>({
    name: { type: String, default: null },
    description: { type: String, default: null },
    sex: {type: String, default: 'unisex' },
});

    const CategoryModel = mongoose.model<ICategory>("category", categorySchema)

export {
    CategoryModel,
    categorySchema
}