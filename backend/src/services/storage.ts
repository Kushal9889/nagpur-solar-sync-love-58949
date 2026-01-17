import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "fs";
import path from "path";
 ☁️ CLOUD MODE: Real AWS S3
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
    // 🏠 DYNAMIC LOCAL MODE
    // Determine the base URL dynamically based on environment or default to localhost
    // On Render, 'RENDER_EXTERNAL_URL' is automatically set.
    const baseUrl = process.env.RENDER_EXTERNAL_URL || 
                    (process.env.RENDER_EXTERNAL_HOSTNAME ? `https://${process.env.RENDER_EXTERNAL_HOSTNAME}` : 'http://localhost:3000');
    
    return `${baseUrl}/api/funnel/local-upload?key=${key}`;
  } else {
    //
    const client = new S3Client({ region: process.env.AWS_REGION });
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      ContentType: contentType,
    });
    return await getSignedUrl(client, command, { expiresIn: 60 });
  }
};

// [NEW] OPTIMIZATION: Physical Deletion
export const deleteFile = async (key: string) => {
  const IS_LOCAL = !process.env.AWS_ACCESS_KEY_ID;

  if (IS_LOCAL) {
    // 🏠 LOCAL DELETE (Save Disk Space)
    const filePath = path.join(process.cwd(), "uploads", key); // Key includes folder structure
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // <--- THE MEMORY SAVER
      console.log(`🗑️ Deleted local file: ${filePath}`);
    }
  } else {
    // ☁️ CLOUD DELETE (Save AWS Bill)
    const client = new S3Client({ region: process.env.AWS_REGION });
    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    });
    await client.send(command);
    console.log(`🗑️ Deleted S3 file: ${key}`);
  }
};
