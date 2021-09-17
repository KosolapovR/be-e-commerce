import mongoose from "mongoose";
import {AvatarFile} from "../../models/AvatarFile";
import {AvatarChunk} from "../../models/AvatarChunk";
import {IAvatarChunk} from "../../interfaces/AvatarChunk";

export default async (filename: string) : Promise<{data?: string, error: boolean}> => {
    const avatarFile = await AvatarFile.findOne({"filename": filename })

    if(!avatarFile){
        return {error: true}
    }

    const doc: IAvatarChunk[] = await AvatarChunk.find({files_id: new mongoose.Types.ObjectId(avatarFile._id) }).sort("n")
    if (!doc) {
        return {error: true}
    }

    const bufferList: Buffer[] = []
    doc.forEach(d => {
        const buff = new Buffer(d.data);
        bufferList.push(buff)
    })

    return {data: Buffer.concat(bufferList).toString('base64'), error: false}
}
