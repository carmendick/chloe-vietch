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

    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        "sqlite:///creator.db"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    TIKTOK_CLIENT_KEY = os.getenv(
        "TIKTOK_CLIENT_KEY"
    )

    TIKTOK_CLIENT_SECRET = os.getenv(
        "TIKTOK_CLIENT_SECRET"
    )

    TIKTOK_REDIRECT_URI = os.getenv(
        "TIKTOK_REDIRECT_URI"
    )

    
    UPLOAD_FOLDER = os.getenv(
         "UPLOAD_FOLDER",
         "uploads"
     )










# import os


# class Config:

#     SECRET_KEY = os.getenv(
#         "SECRET_KEY",
#         "creatordesk-secret-key"
#     )

#     JWT_SECRET_KEY = os.getenv(
#         "JWT_SECRET_KEY",
#         "creatordesk-jwt-secret"
#     )

#     SQLALCHEMY_DATABASE_URI = os.getenv(
#         "DATABASE_URL",
#         "sqlite:///creator.db"
#     )

#     SQLALCHEMY_TRACK_MODIFICATIONS = False

#     TIKTOK_CLIENT_KEY = os.getenv(
#         "TIKTOK_CLIENT_KEY"
#     )

#     TIKTOK_CLIENT_SECRET = os.getenv(
#         "TIKTOK_CLIENT_SECRET"
#     )

#     TIKTOK_REDIRECT_URI = os.getenv(
#         "TIKTOK_REDIRECT_URI"
#     )

#     UPLOAD_FOLDER = os.getenv(
#         "UPLOAD_FOLDER",
#         "uploads"
#     )

#     MAX_CONTENT_LENGTH = 1024 * 1024 * 1024   # 1 GB uploads