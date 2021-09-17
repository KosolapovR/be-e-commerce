import * as mongoose from "mongoose";
import {IDeliveryMethod} from "../interfaces/Order";

const deliveryMethodSchema = new mongoose.Schema<IDeliveryMethod>({
    deliveryCompanyName: { type: String, required: true },
    deliveryDays: { type: Number, required: true },
    deliveryCost: { type: String, default: null }
})
/**
 * @typedef DeliveryMethod
 * @property {string} _id
 * @property {string} deliveryCompanyName.required
 * @property {number} deliveryDays.required
 * @property {string} deliveryCost
 */
const DeliveryMethod = mongoose.model<IDeliveryMethod>("deliveryMethod", deliveryMethodSchema)

export {
    deliveryMethodSchema,
    DeliveryMethod
}
