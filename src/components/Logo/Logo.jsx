import css from "./Logo.module.css";

const Logo = () => {
  return (
    <>
      <div className={css.logobox}>
        <a href="#" className={css.logoLink}>
          <img className={css.logoImg} src="/favicon.svg" alt="Logo" />
          <span className={css.logoTitle}>PhotoShare</span>
        </a>
      </div>
    </>
  );
};

export default Logo;
