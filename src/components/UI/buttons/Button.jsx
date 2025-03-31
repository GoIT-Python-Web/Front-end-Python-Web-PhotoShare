import React from "react";
import s from "./Button.module.css";

const ArrowIcon = ({ position, variant }) => (
  <span className={`${s.arrow} ${s[position]}`}>
    <svg
      width="21"
      height="14"
      viewBox="0 0 21 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {position === "left" ? (
        <path
          d="M20.2129 6.96313H2.71289M8.40039 13.0881L2.27539 6.96313L8.40039 0.838135"
          stroke={variant === "secondary" ? "darkblue" : "white"}
          strokeWidth="2"
        />
      ) : (
        <path
          d="M0.787109 7.03687H18.2871M12.5996 0.911866L18.7246 7.03687L12.5996 13.1619"
          stroke={variant === "secondary" ? "darkblue" : "white"}
          strokeWidth="2"
        />
      )}
    </svg>
  </span>
);

const Button = ({
  size = "md",
  variant = "primary",
  disabled = false,
  withArrow = false,
  arrowPosition = "right",
  children,
  ...props
}) => {
  return (
    <button
      className={`${s.button} ${s[size]} ${s[variant]} ${
        disabled ? s.disabled : ""
      }`}
      disabled={disabled}
      {...props}
    >
      {withArrow && arrowPosition === "left" && (
        <ArrowIcon position="left" variant={variant} />
      )}
      {children}
      {withArrow && arrowPosition === "right" && (
        <ArrowIcon position="right" variant={variant} />
      )}
    </button>
  );
};

export default Button;
