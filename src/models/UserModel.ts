import * as mongoose from "mongoose";
import {IUser} from "../interfaces/User";

const userSchema = new mongoose.Schema<IUser>({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String },
});

const UserModel = mongoose.model<IUser>("user", userSchema)

export {
    UserModel
}