import BackButton from "../../components/UI/backButton/BackButton";
import Title from "../../components/UI/title/Title";
import UsersContainer from "../../components/usersManagement/usersContainer/UsersContainer";
import s from "./UsersManagement.module.css";

export default function UsersManagementPage() {
  return (
    <div className={`container ${s.usersWrapper}`}>
      <BackButton />
      <div className={s.title}>
        <Title location="admin" />
      </div>
      <UsersContainer />
    </div>
  );
}
