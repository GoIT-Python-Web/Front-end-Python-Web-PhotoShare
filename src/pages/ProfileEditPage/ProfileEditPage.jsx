import css from "../ProfileEditPage/ProfileEditPage.module.css";
import { useState } from "react";
import ProfileEditForm from "../../components/ProfileEditForm/ProfileEditForm.jsx";
import { FaPenToSquare } from "react-icons/fa6";

const ProfileEditPage = () => {
  const defaultAvatar = "/src/assets/images/EditProfilPage/AvatarDef.png";
  const userAvatar = "/src/assets/images/EditProfilPage/AvatarGirl.jpg";

  const [avatarSrc, setAvatarSrc] = useState(userAvatar);

  const handleImageError = () => {
    setAvatarSrc(defaultAvatar);
  };

  return (
    <div className="container">
      <div className={css.avatarWrap}>
        <img
          className={css.avatarImg}
          src={avatarSrc}
          alt="Аватар"
          onError={handleImageError}
        />
        <button className={css.editBtn}>
          {/* <svg width="16" height="16">
            <use href="/public/sprite.svg#pen" />
          </svg> */}
          <FaPenToSquare size={22} color=""/>
        </button>
      </div>
      <hr className={css.divider} />
      <ProfileEditForm />
    </div>
  );
};

export default ProfileEditPage;
