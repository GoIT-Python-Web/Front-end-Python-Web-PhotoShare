import css from "./Logo.module.css";

const Logo = ({
  display = "header",
  logoImg = "headerLogo",
  logoTitle = "headerTitle",
}) => {
  return (
    <>
      <div className={`${css.logoBox} ${css[display]}`}>
        <a href="#" className={css.link}>
          <img className={css[logoImg]} src="/favicon.svg" alt="Logo" />
          <span className={`${css.title} ${css[logoTitle]}`}>PhotoShare</span>
        </a>
      </div>
    </>
  );
};

export default Logo;
