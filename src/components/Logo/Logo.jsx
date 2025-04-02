// import sprite from "/public/sprite.svg";
import css from "./Logo.module.css";

const Logo = () => {
  return (
    <>
      <div className={css.logobox}>
        <a href="#" className={css.logolink}>
          {/* <svg className={css.icon}>
            <use xlinkHref={`${sprite}#logo`} href={`${sprite}#logo`} />
          </svg> */}
          <div className={css.tempImg}>👁️</div> {/* Тимчасова іконка :) */}
          <h3 className={css.title}>PhotoShare</h3>
        </a>
      </div>
    </>
  );
};

export default Logo;
