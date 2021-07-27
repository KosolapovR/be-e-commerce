import {ICategory} from "./Category";

export interface IProduct {
    _id: string,
    name: string,
    description?: string,
    color?: string,
    size?: string,
    category: ICategory,
    img_src: string,
    price: number,
    currency: string,
    priceWithSale?: number,
    isSale: boolean
}
