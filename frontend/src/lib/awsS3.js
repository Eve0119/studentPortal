import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { MD5 } from "crypto-js";

const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
  },
});

export const uploadStudentImage = async (file, studentId, email) => {
  try {
    // 1. Generate unique filename
    const emailHash = MD5(email).toString().slice(0, 8);
    const fileExt = file.name.split('.').pop().toLowerCase();
    const filename = `student-${studentId}-${emailHash}.${fileExt}`;
    const folder = 'student-profile-images';

    // 2. Convert File to Buffer
    const fileBuffer = await file.arrayBuffer();

    // 3. Upload to S3
    const params = {
      Bucket: import.meta.env.VITE_S3_BUCKET,
      Key: `${folder}/${filename}`,
      Body: fileBuffer,
      ContentType: file.type,
    };

    await s3Client.send(new PutObjectCommand(params));

    // 4. Return URL and Key
    return {
      url: `https://${params.Bucket}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${params.Key}`,
      key: params.Key // Essential for future updates/deletes
    };
  } catch (err) {
    console.error("S3 Upload Error:", err);
    throw new Error('Failed to upload image. Please try again.');
  }
};