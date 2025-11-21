import React from 'react';

type Props = {
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
};

export default function FormInput({
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  className,
}: Props) {
  return (
    <div className="mb-3">
      <input
        name={name}
        type={type}
        className={`form-input ${className ?? ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <div className="mt-1 text-danger small">{error}</div>}
    </div>
  );
}
