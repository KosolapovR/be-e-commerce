import * as mongoose from "mongoose";
import {IDeliveryMethod, IPaymentMethod, IShippingAddress} from "../interfaces/Order";

const shippingAddressSchema = new mongoose.Schema<IShippingAddress>({
    city: { type: String, default: null },
    inhibitedLocality: { type: String, default: null },
    street: { type: String, required: true },
    house: { type: String, required: true },
    housing: { type: String, default: null },
    building: { type: String, default: null },
    apartment: { type: String, default: null },
    room: { type: String, default: null },
})

/**
 * @typedef ShippingAddress
 * @property {string} _id
 * @property {string} city
 * @property {string} inhibitedLocality
 * @property {string} street.required
 * @property {string} house.required
 * @property {string} housing
 * @property {string} building
 * @property {string} apartment
 * @property {string} room
 */
const ShippingAddress = mongoose.model<IShippingAddress>("shippingAddress", shippingAddressSchema)

export {
    shippingAddressSchema,
    ShippingAddress
}
