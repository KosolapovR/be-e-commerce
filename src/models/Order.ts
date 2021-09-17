import * as mongoose from "mongoose";
import {IOrder} from "../interfaces/Order";
import {deliveryMethodSchema} from "./DeliveryMethod";
import {paymentMethodSchema} from "./PaymentMethod";
import {shippingAddressSchema} from "./ShippingAddress";
import {productSchema} from "./Product";

const orderSchema = new mongoose.Schema<IOrder>({
    openDate: { type: Date, required: true },
    totalAmount: { type: String, required: true },
    quantity: { type: Number, required: true },
    trackingNumber: { type: String },
    deliveryStatus: { type: String },
    currency: { type: String, default: 'RUB' },
    deliveryMethod: deliveryMethodSchema,
    paymentMethod: paymentMethodSchema,
    shippingAddress: shippingAddressSchema,
    products: [productSchema]
});
/**
 * @typedef Order
 * @property {string} _id
 * @property {Date} openDate.required
 * @property {string} totalAmount.required
 * @property {number} quantity.required
 * @property {string} trackingNumber
 * @property {string} deliveryStatus
 * @property {string} currency
 * @property {Array.<Product>} products
 * @property {DeliveryMethod.model} deliveryMethod.required
 * @property {PaymentMethod.model} paymentMethod.required
 * @property {ShippingAddress.model} shippingAddress.required
 */
const Order = mongoose.model<IOrder>("order", orderSchema)

export {
    orderSchema,
    Order
}
