import Title from "../../components/common/title/Title.jsx";
import css from "./MainPage.module.css";
import Filters from "../../components/features/filters/filters/Filters.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../store/posts/operations.js";
import PostsList from "../../components/features/posts/postsList/PostsList.jsx";
import { selectIsLoading, selectPosts } from "../../store/posts/selectors.js";
import Loader from "../../components/common/loader/Loader.jsx";
import { useMediaQuery } from "react-responsive";

export default function MainPage() {
  const dispatch = useDispatch();
  const isTablet = useMediaQuery({ minWidth: "768px" });
  const isMobile = useMediaQuery({ maxWidth: "767px" });

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const posts = useSelector(selectPosts);
  const isLoading = useSelector(selectIsLoading);

  return (
    <div className={`container  ${css.mainPage}`}>
      <div className={css.headWrapper}>
        <Title location="main" />
        {isMobile && <Filters location="main" />}
        {}
      </div>
      {!isLoading ? (
        <>
          {isTablet && <Filters location="main" />}
          <PostsList posts={posts} />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
