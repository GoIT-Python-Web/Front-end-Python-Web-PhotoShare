import { useState } from "react";
import s from "./Input.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Icon from "../icons/Icon";

const Input = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  disabled = false,
  error = false,
  showPassword = false,
  errorMessage = "",
  icon = null,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(showPassword);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className={`${s.inputWrapper} ${error ? s.error : ""}`}>
      {icon && (
        <span className={s.usersInputIcon}>
          <Icon name={icon} stroke="#24448A" width={20} height={20} />
        </span>
      )}
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
