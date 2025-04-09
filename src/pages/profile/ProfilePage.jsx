import { useDispatch, useSelector } from "react-redux";
import BackButton from "../../components/common/backButton/BackButton.jsx";
import Title from "../../components/common/title/Title.jsx";
import UserCard from "../../components/features/userProfile/userCard/UserCard.jsx";
import UserGallery from "../../components/features/userProfile/userGallery/UserGallery.jsx";
import css from "./ProfilePage.module.css";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchMyPosts } from "../../store/posts/operations.js";
import { selectUser } from "../../store/auth/selectors.js";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector(selectUser);
  let isAdmin;
  let isMyProfile;
  if (user) {
    isMyProfile = id === user.id;
    isAdmin = user.role === "admin";
  }

  useEffect(() => {
    dispatch(fetchMyPosts({ id: user?.id }));
  }, [dispatch, id]);

  return (
    <div className={`container ${css.wrapper}`}>
      <BackButton />
      <div className={css.title}>
        <Title location="userProfile" className={css.title} />
      </div>
      <UserCard isMyPage={isMyProfile} isAdmin={isAdmin} />
      <UserGallery />
    </div>
  );
}
