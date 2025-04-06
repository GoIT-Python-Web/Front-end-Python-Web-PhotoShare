import Title from "../../components/UI/title/Title";
import PostsList from "../../components/posts/postsList/PostsList.jsx";
import css from "./MainPage.module.css";
import Filters from "../../components/filters/filters/Filters.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../../store/posts/operations.js";

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
