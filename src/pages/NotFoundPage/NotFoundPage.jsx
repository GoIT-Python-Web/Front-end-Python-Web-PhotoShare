import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import css from "./NotFoundPage.module.css";
import nfp from "../../assets/images/NotFoundPage/nfp_img@2x.jpg";

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/posts");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="container">
      <div className={css.nfp_wrap}>
        <div className={css.img_wrap_desktop}>
          <img className={css.nfp_img} src={nfp} alt="Not Found Picture" />
        </div>
        <div className={css.text_wrap}>
          <h1 className={css.nfp_title}>
            <span className={css.nfp_title_accent}>Ooops!</span> Щось розмилося.
            <br /> Цей момент Не Збережено
          </h1>
          <p className={css.nfp_404}>
            4<span className={css.nfp_404_accent}>0</span>4
          </p>
          <div className={css.img_wrap}>
            <img className={css.nfp_img} src={nfp} alt="Not Found Picture" />
          </div>
          <p className={css.nfp_dscr}>
            Сторінку не знайдено.{" "}
            <span className={css.dscr_tablet}>
              Але не засмучуйтесь — повернімося назад і знайдемо щось цікаве.
            </span>
          </p>
          <div className={css.nfp_btn_wrap}>
            <Link to="/posts" className={css.nfp_btn_link}>
              Повернутися до світлин
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
