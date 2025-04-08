import styles from "./About.module.css";
import Button from "../../components/common/buttons/Button";

export default function PhotoShare() {
  return (
    <div className={`container`}>
      <div className={styles.content}>
        <header className={styles.header}>
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
        </header>

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
                  <span>📞 Телефон: +380 44 290 16 83</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.rightSection}>
            <div className={styles.imageContainer}>
              <img
                src="src\assets\images\About-img.png"
                alt="Happy person making peace signs"
                className={styles.heroImage}
              />
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
