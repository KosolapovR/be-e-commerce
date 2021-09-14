import mongoose from "mongoose";
import {AvatarFile} from "../../models/AvatarFile";
import {AvatarChunk} from "../../models/AvatarChunk";

export default async (filename: string) : Promise<{data?: string, error: boolean}> => {
    const avatarFile = await AvatarFile.findOne({"filename": filename })

    if(!avatarFile){
        return {error: true}
    }

    const doc = await AvatarChunk.findOne({files_id: new mongoose.Types.ObjectId(avatarFile._id) })

    if (!doc) {
        return {error: true}
    }

    const buff = new Buffer(doc.data);

    return {data: buff.toString('base64'), error: false}
}
