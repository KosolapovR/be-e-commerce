import {ICategory} from "./Category";

export interface IProduct {
    _id: string,
    name: string,
    description?: string,
    color?: string,
    category: ICategory,
}
