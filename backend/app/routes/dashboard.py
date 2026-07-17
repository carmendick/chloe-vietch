from flask import Blueprint, jsonify

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from app.models import (
    User,
    Post,
    TikTokAccount
)

dashboard_bp = Blueprint(
    "dashboard",
    __name__,
    url_prefix="/dashboard"
)


@dashboard_bp.route("/stats")
@jwt_required()
def stats():

    user_id = int(get_jwt_identity())

    total_accounts = TikTokAccount.query.filter_by(
        user_id=user_id
    ).count()

    drafts = Post.query.filter_by(
        user_id=user_id,
        status="draft"
    ).count()

    scheduled = Post.query.filter_by(
        user_id=user_id,
        status="scheduled"
    ).count()

    published = Post.query.filter_by(
        user_id=user_id,
        status="published"
    ).count()

    return jsonify({

        "accounts": total_accounts,

        "drafts": drafts,

        "scheduled": scheduled,

        "published": published

    })