import React, { useState, useMemo } from 'react';
import { useComments } from '../hooks/useComments';
import PokemonForm from '../components/PokemonForm'; // 名前は後で直せ
import PokemonCard from '../components/PokemonCard'; // 同上
import SearchBar from '../components/SearchBar';

function Dashboard() {
  const { comments, createComment, removeComment, editComment, likeComment } =
    useComments();

  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(
    () =>
      comments.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [comments, searchQuery],
  );

  const handleAdd = async (data: { name: string; comment: string }) => {
    await createComment(data);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h1>Dashboard Hub</h1>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12">
          <PokemonForm
            initialData={{ name: '', comment: '' }}
            onSave={handleAdd}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Filter saved comments..."
          />
        </div>
      </div>

      <div className="row">
        {filtered.map((comment) => (
          <div className="col-12" key={comment._id}>
            <PokemonCard
              pokemon={comment} // 型が name/comment/likes ならそのまま使える
              onLike={likeComment}
              onDelete={removeComment}
              onEdit={editComment}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
