import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import { useAuth } from "../context/AuthContext";

import {
    getPosts,
    deletePost
} from "../services/post";

export default function Queue() {

    const { token } = useAuth();

    const [posts, setPosts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadPosts();

    }, []);

    async function loadPosts() {

        try {

            const data = await getPosts(token);

            setPosts(data);

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    }

    async function removePost(id) {

        if (!window.confirm("Delete this draft?")) {

            return;

        }

        try {

            await deletePost(token, id);

            setPosts(current =>
                current.filter(post => post.id !== id)
            );

        }

        catch (err) {

            console.error(err);

            alert("Failed to delete draft.");

        }

    }

    const filteredPosts = posts.filter(post =>
        (post.caption || "")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (

        <DashboardLayout>

            <h1>Draft Queue</h1>

            <br />

            <input

                className="input"

                type="text"

                placeholder="Search drafts..."

                value={search}

                onChange={(e) =>
                    setSearch(e.target.value)
                }

                style={{
                    marginBottom: "20px",
                    maxWidth: "400px"
                }}

            />

            {loading ? (

                <p>Loading drafts...</p>

            ) : filteredPosts.length === 0 ? (

                <p>No drafts found.</p>

            ) : (

                <table className="table">

                    <thead>

                        <tr>

                            <th>Caption</th>

                            <th>Status</th>

                            <th>Created</th>

                            <th>Video</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredPosts.map(post => (

                            <tr key={post.id}>

                                <td>

                                    {post.caption || "(No Caption)"}

                                </td>

                                <td>

                                    <span
                                        className={`badge ${post.status}`}
                                    >

                                        {post.status}

                                    </span>

                                </td>

                                <td>

                                    {post.created_at || "-"}

                                </td>

                                <td>

                                    {post.video}

                                </td>

                                <td>

                                    <button

                                        onClick={() =>
                                            console.log("Edit:", post)
                                        }

                                        style={{
                                            marginRight: "10px"
                                        }}

                                    >

                                        ✏️ Edit

                                    </button>

                                    <button

                                        onClick={() =>
                                            removePost(post.id)
                                        }

                                    >

                                        🗑 Delete

                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}

        </DashboardLayout>

    );

}