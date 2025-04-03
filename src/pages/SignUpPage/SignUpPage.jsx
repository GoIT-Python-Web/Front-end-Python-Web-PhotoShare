import Container from "../../components/container/container.jsx";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import css from "../SignUpPage/SingUpPage.module.css";

const SignUpPage = () => {
  return (
    <Container>
      <a href="/" className={css.Logo}>
        <img src="/favicon.svg" alt="Logo" />
        <span className={css.logoText}>PhotoShare</span>
      </a>
      <div className={css.wrap}>
        <img src="/public/bg.jpg" className={css.img} alt="img" />
        <div className={css.wrapForm}>
          <h2 className={css.title}>Реєстрація</h2>
          <SignUpForm />
        </div>
      </div>
    </Container>
  );
};

export default SignUpPage;
