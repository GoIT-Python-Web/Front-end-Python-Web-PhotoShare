import CommentItem from "../commentItem/CommentItem.jsx";
import css from "./CommentsList.module.css";

export default function CommentsList({ comments }) {
  return (
    <div>
      {comments && comments.length > 0 ? (
        <ul className={css.list}>
          {comments.map((comment, i) => (
            <CommentItem key={i} comment={comment} />
          ))}
        </ul>
      ) : (
        <p className={css.paragraph}>
          Ще не було додано жодного коментарю. Будьте першим!
        </p>
      )}
    </div>
  );
}
