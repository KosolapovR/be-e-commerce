import * as mongoose from "mongoose";
import {IUser} from "../interfaces/User";

const userSchema = new mongoose.Schema<IUser>({
    _id: {type: String, required: true},
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String },
    avatar: {type: String}
});

userSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.password;
    return obj;
}

/**
 * @typedef User
 * @property {string} _id.required
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} email
 * @property {string} token
 * @property {string} avatar
 */
const User = mongoose.model<IUser>("user", userSchema)

export {
    User
}
