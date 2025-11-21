import React, { useState } from 'react';
import { Comment } from '../api/comments';
import DeleteConfirmModal from './DeleteConfirmModal';

interface CommentCardProps {
  comment: Comment;
  onLike: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (comment: Comment) => void;
}

export default function CommentCard({
  comment,
  onLike,
  onDelete,
  onEdit,
}: CommentCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState({ ...comment });

  const handleLike = () => {
    if (comment._id) {
      onLike(comment._id);
      setDraft({ ...draft, likes: draft.likes + 1 });
    }
  };

  const startEdit = () => setIsEditing(true);

  const saveEdit = () => {
    onEdit(draft);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setDraft({ ...comment });
    setIsEditing(false);
  };

  const [confirming, setConfirming] = useState(false);
  const handleDelete = () => {
    if (comment._id) setConfirming(true);
  };

  const confirmDelete = () => {
    if (comment._id) onDelete(comment._id);
    setConfirming(false);
  };

  return (
    <div className="comment-card mb-3">
      <div className="card-body">
        {/* author */}
        {!isEditing ? (
          <h5 className="comment-author">{draft.name}</h5>
        ) : (
          <input
            className="form-control"
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
          />
        )}

        {/* body */}
        {!isEditing ? (
          <p>{draft.comment}</p>
        ) : (
          <textarea
            className="form-control"
            value={draft.comment}
            onChange={(e) => setDraft({ ...draft, comment: e.target.value })}
          />
        )}

        {/* likes */}
        <p>❤️ {draft.likes} Likes</p>

        {!isEditing ? (
          <div>
            <button
              onClick={handleLike}
              className="btn btn-outline-primary me-2"
            >
              👍 Like
            </button>
            <button
              onClick={startEdit}
              className="btn btn-outline-warning me-2"
            >
              ✏️ Edit
            </button>
            <button onClick={handleDelete} className="btn btn-outline-danger">
              🗑 Delete
            </button>
            <DeleteConfirmModal
              show={confirming}
              onConfirm={confirmDelete}
              onCancel={() => setConfirming(false)}
            />
          </div>
        ) : (
          <div>
            <button onClick={saveEdit} className="btn btn-outline-success me-2">
              💾 Save
            </button>
            <button onClick={cancelEdit} className="btn btn-outline-secondary">
              ❌ Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
