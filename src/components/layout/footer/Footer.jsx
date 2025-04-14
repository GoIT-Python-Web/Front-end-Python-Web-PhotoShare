import css from "./Footer.module.css";
import { TiSocialFacebook } from "react-icons/ti";
import { IoLogoInstagram } from "react-icons/io5";
import { TfiTwitter } from "react-icons/tfi";
import { SlSocialLinkedin } from "react-icons/sl";
import { useSelector } from "react-redux";
import { selectUser, selectIsLoggedIn } from "../../../store/auth/selectors.js";
import { Link } from "react-router-dom";

const Footer = () => {
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <footer className={css.footer}>
      <div className="container">
        <div className={css.up}>
          <Link to="/" className={css.footerLogo}>
            <img src="/favicon.svg" alt="Logo" />
            <span className={css.footerLogoText}>PhotoShare</span>
          </Link>

          <div className={css.wrap}>
            <div className={css.wrapLinks}>
              <nav className={css.links}>
                <Link to="/posts" className={css.link}>
                  Світлини
                </Link>
                <Link to="/about" className={css.link}>
                  Про нас
                </Link>
                <Link to="/posts/create" className={css.link}>
                  Додати світлину
                </Link>
              </nav>
              <div className={css.links}>
                <Link
                  to={isLoggedIn ? `/profile/${user?.id}` : "/login"}
                  className={css.link}
                >
                  Мій профіль
                </Link>
              </div>
            </div>

            <div className={css.contacts}>
              <div className={css.numberWrap}>
                <h4 className={css.text}>Гаряча лінія&nbsp;</h4>
                <a href="tel:0800502200" className={css.numberOne}>
                  0 800 502 200
                </a>
                <a href="tel:+380442901683" className={css.numberTwo}>
                  +38 044 290 16 83
                </a>
              </div>
              <ul className={css.socialList}>
                <li>
                  <a href="https://facebook.com" className={css.socialLink}>
                    <TiSocialFacebook />
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com" className={css.socialLink}>
                    <IoLogoInstagram />
                  </a>
                </li>
                <li>
                  <a href="https://www.twitter.com/" className={css.socialLink}>
                    <TfiTwitter />
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com" className={css.socialLink}>
                    <SlSocialLinkedin />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={css.down}>
          <p className={css.rights}>© 2025 PhotoShare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
