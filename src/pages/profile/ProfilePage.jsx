import { useDispatch, useSelector } from "react-redux";
import BackButton from "../../components/common/backButton/BackButton.jsx";
import Title from "../../components/common/title/Title.jsx";
import UserCard from "../../components/features/userProfile/userCard/UserCard.jsx";
import UserGallery from "../../components/features/userProfile/userGallery/UserGallery.jsx";
import css from "./ProfilePage.module.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchMyPosts } from "../../store/posts/operations.js";
import {
  selectIsAdmin,
  selectIsLoading,
  selectProfile,
  selectUser,
} from "../../store/auth/selectors.js";
import { fetchUserById } from "../../store/auth/operations.js";
import { clearProfile } from "../../store/auth/slice.js";
import Loader from "../../components/common/loader/Loader.jsx";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const isLoading = useSelector(selectIsLoading);

  const profile = useSelector(selectProfile);
  const user = useSelector(selectUser);
  const isAdmin = useSelector(selectIsAdmin);
  const isMyProfile = user.id === profile?.id;

  useEffect(() => {
    return () => {
      dispatch(clearProfile());
    };
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(fetchUserById(id));
    dispatch(fetchMyPosts({ id: id }));
  }, [dispatch, id]);

  return (
    <div className={`container ${css.wrapper}`}>
      {!isLoading ? (
        <>
          <BackButton />
          <div className={css.title}>
            <Title location="userProfile" className={css.title} />
          </div>
          <UserCard
            profile={profile}
            isMyPage={isMyProfile}
            isAdmin={isAdmin}
          />
          <UserGallery isMyProfile={isMyProfile} />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
