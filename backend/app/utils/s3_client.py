import uuid
from datetime import datetime

import boto3
from botocore.exceptions import ClientError
from fastapi import HTTPException, UploadFile

from ..config_data import (
    S3_ACCESS_KEY,
    S3_BUCKET,
    S3_ENDPOINT,
    S3_REGION,
    S3_SECRET_KEY,
    logger,
)


class TimewebS3Client:
    ALLOWED_IMAGE_EXTENSIONS = {
        "jpg",
        "jpeg",
        "png",
        "gif",
        "bmp",
        "webp",
        "svg",
        "ico",
    }

    MAX_FILE_SIZE = 5 * 1024 * 1024

    def __init__(self):
        self.bucket = S3_BUCKET
        self.endpoint = S3_ENDPOINT

        self.client = boto3.client(
            "s3",
            endpoint_url=self.endpoint,
            aws_access_key_id=S3_ACCESS_KEY,
            aws_secret_access_key=S3_SECRET_KEY,
            region_name=S3_REGION,
        )

    async def upload_file(self, file: UploadFile, subfolder: str = "media") -> dict:
        content = await file.read()
        file_size = len(content)

        if file_size > self.MAX_FILE_SIZE:
            raise HTTPException(
                400,
                f"File size too large. Maximum size: {self.MAX_FILE_SIZE // (1024 * 1024)} MB",
            )

        if "." not in file.filename:
            raise HTTPException(400, "File has no extension")

        ext = file.filename.split(".")[-1].lower()
        if ext not in self.ALLOWED_IMAGE_EXTENSIONS:
            allowed = ", ".join(self.ALLOWED_IMAGE_EXTENSIONS)
            raise HTTPException(400, f"Invalid file extension. Allowed: {allowed}")

        safe_name = f"{uuid.uuid4().hex}_{datetime.now().strftime('%Y%m%d_%H%M%S')}"

        if ext:
            safe_name = f"{safe_name}.{ext}"

        s3_key = f"{subfolder}/{safe_name}"

        try:
            self.client.put_object(
                Bucket=self.bucket,
                Key=s3_key,
                Body=content,
                ContentType=file.content_type or "application/octet-stream",
            )

            return {
                "file_url": f"{self.endpoint}/{self.bucket}/{s3_key}",
                "s3_key": s3_key,
                "file_name": file.filename,
                "file_size": file_size,
            }
        except ClientError as e:
            logger.error(f"S3 upload failed: {e}")
            raise HTTPException(500, f"S3 upload failed: {e}")
        except Exception as e:
            logger.error(f"Upload error: {e}")
            raise HTTPException(500, f"Upload failed: {str(e)}")

    async def delete_file(self, s3_key: str) -> bool:

        try:
            self.client.delete_object(Bucket=self.bucket, Key=s3_key)
            logger.info(f"File deleted successfully from S3: {s3_key}")
        except ClientError as e:
            logger.error(f"S3 delete failed for {s3_key}: {e}")
            raise HTTPException(500, f"S3 delete failed: {e}")
        except Exception as e:
            logger.error(f"Delete error for {s3_key}: {e}")
            raise HTTPException(500, f"Delete failed: {str(e)}")


s3_client = TimewebS3Client()
