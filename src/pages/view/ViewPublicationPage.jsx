import PostComments from "../../components/features/comments/postComments/PostComments.jsx";
import PostView from "../../components/features/posts/postView/PostView.jsx";
import BackButton from "../../components/common/backButton/BackButton.jsx";
import Title from "../../components/common/title/Title.jsx";
import css from "./ViewPublicationPage.module.css";

export default function ViewPublicationPage() {
  return (
    <div className={`container ${css.viewPage}`}>
      <div className={css.titleWrapper}>
        <BackButton loc="view" />
        <div className={css.title}>
          <Title location="viewPublication" />
        </div>
      </div>
      <div className={css.postWrapper}>
        <PostView />
        <div className={css.commentsWrapper}>
          <h4 className={css.leaveTitle}>Залишити коментар</h4>
          <PostComments />
        </div>
      </div>
    </div>
  );
}
