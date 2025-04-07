import css from "./Logo.module.css";

const Logo = ({
  display = "header_footer",
  logoImg = "headerLogo",
  logoTitle = "headerTitle",
}) => {
  return (
    <>
      <div className={`${css.logoBox} ${css[display]}`}>
        <a href="#" className={css.link}>
          <img
            className={css[logoImg]}
            src="/src/assets/icons/favicon.svg"
            alt="Logo"
          />
          <span className={`${css.title} ${css[logoTitle]}`}>PhotoShare</span>
        </a>
      </div>
    </>
  );
};

export default Logo;
