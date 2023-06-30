import { generateComponents } from "@uploadthing/react";
import type { CustomFileRouter } from "@/app/api/uploadthing/core";

export const { UploadButton, UploadDropzone, Uploader } = generateComponents<CustomFileRouter>();