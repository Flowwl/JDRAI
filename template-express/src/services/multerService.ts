import multer from "multer";

const multerStorage = multer.memoryStorage();
export const multerService = multer({ storage: multerStorage });
