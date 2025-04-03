import Title from "../../components/UI/title/Title";
import UsersContainer from "../../components/UserList/UsersContainer";
import styles from "./UsersManagement.module.css";

export default function UsersManagementPage() {
  return (
    <div className={styles.usersPage}>
      <Title location="admin" />
      <UsersContainer />
    </div>
  );
}
