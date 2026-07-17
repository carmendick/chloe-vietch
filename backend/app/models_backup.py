from datetime import datetime

from .extensions import db


class User(db.Model):

    __tablename__ = "users"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    email = db.Column(
        db.String(120),
        unique=True,
        nullable=False
    )

    password = db.Column(
        db.String(255),
        nullable=False
    )

    role = db.Column(
        db.String(30),
        default="creator"
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    accounts = db.relationship(
    "TikTokAccount",
    backref="owner",
    lazy=True
    )

    posts = db.relationship(
    "Post",
    backref="author",
    lazy=True
    )

    def to_dict(self):

        return {

            "id": self.id,

            "email": self.email,

            "role": self.role

        }

class TikTokAccount(db.Model):

    __tablename__ = "tiktok_accounts"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    nickname = db.Column(
        db.String(100),
        nullable=False
    )

    open_id = db.Column(
        db.String(255),
        unique=True,
        nullable=False
    )

    avatar = db.Column(
        db.String(500)
    )

    access_token = db.Column(
        db.Text,
        nullable=False
    )

    refresh_token = db.Column(
        db.Text
    )

    expires_at = db.Column(
        db.DateTime
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    posts = db.relationship(
    "Post",
    backref="account",
    lazy=True
    )

class Post(db.Model):

    __tablename__ = "posts"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    caption = db.Column(
        db.Text
    )

    video_path = db.Column(
        db.String(500),
        nullable=False
    )

    status = db.Column(
        db.String(30),
        default="draft"
    )

    scheduled_for = db.Column(
        db.DateTime
    )

    published_at = db.Column(
        db.DateTime
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

    account_id = db.Column(
        db.Integer,
        db.ForeignKey("tiktok_accounts.id")
    )