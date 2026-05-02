# test_s3_connection.py
import boto3
from botocore.config import Config
from botocore.exceptions import ClientError

# Вставьте ваши ключи для теста
ACCESS_KEY = "7A4OAR7R74MM18BNXGYJ"
SECRET_KEY = "xFt8rqQJKAUXKKxuw62fLUvR7PI2qa7FU3JOr9nK"
ENDPOINT = "https://s3.twcstorage.ru"
REGION = "ru-1"
BUCKET = "ca8e7152-57fe-4c78-b6cc-9c6a0d8295f7"


def test_connection():
    print("🔍 Тестируем подключение к TWC Storage...")

    client = boto3.client(
        's3',
        endpoint_url=ENDPOINT,
        aws_access_key_id=ACCESS_KEY,
        aws_secret_access_key=SECRET_KEY,
        region_name=REGION,
        config=Config(signature_version='s3v4')
    )

    try:
        # Пробуем получить список бакетов
        response = client.list_buckets()
        print(f"✅ Успешное подключение!")
        print(f"📦 Найдено бакетов: {len(response['Buckets'])}")
        for bucket in response['Buckets']:
            print(f"   - {bucket['Name']}")

        # Проверяем конкретный бакет
        try:
            client.head_bucket(Bucket=BUCKET)
            print(f"✅ Бакет '{BUCKET}' существует и доступен")
        except ClientError as e:
            print(f"❌ Бакет '{BUCKET}' недоступен: {e}")

    except ClientError as e:
        error_code = e.response['Error']['Code']
        error_msg = e.response['Error']['Message']
        print(f"❌ Ошибка: {error_code}")
        print(f"   {error_msg}")

        if error_code == 'SignatureDoesNotMatch':
            print("\n🔧 ПРИЧИНЫ:")
            print("1. Неправильный ACCESS_KEY или SECRET_KEY")
            print("2. Вы скопировали Swift ключи вместо S3")
            print("3. В ключах есть лишние пробелы или символы")
            print("4. Неправильный регион")
        elif error_code == 'InvalidAccessKeyId':
            print("\n🔧 ACCESS_KEY не найден в системе")


if __name__ == "__main__":
    test_connection()