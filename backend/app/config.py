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

    SQLALCHEMY_TRACK_MODIFICATIONS = False