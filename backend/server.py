from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import json

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

    if file is None:
        return jsonify({
            "success": False,
            "message": "No file uploaded"
        }), 400

    save_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    file.save(save_path)

    return jsonify({
        "success": True,
        "filename": file.filename
    })


@app.route("/draft", methods=["POST"])
def draft():

    data = request.get_json()

    if data is None:
        return jsonify({
            "saved": False
        }), 400

    os.makedirs("drafts", exist_ok=True)

    title = data.get(
        "title",
        "untitled"
    )

    filename = (
        title.replace(" ", "_")
        + ".json"
    )

    filepath = os.path.join(
        "drafts",
        filename
    )

    with open(filepath, "w") as f:
        json.dump(
            data,
            f,
            indent=2
        )

    return jsonify({
        "saved": True
    })


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5001,
        debug=True
    )