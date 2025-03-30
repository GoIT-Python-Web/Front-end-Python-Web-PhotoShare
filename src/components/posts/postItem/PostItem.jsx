import Stars from "../../../helpers/Stars.jsx";
import css from "./PostItem.module.css";
import Button from "../../UI/buttons/Button.jsx";
import { useMediaQuery } from "react-responsive";

export default function PostItem({ post }) {
  const isDesktop = useMediaQuery({ minWidth: 1440 });
  const isTablet = useMediaQuery({ minWidth: 768 });
  return (
    <li className={css.li}>
      <img
        src={post.post_pic}
        alt="Post's picture"
        width={328}
        height={328}
        className={css.postPic}
      />
      <div className={css.credentials}>
        <img
          src={post.photo}
          alt={`${post.user_name}'s profile picture`}
          width={70}
          height={70}
        />
        <p>{post.user_name}</p>
      </div>
      <div className={css.postCredentials}>
        <p className={css.title}>{post.title}</p>
        <p className={css.tags}>{post.tags.join(" ")}</p>
        <div className={css.ratingDiv}>
          <Stars rating={post.rating} />
          <p className={css.rating}>
            {post.rating}({post.rating_length} оцінок)
          </p>
        </div>
        <div className={css.dateDiv}>
          <p className={css.published}>Опубліковано</p>
          <p className={css.createdAt}>{post.createdAt}</p>
        </div>
      </div>
      <Button size={isDesktop ? "xxl" : isTablet ? "xl" : "lg"}>
        Детальніше
      </Button>
    </li>
  );
}
