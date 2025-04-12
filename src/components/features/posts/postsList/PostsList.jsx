import { useState } from "react";
import PostItem from "../postItem/PostItem.jsx";
import css from "./PostList.module.css";
import { useMediaQuery } from "react-responsive";
import Button from "../../../common/buttons/Button.jsx";

export default function PostsList({ posts, isMyProfile }) {
  const isTablet = useMediaQuery({ minWidth: "768px" });
  const isDesktop = useMediaQuery({ minWidth: "1440px" });

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo(50, 50);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo(50, 50);
    }
  };

  return (
    <div>
      {posts && posts.length > 0 ? (
        <>
          <ul className={css.list}>
            {currentPosts.map((post, i) => (
              <li key={i} className={css.li}>
                <PostItem post={post} isMyProfile={isMyProfile} />
              </li>
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
        </>
      ) : (
        <div className={css.no}>
          <p>Наразі немає постів. Cпробуйте знову!</p>
        </div>
      )}
    </div>
  );
}
