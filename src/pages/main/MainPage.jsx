import Title from "../../components/UI/title/Title";
import PostsList from "../../components/posts/postsList/PostsList.jsx";
import css from "./MainPage.module.css";
import Filters from "../../components/filters/filters/Filters.jsx";

export default function MainPage() {
  return (
    <div className={`container  ${css.mainPage}`}>
      <div className={css.headWrapper}>
        <Title location="main" />
        <Filters location="main" />
      </div>
      <PostsList />
    </div>
  );
}
