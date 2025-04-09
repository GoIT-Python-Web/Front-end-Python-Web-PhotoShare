import PostsList from "../../posts/postsList/PostsList.jsx";
import css from "./UserGallery.module.css";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

export default function UserGallery() {
  return (
    <div>
      <div className={css.row}>
        <div className={css.titleWrapper}>
          <p className={css.title}>Фото</p>
          <p className={css.length}>
            {/* {user.collection.length} завантажених фото */}
          </p>
        </div>
      </div>
      <PostsList />
    </div>
  );
}
