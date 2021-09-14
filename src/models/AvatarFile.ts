import * as mongoose from "mongoose";
import {IAvatarFile} from "../interfaces/AvatarFile";

const avatarFileSchema = new mongoose.Schema<IAvatarFile>({
    _id: { type: String, required: true },
    length: { type: Number },
    chunkSize: { type: Number },
    uploadDate: { type: Date },
    filename: { type: String, required: true },
    md5: { type: String },
    contentType: { type: String },
});

/**
 * @typedef AvatarFile
 * @property {string} _id.required
 * @property {string} filename.required
 * @property {string} md5
 * @property {string} contentType
 * @property {number} length
 * @property {number} chunkSize
 * @property {Date} uploadDate
 */
const AvatarFile = mongoose.model<IAvatarFile>("avatar.files", avatarFileSchema)

export {
    AvatarFile
}
