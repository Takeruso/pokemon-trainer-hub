import React, { useState } from 'react';
import { Pokemon } from '../hooks/useDB';

interface PokemonCardProps {
  pokemon: Pokemon;
  onLike: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (pokemon: Pokemon) => void;
}

function PokemonCard({ pokemon, onLike, onDelete, onEdit }: PokemonCardProps) {
  const [editing, setEditing] = useState(false);
  const [local, setLocal] = useState({ ...pokemon });

  const handleLike = () => {
    if (pokemon._id) {
      onLike(pokemon._id);
      setLocal({ ...local, likes: local.likes + 1 });
    }
  };

  const startEdit = () => {
    setEditing(true);
  };

  const saveEdit = () => {
    onEdit(local);
    setEditing(false);
  };

  const cancelEdit = () => {
    setLocal({ ...pokemon });
    setEditing(false);
  };

  return (
    <div className="pokemon-card mb-3">
      <div className="card-body">
        <div className="row">
          <div className="col-12 d-flex justify-content-between">
            {!editing ? (
              <h5 className="card-title">{local.name}</h5>
            ) : (
              <input
                value={local.name}
                onChange={(e) => setLocal({ ...local, name: e.target.value })}
                className="form-control"
              />
            )}
          </div>

          <div className="col-12">
            {!editing ? (
              <p className="card-text">{local.comment}</p>
            ) : (
              <textarea
                value={local.comment}
                onChange={(e) =>
                  setLocal({ ...local, comment: e.target.value })
                }
                className="form-control"
              />
            )}
          </div>

          <div className="col-12">
            <p className="card-text">❤️ {local.likes} Likes</p>
          </div>

          {!editing ? (
            <div className="col-12">
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
              <button
                onClick={() => pokemon._id && onDelete(pokemon._id)}
                className="btn btn-outline-danger"
              >
                🗑 Delete
              </button>
            </div>
          ) : (
            <div className="col-12">
              <button
                onClick={saveEdit}
                className="btn btn-outline-success me-2"
              >
                💾 Save
              </button>
              <button
                onClick={cancelEdit}
                className="btn btn-outline-secondary"
              >
                ❌ Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
