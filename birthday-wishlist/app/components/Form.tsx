"use client";
import React from "react";

type FormProps = {
  children: React.ReactNode;
  onSubmit?: (formData: FormData) => Promise<void> | void;
  className?: string;
};

const Form = ({ children, onSubmit, className }: FormProps) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (onSubmit) await onSubmit(formData);
  };

  return <form onSubmit={handleSubmit} className={className}>{children}</form>;
};

export default Form;
