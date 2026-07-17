from datetime import datetime

from app.extensions import db


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