import boto3
import uuid

from fastapi import HTTPException, UploadFile
from datetime import datetime
from botocore.exceptions import ClientError
from ..config_data import (
    S3_ACCESS_KEY,
    S3_SECRET_KEY,
    S3_BUCKET,
    S3_REGION,
    S3_ENDPOINT,
    logger,
)


class TimewebS3Client:
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
        ext = file.filename.split(".")[-1] if "." in file.filename else ""
        safe_name = f"{uuid.uuid4().hex}_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        if ext:
            safe_name = f"{safe_name}.{ext}"

        s3_key = f"{subfolder}/{safe_name}"
        content = await file.read()

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
                "file_size": len(content),
            }
        except ClientError as e:
            logger.error(f"S3 upload failed: {e}")
            raise HTTPException(500, f"S3 upload failed: {e}")
        except Exception as e:
            logger.error(f"Upload error: {e}")
            raise HTTPException(500, f"Upload failed: {str(e)}")


s3_client = TimewebS3Client()
