import mongoose from "mongoose";

export interface IAvatarChunk {
    _id: string,
    files_id: mongoose.Types.ObjectId,
    data: BinaryType,
}
