import React from "react";
import json from "../../../pages/main/posts.json";
import PostItem from "../postItem/PostItem.jsx";
import css from "./PostList.module.css";

export default function PostsList() {
  const posts = json;
  return (
    <div>
      <ul className={css.list}>
        {posts.map((post, i) => (
          <PostItem key={i} post={post} />
        ))}
      </ul>
    </div>
  );
}
