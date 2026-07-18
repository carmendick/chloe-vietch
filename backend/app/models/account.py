from app.extensions import db
from datetime import datetime


# class TikTokAccount(db.Model):

#     __tablename__ = "tiktok_accounts"

#     id = db.Column(
#         db.Integer,
#         primary_key=True
#     )

#     nickname = db.Column(
#         db.String(100),
#         nullable=False
#     )

#     open_id = db.Column(
#         db.String(255),
#         unique=True,
#         nullable=False
#     )

#     avatar = db.Column(
#         db.String(500)
#     )

#     access_token = db.Column(
#         db.Text,
#         nullable=False
#     )

#     refresh_token = db.Column(
#         db.Text
#     )

#     expires_at = db.Column(
#         db.DateTime
#     )

#     user_id = db.Column(
#         db.Integer,
#         db.ForeignKey("users.id"),
#         nullable=False
#     )

#     posts = db.relationship(
#         "Post",
#         backref="account",
#         lazy=True
#     )



class TikTokAccount(db.Model):

    __tablename__ = "tiktok_accounts"

    id = db.Column(db.Integer, primary_key=True)

    nickname = db.Column(db.String(100), nullable=False)

    open_id = db.Column(db.String(255), unique=True, nullable=False)

    avatar = db.Column(db.String(500))

    access_token = db.Column(db.Text, nullable=False)

    refresh_token = db.Column(db.Text)

    expires_at = db.Column(db.DateTime)

    scope = db.Column(db.String(255))

    is_active = db.Column(
        db.Boolean,
        default=True
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )