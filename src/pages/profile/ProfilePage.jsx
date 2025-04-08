import { useSelector } from "react-redux";
import BackButton from "../../components/common/backButton/BackButton.jsx";
import Title from "../../components/common/title/Title.jsx";
import UserCard from "../../components/features/userProfile/userCard/UserCard.jsx";
import UserGallery from "../../components/features/userProfile/userGallery/UserGallery.jsx";
import css from "./ProfilePage.module.css";
import { selectUser } from "../../store/auth/selectors.js";

export default function ProfilePage() {
  const user = useSelector(selectUser);
  const isMyPage = true;
  const isAdmin = user.role === "admin";
  console.log(isAdmin);
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
