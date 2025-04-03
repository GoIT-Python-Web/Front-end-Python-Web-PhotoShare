import css from "./Footer.module.css";
import { TiSocialFacebook } from "react-icons/ti";
import { IoLogoInstagram } from "react-icons/io5";
import { TfiTwitter } from "react-icons/tfi";
import { SlSocialLinkedin } from "react-icons/sl";
import Container from "../container/Container.jsx";

const Footer = () => {
  return (
    <footer className={css.footer}>
      <Container>
        <div className={css.up}>
          <a href="/" className={css.footerLogo}>
            <img src="/favicon.svg" alt="Logo" />
            <span className={css.footerLogoText}>PhotoShare</span>
          </a>

          <div className={css.wrap}>
            <div className={css.wrapLinks}>
              <nav className={css.links}>
                <a href="/gallery" className={css.link}>
                  Галерея
                </a>
                <a href="/search" className={css.link}>
                  Пошук
                </a>
                <a href="/settings" className={css.link}>
                  Налаштування
                </a>
              </nav>
              <div className={css.links}>
                <a href="/profile" className={css.link}>
                  Мій профіль
                </a>
                <a href="/photos" className={css.link}>
                  Мої світлини
                </a>
                <a href="/comments" className={css.link}>
                  Коментарі
                </a>
                <a href="/ratings" className={css.link}>
                  Оцінки або рейтинг
                </a>
              </div>
              <div className={css.links}>
                <a href="/about" className={css.link}>
                  Про нас
                </a>
                <a href="/contacts" className={css.link}>
                  Контакти
                </a>
              </div>
            </div>

            <div className={css.contacts}>
              <h4 className={css.text}>Гаряча лінія</h4>
              <a href="tel:0800502200" className={css.number}>
                0 800 502 200
              </a>
              <a href="tel:+380442901683" className={css.number}>
                +38 044 290 16 83
              </a>
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
          <div className={css.wrapPrivacy}>
            <a href="/privacy-policy" className={css.privacy}>
              Політика конфіденційності
            </a>
            <span className="text-gray-400">&nbsp;|&nbsp;</span>
            <a href="/terms-of-use" className={css.privacy}>
              Умови використання
            </a>
          </div>
          <hr className={css.line} />
          <p className={css.rights}>© 2025 PhotoShare. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
