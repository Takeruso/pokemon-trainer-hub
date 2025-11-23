import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <div className="search-wrapper">
      <input
        value={value}
        placeholder={placeholder ?? 'Search...'}
        className="searchPokemon search-input"
        onChange={(e) => onChange(e.target.value)}
      />

      {value && (
        <span
          className="search-clear"
          role="button"       
          tabIndex={0}       
          onClick={() => onChange('')}
          onKeyDown={(e) => { 
            if (e.key === 'Enter' || e.key === ' ') {
              onChange('');
            }
          }}
          aria-label="Clear search"
        >
          ×
        </span>
      )}
    </div>
  );
}

export default SearchBar;
