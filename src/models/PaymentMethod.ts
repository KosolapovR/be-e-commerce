import * as mongoose from "mongoose";
import {IDeliveryMethod, IPaymentMethod} from "../interfaces/Order";

const paymentMethodSchema = new mongoose.Schema<IPaymentMethod>({
    paymentSystem: { type: String, default: null },
    cardNumber: { type: Number, default: null },
})

/**
 * @typedef PaymentMethod
 * @property {string} _id
 * @property {string} paymentSystem
 * @property {number} cardNumber
 */
const PaymentMethod = mongoose.model<IPaymentMethod>("paymentMethod", paymentMethodSchema)

export {
    paymentMethodSchema,
    PaymentMethod
}
