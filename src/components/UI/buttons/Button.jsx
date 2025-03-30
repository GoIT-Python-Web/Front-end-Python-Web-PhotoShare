import React from "react";
import s from "./Button.module.css";

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
}) => {
  return (
    <button
      className={`${s.button} ${s[variant]} ${s[size]} ${
        disabled ? s.disabled : ""
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
