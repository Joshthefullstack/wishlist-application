"use client"
import React from 'react';

type ModalButtonProps = {
  wishListModal: string;
  title?: string;
  className?: string;
  icon?: React.ReactNode;
};

const ModalButton = ({
  wishListModal,
  title,
  className,
  icon,
}: ModalButtonProps) => {
  const handleClick = () => {
    const modal = document.getElementById(
      wishListModal
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    } else {
      console.error(`Modal with id="${wishListModal}" not found in DOM.`);
    }
  };

  return (
    <button onClick={handleClick} className={className}>
      {icon && <span>{icon}</span>}
      {title}
    </button>
  );
};


export default ModalButton