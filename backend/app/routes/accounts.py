from flask import Blueprint, jsonify

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from app.extensions import db
from app.models import TikTokAccount

accounts_bp = Blueprint(
    "accounts",
    __name__,
    url_prefix="/accounts"
)


@accounts_bp.route("", methods=["GET"])
@jwt_required()
def get_accounts():

    user_id = int(get_jwt_identity())

    accounts = TikTokAccount.query.filter_by(
        user_id=user_id
    ).all()

    return jsonify([

        {
            "id": account.id,
            "nickname": account.nickname,
            "avatar": account.avatar
        }

        for account in accounts

    ])


@accounts_bp.route("/demo-connect", methods=["POST"])
@jwt_required()
def demo_connect():

    user_id = int(get_jwt_identity())

    existing = TikTokAccount.query.filter_by(
        user_id=user_id,
        open_id="demo_open_id"
    ).first()

    if existing:

        return jsonify({
            "success": True,
            "account": {
                "id": existing.id,
                "nickname": existing.nickname,
                "avatar": existing.avatar
            }
        })

    account = TikTokAccount(

        nickname="Creator Demo",

        open_id="demo_open_id",

        avatar="https://placehold.co/100x100",

        access_token="demo_access",

        refresh_token="demo_refresh",

        user_id=user_id

    )

    db.session.add(account)

    db.session.commit()

    return jsonify({

        "success": True,

        "account": {

            "id": account.id,

            "nickname": account.nickname,

            "avatar": account.avatar

        }

    })



####################
# from flask import Blueprint, jsonify

# from flask_jwt_extended import (
#     jwt_required,
#     get_jwt_identity
# )

# from app.models import TikTokAccount

# accounts_bp = Blueprint(
#     "accounts",
#     __name__,
#     url_prefix="/accounts"
# )


# @accounts_bp.route("", methods=["GET"])
# @jwt_required()
# def get_accounts():

#     user_id = int(get_jwt_identity())

#     accounts = TikTokAccount.query.filter_by(
#         user_id=user_id
#     ).all()

#     return jsonify([

#         {
#             "id": account.id,
#             "nickname": account.nickname,
#             "avatar": account.avatar
#         }

#         for account in accounts

#     ])