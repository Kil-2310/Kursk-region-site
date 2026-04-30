FROM python:3.12-slim-bookworm

WORKDIR /backend

COPY ./prod_requirements.txt .
RUN pip install --no-cache-dir -r prod_requirements.txt

COPY ./.env* ./
COPY ./main.py ./main.py

COPY ./app ./app

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
