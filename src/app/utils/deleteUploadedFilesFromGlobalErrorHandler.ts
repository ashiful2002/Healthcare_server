import { Request } from "express";
import { deleteFileFromCloudinary } from "../config/cloudinary.config";

export const deleteUploadedFilesFromGlobalErrorHandler = async (req: Request) => {
    try {
        const filesToDelete: string[] = [];

        if (req.file && req.file?.path) {
            filesToDelete.push(req.file.path);
        }

        if (req.files && typeof req.files === "object" && !Array.isArray(req.files)) {
            Object.values(req.files).forEach((fileArray) => {
                if (Array.isArray(fileArray)) {
                    const fileUrls = fileArray.map((file) => file.path);
                    filesToDelete.push(...fileUrls);
                }
            })
        } else if (req.files && Array.isArray(req.files) && req.files.length > 0) {
            req.files.forEach((file) => {
                filesToDelete.push(file.path);
            })
        }

        if (filesToDelete.length > 0) {
            await Promise.all(filesToDelete.map((url) => deleteFileFromCloudinary(url)));
            console.log(`files ${filesToDelete.length} deleted successfully from global error handler from cludenary`);

        }

    } catch (error: any) {
        console.error("Error deleting uploaded files:", error.message);
    }
}

