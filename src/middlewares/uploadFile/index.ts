import multer from "multer";
import {GridFsStorage} from "multer-gridfs-storage/lib";
const util = require("util");
const { MONGO_URI } = process.env;




const storage = new GridFsStorage({
    url: MONGO_URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req: any, file: Express.Multer.File) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}--${file.originalname}`;
            return filename;
        }

        return {
            bucketName: "avatar",
            filename: `${Date.now()}--${file.originalname}`,
        };
    }
});

const uploadFile = multer({ storage: storage }).single("file");
const uploadFilesMiddleware = util.promisify(uploadFile);
export default uploadFilesMiddleware;
