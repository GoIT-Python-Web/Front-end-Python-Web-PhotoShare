import { useSelector } from "react-redux";
import PostsList from "../../posts/postsList/PostsList.jsx";
import css from "./UserGallery.module.css";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { selectPersonalPosts } from "../../../../store/posts/selectors.js";

export default function UserGallery() {
  const posts = useSelector(selectPersonalPosts);

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
      <PostsList posts={posts} />
    </div>
  );
}
