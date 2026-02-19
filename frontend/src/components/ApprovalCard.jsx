import React from "react";
import { approvePost, rejectPost } from "../api";

export default function ApprovalCard({ job, refresh }) {
    const handleApprove = async () => {
        await approvePost(job.id);
        refresh();
    };

    const handleReject = async () => {
        await rejectPost(job.id);
        refresh();
    };

    return (
        <div className="card">
            <h3>Generated Post</h3>

            <p className="post-text">{job.data.post.text}</p>

            <div className="hashtags">
                {job.data.post.hashtags.map((tag, i) => (
                    <span key={i}>{tag}</span>
                ))}
            </div>

            <p className="cta">{job.data.post.cta}</p>

            <img
                src="https://via.placeholder.com/400"
                alt="Generated"
                className="image"
            />

            <div className="actions">
                <button className="approve" onClick={handleApprove}>
                    Approve
                </button>
                <button className="reject" onClick={handleReject}>
                    Reject
                </button>
            </div>
        </div>
    );
}
