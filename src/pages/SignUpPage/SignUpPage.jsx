import Container from "../../components/Container/Container";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import css from "../SignUpPage/SingUpPage.module.css";

const SignUpPage = () => {
  return (
    <Container>
      <img src="/public/favicon.svg" alt="" />
      <div>
        <h2 className={css.title}>Реєстрація</h2>
        <SignUpForm />
      </div>
    </Container>
  );
};

export default SignUpPage;
