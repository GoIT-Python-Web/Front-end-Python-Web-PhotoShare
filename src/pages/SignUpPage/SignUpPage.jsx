import SignUpForm from "../../components/forms/SignUpForm/SignUpForm";
import css from "../SignUpPage/SingUpPage.module.css";

const SignUpPage = () => {
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
        <div className={css.wrapForm}>
          <h2 className={css.title}>Реєстрація</h2>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
