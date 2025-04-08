import css from "./CommentItem.module.css";
import { FiTrash2 } from "react-icons/fi";
import { MdOutlineStars } from "react-icons/md";
import formatDateTime from "../../../../helpers/formatDateTime.js";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../../../store/posts/operations.js";

export default function CommentItem({ comment }) {
  const dispatch = useDispatch();
  return (
    <li className={css.wrapper}>
      <div className={css.commentItem}>
        {/* <img
          src={comment.userPic}
          alt={`${comment.userName}'s picture`}
          width={54}
          height={54}
          className={css.userPic}
        /> */}
        <div className={css.commentWrapper}>
          <FiTrash2
            className={css.trashIcon}
            onClick={() => dispatch(deleteComment({ id: comment.id }))}
          />
          <div className={css.nameWrapper}>
            {/* <p className={css.name}>{comment.userName}</p> */}
            <p className={css.name}>Тут буде імʼя</p>
            <MdOutlineStars className={css.role} />
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
