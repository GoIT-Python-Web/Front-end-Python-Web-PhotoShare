import PostComments from "../../components/posts/postComments/PostComments.jsx";
import PostView from "../../components/posts/postView/PostView.jsx";
import BackButton from "../../components/UI/backButton/BackButton.jsx";
import Title from "../../components/UI/title/Title.jsx";
import css from "./ViewPublicationPage.module.css";

export default function ViewPublicationPage() {
  return (
    <div className={`container ${css.viewPage}`}>
      <BackButton />
      <div className={css.title}>
        <Title location="viewPublication" />
      </div>
      <PostView />
      <div className={css.commentsWrapper}>
        <Title location="leaveAComment" />
        <PostComments />
      </div>
    </div>
  );
}
