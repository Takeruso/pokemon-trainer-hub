import React from 'react';

type Props = {
  onSubmit?: (e: React.FormEvent) => void;
  children: React.ReactNode;
};

export default function FormWrapper({ onSubmit, children }: Props) {
  return (
    <div className="col-12 d-flex justify-content-center">
      <form onSubmit={onSubmit} style={{ maxWidth: '400px', width: '100%' }}>
        {children}
      </form>
    </div>
  );
}
