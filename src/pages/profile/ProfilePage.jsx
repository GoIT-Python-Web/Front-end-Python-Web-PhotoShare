import Header from "../../components/Header/Header.jsx";
import BackButton from "../../components/UI/backButton/BackButton.jsx";
import Title from "../../components/UI/title/Title.jsx";
import UserCard from "../../components/userProfile/userCard/UserCard.jsx";
import UserGallery from "../../components/userProfile/userGallery/UserGallery.jsx";
import css from "./ProfilePage.module.css";

export default function ProfilePage() {
  const isMyPage = true;
  const isAdmin = false;

  return (
    <div className={`container ${css.wrapper}`}>
      <BackButton />
      <div className={css.title}>
        <Title location="userProfile" className={css.title} />
      </div>
      <UserCard isMyPage={isMyPage} isAdmin={isAdmin} />
      <UserGallery />
    </div>
  );
}
