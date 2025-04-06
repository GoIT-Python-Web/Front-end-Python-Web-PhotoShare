import CommentItem from "../commentItem/CommentItem.jsx";
import css from "./CommentsList.module.css";

export default function CommentsList({ comments }) {
  return (
    <div>
      <ul className={css.list}>
        {comments.map((comment, i) => (
          <CommentItem key={i} comment={comment} />
        ))}
      </ul>
    </div>
  );
}
