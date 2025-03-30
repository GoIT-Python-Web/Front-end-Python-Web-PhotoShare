import React from "react";
import Title from "../../components/UI/title/Title";
import PostsList from "../../components/posts/postsList/PostsList.jsx";

export default function MainPage() {
  return (
    <div className="container">
      <Title location="main" />
      <PostsList />
    </div>
  );
}
