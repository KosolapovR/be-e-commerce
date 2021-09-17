import {IOrder} from "./Order";

interface INotifications {
    sales: boolean,
    newArrivals: boolean,
    deliveryStatusChanges: boolean,
}

export interface IUser {
    _id: string,
    first_name: string,
    last_name: string,
    email: string,
    password?: string,
    token: string,
    avatar: string,
    notifications: INotifications
    orders: IOrder[]
}
