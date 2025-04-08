import { useSelector, useDispatch } from "react-redux";
import CommentsList from "../../../features/comments/commentsList/CommentsList.jsx";
import css from "./PostComments.module.css";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import {
  selectComments,
  selectPost,
} from "../../../../store/posts/selectors.js";
import { useState } from "react";
import { sendComment } from "../../../../store/posts/operations.js";

export default function PostComments() {
  const dispatch = useDispatch();
  const post = useSelector(selectPost);
  const comments = useSelector(selectComments);

  const [commentText, setCommentText] = useState("");

  const handleChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleSubmit = () => {
    if (commentText.trim()) {
      dispatch(sendComment({ id: post.id, message: commentText }));
      setCommentText("");
    }
  };

  return (
    <div className={css.commentsWrapper}>
      <div className={css.textareaWrapper}>
        <textarea
          className={css.textarea}
          rows={3}
          value={commentText}
          onChange={handleChange}
        />
        <PiPaperPlaneTiltBold className={css.send} onClick={handleSubmit} />
      </div>
      <CommentsList comments={comments} />
    </div>
  );
}
