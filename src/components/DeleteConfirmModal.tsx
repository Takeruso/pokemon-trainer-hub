import React from 'react';

interface Props {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({
  show,
  onConfirm,
  onCancel,
}: Props) {
  if (!show) return null;

  return (
    <div className="modal-backdrop-custom">
      <div className="modal-content-custom">
        <h5>Delete Comment</h5>
        <p>Are you sure you want to delete this comment?</p>

        <button className="btn btn-danger me-2" onClick={onConfirm}>
          Yes, delete
        </button>
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
