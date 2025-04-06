import React from "react";
// import json from "../../../pages/main/posts.json";
import PostItem from "../postItem/PostItem.jsx";
import css from "./PostList.module.css";
import Button from "../../UI/buttons/Button.jsx";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import { selectPosts } from "../../../store/posts/selectors.js";

export default function PostsList() {
  const isTablet = useMediaQuery({ minWidth: "768px" });
  const isDesktop = useMediaQuery({ minWidth: "1440px" });
  const posts = useSelector(selectPosts);
  return (
    <div>
      <ul className={css.list}>
        {posts.map((post, i) => (
          <PostItem key={i} post={post} />
        ))}
      </ul>
      <div className={css.buttons}>
        <Button
          withArrow
          variant="secondary"
          size={isDesktop ? "md" : isTablet ? "xl" : "xs"}
          arrowPosition="left"
        >
          Назад
        </Button>
        <Button
          withArrow
          size={isDesktop ? "md" : isTablet ? "xl" : "xs"}
          arrowPosition="right"
        >
          Далі
        </Button>
      </div>
    </div>
  );
}
