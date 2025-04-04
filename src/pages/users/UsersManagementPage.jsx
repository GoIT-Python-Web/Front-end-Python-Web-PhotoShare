import Container from "../../components/container/Container";
import BackButton from "../../components/UI/backButton/BackButton";
import Title from "../../components/UI/title/Title";
import UsersContainer from "../../components/usersManagement/usersContainer/UsersContainer";
import s from "./UsersManagement.module.css";

export default function UsersManagementPage() {
  return (
    <Container className={s.wrapper}>
      <BackButton />
      <Title location="admin" className="title" />
      <UsersContainer />
    </Container>
  );
}
