import css from "./CommentItem.module.css";
import { FiTrash2 } from "react-icons/fi";
import { MdOutlineStars } from "react-icons/md";

export default function CommentItem({ comment }) {
  return (
    <li className={css.wrapper}>
      <div className={css.commentItem}>
        <img
          src={comment.userPic}
          alt={`${comment.userName}'s picture`}
          width={54}
          height={54}
          className={css.userPic}
        />
        <div className={css.commentWrapper}>
          <FiTrash2 className={css.trashIcon} />
          <div className={css.nameWrapper}>
            <p className={css.name}>{comment.userName}</p>
            <MdOutlineStars className={css.role} />
          </div>
          <div className={css.timeWrapper}>
            <p>час створення</p>
            <p>Вчора о {comment.createdAt}</p>
          </div>
        </div>
      </div>
      <p className={css.description}>{comment.description}</p>
    </li>
  );
}
