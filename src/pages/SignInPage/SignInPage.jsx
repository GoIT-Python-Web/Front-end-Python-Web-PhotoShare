import SignInForm from "../../components/SignInForm/SignInForm";
import css from "../SignUpPage/SingUpPage.module.css";

const SignInPage = () => {
  return (
    <div className="container">
      <Logo />
      <div className={css.wrap}>
        <img src="/public/bg.jpg" className={css.img} alt="img" />
        <div className={css.wrapForm}>
          <h2 className={css.title}>Вхід</h2>
          <SignInForm />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
