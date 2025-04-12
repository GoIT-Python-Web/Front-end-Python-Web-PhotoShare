import { useSelector } from "react-redux";
import PostsList from "../../posts/postsList/PostsList.jsx";
import css from "./UserGallery.module.css";
import {
  selectIsLoading,
  selectPersonalPosts,
} from "../../../../store/posts/selectors.js";
import Loader from "../../../common/loader/Loader.jsx";

export default function UserGallery({ isMyProfile }) {
  const posts = useSelector(selectPersonalPosts);
  const isLoading = useSelector(selectIsLoading);

  return (
    <div>
      <div className={css.row}>
        <div className={css.titleWrapper}>
          <p className={css.title}>Фото</p>
          {(posts && posts.length) > 0 && (
            <p className={css.length}>{posts.length} завантажених фото</p>
          )}
        </div>
      </div>
      {!isLoading ? (
        <PostsList posts={posts} isMyProfile={isMyProfile} />
      ) : (
        <Loader />
      )}
    </div>
  );
}
