import PostComments from "../../components/features/comments/postComments/PostComments.jsx";
import PostView from "../../components/features/posts/postView/PostView.jsx";
import BackButton from "../../components/common/backButton/BackButton.jsx";
import Title from "../../components/common/title/Title.jsx";
import css from "./ViewPublicationPage.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaPencil } from "react-icons/fa6";
import {
  fetchCommentsToPost,
  fetchPostById,
} from "../../store/posts/operations.js";
import { useEffect, useState } from "react";
import { clearPost } from "../../store/posts/slice.js";
import { selectIsLoading, selectPost } from "../../store/posts/selectors.js";
import Loader from "../../components/common/loader/Loader.jsx";
import { selectUser } from "../../store/auth/selectors.js";

export default function ViewPublicationPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const post = useSelector(selectPost) ?? {};
  const user = useSelector(selectUser);
  const isMyPost = post.user?.id === user?.id;
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (id) {
      window.scrollTo(0, 0);
      dispatch(fetchPostById({ id }));
      dispatch(fetchCommentsToPost({ id }));
    }
    return () => {
      dispatch(clearPost());
    };
  }, [dispatch, id]);

  if (isLoading) return <Loader />;

  return (
    <div className={`container ${css.viewPage}`}>
      <div className={css.titleWrapper}>
        <BackButton loc="view" />
        <div className={css.title}>
          <Title location="viewPublication" />
          {isMyPost && (
            <p className={css.edit} onClick={() => setEditMode(!editMode)}>
              <FaPencil />
              {editMode ? "Скасувати" : "Редагувати світлину"}
            </p>
          )}
        </div>
      </div>
      <div className={css.postWrapper}>
        <PostView
          editMode={editMode}
          setEditMode={setEditMode}
          post={post}
          user={user}
          isMyPost={isMyPost}
        />
        <div className={css.commentsWrapper}>
          <h4 className={css.leaveTitle}>Залишити коментар</h4>
          <PostComments />
        </div>
      </div>
    </div>
  );
}
