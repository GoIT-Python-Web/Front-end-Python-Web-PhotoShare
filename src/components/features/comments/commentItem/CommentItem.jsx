import css from "./CommentItem.module.css";
import { FiTrash2 } from "react-icons/fi";
import formatDateTime from "../../../../helpers/formatDateTime.js";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  deleteCommentAsAdmin,
} from "../../../../store/posts/operations.js";
import defineRole from "../../../../helpers/defineRole.jsx";
import def from "../../../../assets/images/def.png";
import {
  selectIsAdmin,
  selectIsLoggedIn,
  selectUser,
} from "../../../../store/auth/selectors.js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function CommentItem({ comment }) {
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isAdmin = useSelector(selectIsAdmin);
  const couldDelete = isAdmin || user?.id === comment.user?.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    if (isAdmin) {
      dispatch(deleteCommentAsAdmin({ id: comment.id }));
    } else {
      dispatch(deleteComment({ id: comment.id }));
    }
  };

  return (
    <li className={css.wrapper}>
      <div className={css.commentItem}>
        <a
          href={`/profile/${comment.user?.id}`}
          onClick={(e) => {
            e.preventDefault();
            if (!isLoggedIn) {
              toast("Щоб переглянути профіль, вам потрібно увійти.", {
                action: {
                  label: "Увійти",
                  onClick: () => navigate("/login"),
                },
              });
            } else {
              navigate(`/profile/${comment.user?.id}`);
            }
          }}
        >
          <img
            src={comment.user?.img_link ?? def}
            alt={`${comment.user?.name}'s picture`}
            width={54}
            height={54}
            className={css.userPic}
          />
        </a>
        <div className={css.commentWrapper}>
          {couldDelete && (
            <FiTrash2 className={css.trashIcon} onClick={handleDelete} />
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
