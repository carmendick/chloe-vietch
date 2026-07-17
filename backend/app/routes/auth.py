from flask import Blueprint, request, jsonify

from flask_bcrypt import (
    generate_password_hash,
    check_password_hash
)

from flask_jwt_extended import (
    create_access_token
)

from app.extensions import db

from app.models import User


auth_bp = Blueprint(
    "auth",
    __name__,
    url_prefix="/auth"
)


@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:

        return jsonify({
            "success": False,
            "message": "Email and password required."
        }), 400

    existing = User.query.filter_by(
        email=email
    ).first()

    if existing:

        return jsonify({
            "success": False,
            "message": "Email already exists."
        }), 409

    user = User(
        email=email,
        password=generate_password_hash(password).decode("utf-8")
    )

    db.session.add(user)

    db.session.commit()

    return jsonify({
        "success": True
    })


@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")

    password = data.get("password")

    user = User.query.filter_by(
        email=email
    ).first()

    if not user:

        return jsonify({

            "success": False,

            "message": "Invalid email or password."

        }), 401

    if not check_password_hash(
        user.password,
        password
    ):

        return jsonify({

            "success": False,

            "message": "Invalid email or password."

        }), 401

    token = create_access_token(

        identity=str(user.id),

        additional_claims={
            "email": user.email,
            "role": user.role
        }

    )

    return jsonify({

        "success": True,

        "token": token,

        "user": user.to_dict()

    })