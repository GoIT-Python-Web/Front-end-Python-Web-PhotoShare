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
        <div className={css.buttons}>
          <div className={css.button}>
            <GoArrowLeft className={css.icon} />
          </div>
          <div className={css.divider}></div>
          <div className={css.button}>
            <GoArrowRight className={css.icon} />
          </div>
        </div>
      </div>
      <PostsList />
    </div>
  );
}
