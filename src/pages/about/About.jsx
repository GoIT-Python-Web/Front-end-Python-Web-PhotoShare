import css from "./About.module.css";
import { Link } from "react-router-dom";
import deskImg from "../../assets/images/About-img.png";
import tabImg from "../../assets/images/about-img-tab.png";
import img from "../../assets/images/about-img-mob.png";
import logo from "../../assets/icons/favicon.svg";
import { SlEnvolopeLetter } from "react-icons/sl";
import { FiPhoneCall } from "react-icons/fi";
export default function PhotoShare() {
  return (
    <div className="container">
      <div className={css.content}>
        <div className={css.header}>
          <div className={css.logo}>
            <div className={css.logoIcon}>
              <img className={css.logoImg} src={logo} alt="Logo" />
            </div>
            <h1 className={css.logoText}>PhotoShare</h1>
          </div>
          <p className={css.tagline}>Місце, де кожен кадр має значення</p>
          <div className={css.banner2}>
            <p className={css.bannerContent}>
              Ми створюємо простір для творчих людей щоб вони могли ділитися
              своїми моментами та знаходити натхнення
            </p>
          </div>
        </div>
        <div className={css.mainContent}>
          <div className={css.leftSection}>
            <div className={css.banner}>
              <p className={css.bannerContent}>
                Ми створюємо простір для творчих людей щоб вони могли ділитися
                своїми моментами та знаходити натхнення
              </p>
            </div>

            <div className={css.valuesSection}>
              <h2 className={css.valuesTitle}>Наші цінності</h2>
              <ul className={css.valuesList}>
                <li>Відкритість</li>
                <li>Безпека</li>
                <li>Повага До Контенту</li>
                <li>Якісне Збереження Фото</li>
              </ul>
            </div>

            <div className={css.contactsSection}>
              <h2 className={css.contactsTitle}>Контакти</h2>
              <div className={css.contactItem}>
                <span className={css.contactIcon}></span>
                <span>
                  <SlEnvolopeLetter /> Електронна Пошта:
                </span>
                <a
                  href="mailto:support@photoshare.com"
                  className={css.contactLink}
                >
                  support@photoshare.com
                </a>
                <div className={css.contactItem}>
                  <span className={css.contactIcon}></span>
                  <span>
                    <FiPhoneCall /> Телефон:
                  </span>
                  <a className={css.contactLink} href="tel:+380 44 290 16 83">
                    +380 44 290 16 83
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className={css.rightSection}>
            <div className={css.imageContainer}>
              <picture>
                <source media="(min-width: 1440px)" srcSet={deskImg} />

                <source media="(min-width: 768px)" srcSet={tabImg} />

                <source media="(max-width: 767px)" srcSet={img} />

                <img
                  src={img}
                  alt="Happy person making peace signs"
                  className={css.heroImage}
                />
              </picture>
            </div>
          </div>
        </div>

        <Link to="/posts" className={css.btnLink}>
          Повернутися до світлин
        </Link>
      </div>
    </div>
  );
}
