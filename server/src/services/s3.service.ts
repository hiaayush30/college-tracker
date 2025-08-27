import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import crypto from "crypto"
import { getSignedUploadURLSchema } from "../schema/s3.schema.js"
import type { Response, Request } from "express"


const acceptedTypes = [
    "application/pdf"
]

const maxFileSIze = 1024 * 1024 * 5 // 5MB
const generatedFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex")

export const getSignedUploadURL = async (req: Request, res: Response) => {
    try {
        const s3 = new S3Client({
            region: process.env.AWS_BUCKET_REGION!,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
            }
        })
        const parsed = getSignedUploadURLSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                errors: parsed.error.flatten()
            })
        }
        const { checksum, fileType, size } = parsed.data;
        if (!acceptedTypes.includes(fileType)) {
            return { failure: "Invalid file type" }
        }
        if (size > maxFileSIze) {
            return { failure: "File can't be larger than 10MB" }
        }
        const fileName = generatedFileName();
        const putObjectCommand = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: fileName,   // it is the file name as it appears in s3 and must be unique
            // and this name also appears in th epublic url of the file so i need it to be random there so people can't guess it
            ContentLength: size,
            ContentType: fileType,
            ChecksumSHA256: checksum,
            Metadata: { // useful if we want to accosiate some data with file stored in s3 later on
                userId: String(req.user?._id) // now we will know which user uploaded the particular file in s3
            }
        })
        const signedURL = await getSignedUrl(s3, putObjectCommand, {
            expiresIn: 60  //seconds
        })
        return res.status(200).json({
            url: signedURL,
            fileUrl: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${fileName}`
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: "Internal server error"
        })
    }
}


export const deleteObject = async (fileUrl: string) => {
    try {
        const s3 = new S3Client({
            region: process.env.AWS_BUCKET_REGION!,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
            }
        })
        const key = fileUrl.split("/").slice(-1)[0]
        const deleteParams = {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: key,
        }
        await s3.send(new DeleteObjectCommand(deleteParams))
    } catch (error) {
        console.log(error);
    }
}