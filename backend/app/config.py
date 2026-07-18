import os

class Config:

    SECRET_KEY = os.getenv(
        "SECRET_KEY",
        "creatordesk-secret-key"
    )

    JWT_SECRET_KEY = os.getenv(
        "JWT_SECRET_KEY",
        "creatordesk-jwt-secret"
    )

    SQLALCHEMY_DATABASE_URI = (
        "sqlite:///creator.db"
    )

    TIKTOK_CLIENT_KEY = os.getenv(
        "TIKTOK_CLIENT_KEY"
    )

    TIKTOK_CLIENT_SECRET = os.getenv(
        "TIKTOK_CLIENT_SECRET"
    )

    TIKTOK_REDIRECT_URI = os.getenv(
        "TIKTOK_REDIRECT_URI"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False