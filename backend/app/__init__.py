from flask import Flask
from flask_cors import CORS

from .config import Config
from .extensions import (
    db,
    bcrypt,
    jwt,
    migrate
)


def create_app():

    app = Flask(__name__)

    app.config.from_object(Config)

    CORS(app)

    db.init_app(app)

    bcrypt.init_app(app)

    jwt.init_app(app)

    from . import models

    migrate.init_app(app, db)

    from .routes.auth import auth_bp

    from .routes.dashboard import dashboard_bp

    from .routes.accounts import accounts_bp

    from .routes.posts import posts_bp

    app.register_blueprint(auth_bp)

    app.register_blueprint(dashboard_bp)

    app.register_blueprint(accounts_bp)

    app.register_blueprint(posts_bp)

    return app
