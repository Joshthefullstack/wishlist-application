import React from "react";
import Wishlists from "./Wishlists";

type ModalProps = {
  ModalId: string;
  ModalTitle: string;
  ModalBtnTitle?: string;
  children?: React.ReactNode;
  editId?: string;
};

const Modal = ({
  ModalId,
  ModalTitle,
  children,
  editId,
  ModalBtnTitle,
}: ModalProps) => {
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      {/* <dialog id={ModalId} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{ModalTitle}</h3>
          <p className="py-4 title">{children}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-neutral" type="submit">
                {ModalBtnTitle}
              </button>
              <button className="btn ml-3">Close</button>
            </form>
          </div>
        </div>
      </dialog> */}

      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <dialog id={ModalId} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-lg">{ModalTitle}</h3>
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </div>
          </form>
          {/* <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p> */}
          {children}
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
