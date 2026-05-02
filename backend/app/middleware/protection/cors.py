import os

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

HOST = os.getenv("HOST")


def setup_cors_protect(app: FastAPI):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            HOST,
            "https://search.google.com",
            "https://webmaster.yandex.ru",
            "https://metrika.yandex.ru",
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        expose_headers=["*"],
    )
