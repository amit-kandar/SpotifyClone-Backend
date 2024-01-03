import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import fs from 'fs';

const MAX_UPLOAD_TRIES = 2;

export const uploadToCloudinary = async (filePath: string): Promise<UploadApiResponse | string> => {
    let tries = 0;

    while (tries < MAX_UPLOAD_TRIES) {
        try {
            if (!filePath) throw new Error("File path is required!");

            // Upload the file to Cloudinary
            const response = await cloudinary.uploader.upload(filePath, {
                resource_type: "auto"
            });

            // File uploaded successfully
            if (fs.existsSync(filePath) && filePath !== "public/assets/default.jpg") {
                fs.unlinkSync(filePath); // Delete the temporary file after successful file upload or after maximum tries
            }

            return response;
        } catch (error) {
            tries++;
            console.log("Cloudinary Error: ", error);

            if (tries === MAX_UPLOAD_TRIES) {
                if (fs.existsSync(filePath) && filePath !== "public/assets/default.jpg") {
                    fs.unlinkSync(filePath); // Remove the local saved file if it exists after maximum tries
                }
                return "Cloudinary file upload operation failed after multiple attempts!";
            }
        }
    }

    return "Cloudinary file upload operation failed after multiple attempts!";
};
