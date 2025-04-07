import BackButton from "../../components/common/backButton/BackButton.jsx";
import Title from "../../components/common/title/Title.jsx";
import UserCard from "../../components/features/userProfile/userCard/UserCard.jsx";
import UserGallery from "../../components/features/userProfile/userGallery/UserGallery.jsx";
import css from "./ProfilePage.module.css";

export default function ProfilePage() {
  const isMyPage = true;
  const isAdmin = true;

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
