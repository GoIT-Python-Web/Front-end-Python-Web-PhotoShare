import css from "./CommentItem.module.css";
import { FiTrash2 } from "react-icons/fi";
import formatDateTime from "../../../../helpers/formatDateTime.js";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../../../store/posts/operations.js";
import defineRole from "../../../../helpers/defineRole.jsx";
import def from "../../../../assets/images/def.png";
import { selectIsAdmin, selectUser } from "../../../../store/auth/selectors.js";
import { Link } from "react-router-dom";

export default function CommentItem({ comment }) {
  const user = useSelector(selectUser);
  const isAdmin = useSelector(selectIsAdmin);
  const couldDelete = isAdmin || user?.id === comment.user?.id;
  const dispatch = useDispatch();
  return (
    <li className={css.wrapper}>
      <div className={css.commentItem}>
        <Link to={`/profile/${comment.user?.id}`}>
          <img
            src={comment.user?.img_link ?? def}
            alt={`${comment.user?.name}'s picture`}
            width={54}
            height={54}
            className={css.userPic}
          />
        </Link>
        <div className={css.commentWrapper}>
          {couldDelete && (
            <FiTrash2
              className={css.trashIcon}
              onClick={() => dispatch(deleteComment({ id: comment.id }))}
            />
          )}
          <div className={css.nameWrapper}>
            <Link to={`/profile/${comment.user?.id}`}>
              <p className={css.name}>{comment.user?.name}</p>
            </Link>
            {defineRole(comment.user?.type)}
          </div>
          <div className={css.timeWrapper}>
            <p>час створення</p>
            <p>{formatDateTime(comment.created_at)}</p>
          </div>
        </div>
      </div>
      <p className={css.description}>{comment.message}</p>
    </li>
  );
}
