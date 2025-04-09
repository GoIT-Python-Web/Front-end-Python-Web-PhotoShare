import css from "../ProfileEditPage/ProfileEditPage.module.css";
import { useRef, useState } from "react";
import ProfileEditForm from "../../components/ProfileEditForm/ProfileEditForm.jsx";
import { FaPenToSquare } from "react-icons/fa6";
import def from "../../assets/images/def.png";

const ProfileEditPage = () => {
  const [avatarSrc, setAvatarSrc] = useState(def);
  const fileInputRef = useRef(null);

  const handleImageError = () => {
    setAvatarSrc(def);
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarSrc(imageUrl);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();
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
        <button className={css.editBtn} onClick={handleEditClick}>
          {/* <svg width="16" height="16">
            <use href="/public/sprite.svg#pen" />
          </svg> */}
          <FaPenToSquare size={22} />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className={css.addAvatarInput}
        />
      </div>
      <hr className={css.divider} />
      <ProfileEditForm />
    </div>
  );
};

export default ProfileEditPage;
