from flask import Blueprint, request, jsonify, current_app

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from app.extensions import db

from app.models import Post

import os
from uuid import uuid4



posts_bp = Blueprint(
    "posts",
    __name__,
    url_prefix="/posts"
)


@posts_bp.route("", methods=["POST"])
@jwt_required()
def create_post():

    user_id = int(get_jwt_identity())

    data = request.get_json()

    post = Post(

        caption=data.get("caption"),

        video_path=data.get("video_path"),

        status="draft",

        user_id=user_id

    )

    db.session.add(post)

    db.session.commit()

    return jsonify({

        "success": True,

        "post_id": post.id

    })


@posts_bp.route("", methods=["GET"])
@jwt_required()
def list_posts():

    user_id = int(get_jwt_identity())

    posts = Post.query.filter_by(

        user_id=user_id

    ).all()

    return jsonify([

      {
            "id": p.id,

            "caption": p.caption,

            "status": p.status,

            "video": p.video_path,

            "created_at": p.created_at.strftime("%Y-%m-%d %H:%M")
      }

        for p in posts

    ])


@posts_bp.route("/<int:post_id>", methods=["DELETE"])
@jwt_required()
def delete_post(post_id):

    user_id = int(get_jwt_identity())

    post = Post.query.filter_by(
        id=post_id,
        user_id=user_id
    ).first()

    if not post:

        return jsonify({
            "success": False,
            "message": "Post not found."
        }), 404

    db.session.delete(post)

    db.session.commit()

    return jsonify({
        "success": True
    })


@posts_bp.route("/<int:post_id>", methods=["PUT"])
@jwt_required()
def update_post(post_id):

    user_id = int(get_jwt_identity())

    post = Post.query.filter_by(
        id=post_id,
        user_id=user_id
    ).first()

    if not post:

        return jsonify({
            "success": False,
            "message": "Post not found."
        }), 404

    data = request.get_json()

    post.caption = data.get(
        "caption",
        post.caption
    )

    db.session.commit()

    return jsonify({

        "success": True,

        "post": {

            "id": post.id,

            "caption": post.caption,

            "status": post.status

        }

    })

@posts_bp.route("/upload", methods=["POST"])
@jwt_required()
def upload_video():

    if "video" not in request.files:

        return jsonify({

            "success": False,
            "message": "No file uploaded."

        }), 400

    file = request.files["video"]

    if file.filename == "":

        return jsonify({

            "success": False,
            "message": "Invalid filename."

        }), 400

    extension = file.filename.rsplit(".", 1)[-1]

    filename = f"{uuid4()}.{extension}"

    upload_folder = os.path.join(
        current_app.root_path,
        "..",
        "uploads"
    )

    os.makedirs(upload_folder, exist_ok=True)

    filepath = os.path.join(
        upload_folder,
        filename
    )

    file.save(filepath)

    print("Saved file:", filepath)

    print("Returning:", f"uploads/{filename}")

    return jsonify({

        "success": True,

        "video_path": f"uploads/{filename}"

    

    })
