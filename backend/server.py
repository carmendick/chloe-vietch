from flask import Flask, jsonify, request
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route("/")
def home():
    return jsonify({
        "status": "running",
        "app": "CreatorDesk Backend"
    })


@app.route("/health")
def health():
    return jsonify({
        "ok": True
    })


@app.route("/upload", methods=["POST"])
def upload():

    file = request.files.get("video")

    if not file:
        return jsonify({
            "success": False,
            "message": "No file uploaded"
        }), 400

    path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    file.save(path)

    return jsonify({
        "success": True,
        "filename": file.filename
    })


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5001,
        debug=True
    )