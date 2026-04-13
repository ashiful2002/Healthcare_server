import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryUpload } from "./cloudinary.config";

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: (req, file) => {
    const originalName = file.originalname;
    const extenction = originalName.split(".").pop()?.toLocaleLowerCase();

    const fileNameWithExtension = originalName
      .split(".")
      .slice(0, 1)
      .join(".")
      .toLocaleLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_-]/g, "");

    const uniqueName =
      Math.random().toString(36).substring(2) +
      "-" +
      Date.now() +
      -fileNameWithExtension;

    const folder = extenction === "pdf" ? "pdfs" : "images";

    return {
      folder: `ph-healthcare/${folder}`,
      public_id: uniqueName,
      resoirce_type: "auto",
    };
  },
});

export const multerUpload = multer({ storage });
