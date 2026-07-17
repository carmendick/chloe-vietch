import { UploadCloud } from "lucide-react";

export default function UploadCard({

    file,

    onFileChange

}) {

    return (

        <div className="upload-card">

            <UploadCloud
                size={60}
            />

            <h2>

                Upload Video

            </h2>

            <p>

                Drag & Drop or Browse

            </p>

            <input

                type="file"

                accept="video/*"

                onChange={onFileChange}

            />

            {

                file && (

                    <p>

                        Selected:

                        {" "}

                        {file.name}

                    </p>

                )

            }

        </div>

    );

}