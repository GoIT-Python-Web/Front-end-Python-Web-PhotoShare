import CommentsList from "../../../features/comments/commentsList/CommentsList.jsx";
import comments from "./comments.json";
import css from "./PostComments.module.css";
import { PiPaperPlaneTiltBold } from "react-icons/pi";

export default function PostComments() {
  return (
    <div className={css.commentsWrapper}>
      <div className={css.textareaWrapper}>
        <textarea className={css.textarea} rows={3} />
        <PiPaperPlaneTiltBold className={css.send} />
      </div>
      <CommentsList comments={comments} />
    </div>
  );
}
