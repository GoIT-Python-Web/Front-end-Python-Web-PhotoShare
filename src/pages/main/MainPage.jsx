import Title from "../../components/common/title/Title.jsx";
import css from "./MainPage.module.css";
import Filters from "../../components/features/filters/filters/Filters.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../store/posts/operations.js";
import PostsList from "../../components/features/posts/postsList/PostsList.jsx";
import { selectIsLoading, selectPosts } from "../../store/posts/selectors.js";
import Loader from "../../components/common/loader/Loader.jsx";

export default function MainPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const posts = useSelector(selectPosts);
  const isLoading = useSelector(selectIsLoading);

  return (
    <div className={`container  ${css.mainPage}`}>
      <div className={css.headWrapper}>
        <Title location="main" />
        <Filters location="main" />
      </div>
      {!isLoading ? <PostsList posts={posts} /> : <Loader />}
    </div>
  );
}
