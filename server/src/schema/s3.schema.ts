import z from "zod";

export const getSignedUploadURLSchema = z.object({
    fileType:z.string(),
    size:z.number(),
    checksum:z.string()
})