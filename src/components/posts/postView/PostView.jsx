import Stars from "../../../helpers/Stars.jsx";
import post from "./post.json";
import css from "./PostView.module.css";

export default function PostView() {
  return (
    <div>
      <img
        src={post.post_pic}
        alt={`${post.user_name}'s post picture`}
        width={328}
        height={300}
        className={css.image}
      />
      <div className={css.credentials}>
        <p className={css.title}>{post.title}</p>
        <div className={css.rating}>
          <p>
            <Stars rating={post.rating} />
          </p>
          <p className={css.ratingText}>
            {post.rating} ({post.rating_length} оцінок)
          </p>
        </div>
        <p className={css.description}>{post.description}</p>
        <div className={css.tags}>
          {post.tags.map((tag) => (
            <span key={tag} className={css.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
