import { useSelector } from "react-redux";
import ProfileEditForm from "../../components/forms/ProfileEditForm/ProfileEditForm.jsx";
import { selectUser } from "../../store/auth/selectors.js";

const ProfileEditPage = () => {
  const user = useSelector(selectUser);
  return (
    <div className="container">
      <ProfileEditForm user={user} />
    </div>
  );
};

export default ProfileEditPage;
