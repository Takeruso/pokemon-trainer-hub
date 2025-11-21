import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      value={value}
      placeholder="Search ..."
      className="searchPokemon"
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchBar;
