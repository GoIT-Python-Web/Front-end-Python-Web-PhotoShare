import Title from "../../components/common/title/Title.jsx";
import css from "./MainPage.module.css";
import Filters from "../../components/features/filters/filters/Filters.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../../store/posts/operations.js";
import PostsList from "../../components/features/posts/postsList/PostsList.jsx";

export default function MainPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

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
