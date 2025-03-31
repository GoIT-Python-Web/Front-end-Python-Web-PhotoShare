import Container from "../../components/Container/Container";
import SignInForm from "../../components/SignInForm/SignInForm";
import css from "./SignInPage.module.css";

const SignInPage = () => {
  return (
    <Container className={css.signInPage}>
      <SignInForm />
    </Container>
  );
};

export default SignInPage;
