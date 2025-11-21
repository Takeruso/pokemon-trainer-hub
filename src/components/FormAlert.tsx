import React from 'react';

type Props = {
  message?: string;
  variant?: 'success' | 'danger';
};

export default function FormAlert({ message, variant = 'danger' }: Props) {
  if (!message) return null;
  const cls =
    variant === 'success' ? 'alert alert-success' : 'alert alert-danger';
  return <div className={cls}>{message}</div>;
}
