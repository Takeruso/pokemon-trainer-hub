import React, { useState } from 'react';

interface CommentFormProps {
  initialData?: { name: string; comment: string };
  onSave: (data: { name: string; comment: string }) => void;
}

function CommentForm({ initialData, onSave }: CommentFormProps) {
  const [form, setForm] = useState(initialData || { name: '', comment: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...form });
    setForm({ name: '', comment: '' });
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12">
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your Name"
                  className="form-input mb-2"
                  required
                />
              </div>
              <div className="col-12">
                <textarea
                  value={form.comment}
                  onChange={(e) =>
                    setForm({ ...form, comment: e.target.value })
                  }
                  placeholder="Enter your comments"
                  className="form-input mb-2"
                  rows={3}
                  required
                />
              </div>
              <div className="col-12">
                <button type="submit" className="handleLogin">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CommentForm;
