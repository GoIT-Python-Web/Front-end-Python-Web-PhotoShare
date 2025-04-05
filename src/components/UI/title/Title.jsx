import s from "./Title.module.css";

export default function Title({ location }) {
  const titles = {
    main: "Відкривайте, діліться та надихайте кожним знімком",
    editScreen: "Завантаження та редагування фото",
    leaveAComment: "Залишити коментар",
    viewPublication: "Перегляд публікації",
    userProfile: "Профіль Користувача",
    admin: "Управління користувачами",
  };

  return <h1 className={s.h1}>{titles[location] || "Wrong props"}</h1>;
}
