import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import UploadCard from "../components/UploadCard";
import Button from "../components/Button";

import {
    uploadVideo,
    createPost
} from "../services/post";

import { useAuth } from "../context/AuthContext";

export default function Upload() {

    const { token } = useAuth();

    const [file, setFile] = useState(null);

    const [videoURL, setVideoURL] = useState("");

    const [duration, setDuration] = useState(0);

    const [caption, setCaption] = useState("");

    const [loading, setLoading] = useState(false);

    function handleFileChange(e) {

        const selected = e.target.files[0];

        if (!selected) return;

        setFile(selected);

        const url = URL.createObjectURL(selected);

        setVideoURL(url);

        const video = document.createElement("video");

        video.preload = "metadata";

        video.src = url;

        video.onloadedmetadata = () => {

            setDuration(video.duration);

        };

    }
async function saveDraft() {

    if (!file) {

        alert("Choose a video first.");

        return;

    }

    setLoading(true);

    try {

        const upload = await uploadVideo(
            token,
            file
        );

        console.log("Upload response:", upload);

        await createPost(
            token,
            {
                caption,
                video_path: upload.video_path
            }
        );

        alert("Draft saved!");

        setCaption("");

        setFile(null);

        setVideoURL("");

        setDuration(0);

    }

    catch (e) {

        console.error(e);

        alert("Upload failed.");

    }

    finally {

        setLoading(false);

    }

}

    return (

        <DashboardLayout>

            <UploadCard

                file={file}

                onFileChange={handleFileChange}

            />

            {file && (

                <div className="video-info">

                    <h3>{file.name}</h3>

                    <p>

                        {(file.size / 1024 / 1024).toFixed(2)} MB

                    </p>

                    <p>

                        {file.type}

                    </p>

                    <p>

                        {duration.toFixed(1)} seconds

                    </p>

                </div>

            )}

            <textarea

                className="input"

                rows="5"

                placeholder="Write a caption..."

                value={caption}

                onChange={(e) =>

                    setCaption(e.target.value)

                }

            />

            <p>

                {caption.length}/2200 characters

            </p>

            <Button

                onClick={saveDraft}

                disabled={loading}

            >

                {

                    loading

                        ? "Uploading..."

                        : "Save Draft"

                }

            </Button>

        </DashboardLayout>

    );

}