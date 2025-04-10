import styles from "./About.module.css";
import Button from "../../components/common/buttons/Button";

export default function PhotoShare() {
  return (
    <div className={`container`}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <img
                className={styles.logoImg}
                src="/src/assets/icons/favicon.svg"
                alt="Logo"
              />
            </div>
            <h1 className={styles.logoText}>PhotoShare</h1>
          </div>
          <p className={styles.tagline}>Місце, де кожен кадр має значення</p>
          <div className={styles.banner2}>
            <p className={styles.bannerContent}>
              Ми створюємо простір для творчих людей щоб вони могли ділитися
              своїми моментами та знаходити натхнення
            </p>
          </div>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.leftSection}>
            <div className={styles.banner}>
              <p className={styles.bannerContent}>
                Ми створюємо простір для творчих людей щоб вони могли ділитися
                своїми моментами та знаходити натхнення
              </p>
            </div>

            <div className={styles.valuesSection}>
              <h2 className={styles.valuesTitle}>Наші цінності</h2>
              <ul className={styles.valuesList}>
                <li>Відкритість</li>
                <li>Безпека</li>
                <li>Повага До Контенту</li>
                <li>Якісне Збереження Фото</li>
              </ul>
            </div>

            <div className={styles.contactsSection}>
              <h2 className={styles.contactsTitle}>Контакти</h2>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}></span>
                <span>✉ Електронна Пошта:</span>
                <a
                  href="mailto:support@photoshare.com"
                  className={styles.contactLink}
                >
                  support@photoshare.com
                </a>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}></span>
                  <span>📞 Телефон:</span>
                  <a
                    className={styles.contactLink}
                    href="tel:+380 44 290 16 83"
                  >
                    +380 44 290 16 83
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.rightSection}>
            <div className={styles.imageContainer}>
              <picture>
                <source
                  media="(min-width: 1440px)"
                  srcSet="src\assets\images\About-img.png"
                />

                <source
                  media="(min-width: 768px)"
                  srcSet="src\assets\images\about-img-tab.png"
                />

                <source
                  media="(max-width: 767px)"
                  srcSet="src/assets/images/about-img-mob.png"
                />

                <img
                  src="src\assets\images\about-img-mob.png"
                  alt="Happy person making peace signs"
                  className={styles.heroImage}
                />
              </picture>
            </div>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <Button variant="primary" size="xxl">
            Повернутися до світлин
          </Button>
        </div>
      </div>
    </div>
  );
}
