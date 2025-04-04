import SignInForm from "../../components/SignInForm/SignInForm";
import css from "../SignInPage/SignInPage.module.css";

const SignInPage = () => {
  return (
    <>
      <div className="container">
        <div className={css.wrap}>
          <picture className={css.img}>
            <source
              srcSet="/public/bg.jpg  1x, 
                      /public/bg@2x.jpg  2x"
              media="(max-width:1439px)"
              width="768"
              height="283"
            />
            <source
              srcSet="/public/bg.jpg  1x, 
                      /public/bg@2x.jpg  2x"
              media="(min-width:1440px)"
              width="575"
              height="600"
            />
            <img
              src="/public/bg.jpg"
              srcSet="/public/bg@2x.jpg 2x"
              alt="Background image"
              width="768"
              height="283"
            />
            <p className={css.imgTxt}>A place where every frame matters</p>
          </picture>
          <div className={css.wrapForm}>
            <h2 className={css.title}>вхід</h2>
            <SignInForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
