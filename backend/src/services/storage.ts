import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "fs";
import path from "path";

const IS_LOCAL = !process.env.AWS_ACCESS_KEY_ID; // Auto-detect mode

// Ensure local uploads folder exists
if (IS_LOCAL) {
  const uploadDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
}

export const getUploadUrl = async (key: string, contentType: string) => {
  if (IS_LOCAL) {
    // 🏠 LOCAL MODE: Return a URL that points to our own server
    // The frontend will PUT to this, and we need a route to handle it.
    return `http://localhost:3000/api/funnel/local-upload?key=${key}`;
  } else {
    // ☁️ CLOUD MODE: Real AWS S3
    const client = new S3Client({ region: process.env.AWS_REGION });
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      ContentType: contentType,
    });
    return await getSignedUrl(client, command, { expiresIn: 60 });
  }
};
