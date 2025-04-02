import Title from "../../components/UI/title/Title";
import PostsList from "../../components/posts/postsList/PostsList.jsx";
import css from "./MainPage.module.css";
import Filters from "../../components/filters/filters/Filters.jsx";
import BackButton from "../../components/UI/backButton/BackButton.jsx";

export default function MainPage() {
  return (
    <div className="container">
      <div className={css.headWrapper}>
        <Title location="main" />
        <Filters location="main" />
      </div>
      <PostsList />
    </div>
  );
}
