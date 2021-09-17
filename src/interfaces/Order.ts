import {IProduct} from "./Product";

export interface IDeliveryMethod{
    deliveryCompanyName: string,
    deliveryDays: number
    deliveryCost: string
}

export interface IPaymentMethod{
    paymentSystem: string
    cardNumber?: number
}

export interface IShippingAddress{
    city?: string,
    inhibitedLocality?: string,
    street: string,
    house: string,
    housing?: string,
    building?: string,
    apartment?: string,
    room?: string,
}

export interface IOrder {
    _id: string,
    openDate: Date,
    totalAmount: string,
    quantity: number
    currency: string,
    trackingNumber: string,
    deliveryStatus: string
    deliveryMethod: IDeliveryMethod
    paymentMethod: IPaymentMethod
    shippingAddress: IShippingAddress
    products: IProduct[]
}
