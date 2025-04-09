import { useState } from "react";
import PostItem from "../postItem/PostItem.jsx";
import css from "./PostList.module.css";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import Button from "../../../common/buttons/Button.jsx";
import { selectPosts } from "../../../../store/posts/selectors.js";

export default function PostsList() {
  const isTablet = useMediaQuery({ minWidth: "768px" });
  const isDesktop = useMediaQuery({ minWidth: "1440px" });
  const posts = useSelector(selectPosts);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div>
      <ul className={css.list}>
        {currentPosts.map((post, i) => (
          <PostItem key={i} post={post} />
        ))}
      </ul>

      <div className={css.buttons}>
        <Button
          withArrow
          variant="secondary"
          size={isDesktop ? "md" : isTablet ? "xl" : "xs"}
          arrowPosition="left"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Назад
        </Button>

        <Button
          withArrow
          size={isDesktop ? "md" : isTablet ? "xl" : "xs"}
          arrowPosition="right"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Далі
        </Button>
      </div>
    </div>
  );
}
