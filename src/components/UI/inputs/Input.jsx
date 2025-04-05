import { useState } from "react";
import s from "./Input.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  disabled = false,
  error = false,
  showPassword = false,
  errorMessage = "",
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(showPassword);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className={`${s.inputWrapper} ${error ? s.error : ""}`}>
      <input
        type={isPasswordVisible ? "text" : type}
        className={`${s.input} ${disabled ? s.disabled : ""} ${
          error ? s.error : ""
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      {type === "password" && (
        <span className={s.eyeIcon} onClick={togglePasswordVisibility}>
          {isPasswordVisible ? (
            <FaEye className={s.icon} />
          ) : (
            <FaEyeSlash className={s.icon} />
          )}
        </span>
      )}
      {error && <span className={s.errorMessage}>{errorMessage}</span>}
    </div>
  );
};

export default Input;
