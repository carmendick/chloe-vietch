from datetime import datetime

from app.extensions import db


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