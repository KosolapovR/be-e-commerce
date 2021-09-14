import * as mongoose from "mongoose";
import {IAvatarChunk} from "../interfaces/AvatarChunk";

const avatarChunkSchema = new mongoose.Schema<IAvatarChunk>({
    _id: { type: String, required: true },
    files_id: {type: mongoose.Schema.Types.ObjectId,  ref: 'avatar.files'},
    n: { type: Number },
    data: { type: Buffer },
});

/**
 * @typedef AvatarChunk
 * @property {string} _id.required
 * @property {string} files_id.required
 * @property {number} n - порядковый номер чанка
 * @property {Buffer} data - image buffer
 */
const AvatarChunk = mongoose.model<IAvatarChunk>("avatar.chunks", avatarChunkSchema)

export {
    AvatarChunk
}
