import os

from app import create_app

from flask import jsonify

from flask_cors import CORS


# Create the Flask application FIRST
app = create_app()


CORS(
    app,
    origins=[
        "https://peaceful-selkie-c89412.netlify.app/"
    ],
    supports_credentials=True
)

@app.route("/")
def home():
    return jsonify({
        "name": "CreatorDesk API",
        "status": "online",
        "version": "1.0"
    })


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5001)),
        debug=True,
    )

# from app import create_app

# app = create_app()

# if __name__ == "__main__":

#     app.run(
#         host="0.0.0.0",
#         port=5001,
#         debug=True
#     )