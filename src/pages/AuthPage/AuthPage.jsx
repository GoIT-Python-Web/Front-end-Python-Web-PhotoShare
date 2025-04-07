import SignUpForm from "../../components/forms/SignUpForm/SignUpForm";
import SignInForm from "../../components/forms/signInForm/SignInForm.jsx";
import css from "../AuthPage/AuthPage.module.css";
import { useLocation, Navigate } from "react-router-dom";

const AuthPage = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="container">
      <a href="/" className={css.Logo}>
        <img src="/favicon.svg" alt="Logo" />
        <span className={css.logoText}>PhotoShare</span>
      </a>

      <div className={css.wrap}>
        <img
          src="/src/assets/images/SignPages/bg.jpg"
          className={css.img}
          alt="img"
        />

        {path === "/register" && <SignUpForm />}
        {path === "/login" && <SignInForm />}
        {!["/register", "/login"].includes(path) && <Navigate to="/login" />}
      </div>
    </div>
  );
};

export default AuthPage;
