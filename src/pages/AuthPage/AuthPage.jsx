import SignUpForm from "../../components/forms/SignUpForm/SignUpForm";
import SignInForm from "../../components/forms/signInForm/SignInForm.jsx";
import css from "../AuthPage/AuthPage.module.css";
import { useState } from "react";

const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(true);

  const toggleForm = () => setIsRegistering((prev) => !prev);

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
        {isRegistering ? (
          <SignUpForm onSwitch={toggleForm} />
        ) : (
          <SignInForm onSwitch={toggleForm} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
