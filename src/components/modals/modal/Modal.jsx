import { useEffect } from "react";
import clsx from "clsx";
import s from "./Modal.module.css";

function Modal({ isOpen, onClose, children, size = "md", className = "" }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={s.backdrop}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={clsx(s.modal, s[size], className)}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
