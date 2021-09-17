import mongoose from "mongoose";

export interface IAvatarChunk {
    _id: string,
    n: number,
    files_id: mongoose.Types.ObjectId,
    data: BinaryType,
}
