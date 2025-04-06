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
        <div className={css.userInfo}>
          <img
            src={post.photo}
            alt={`${post.user_name}'s profile picture`}
            width={38}
            height={38}
            className={css.userPhoto}
          />
          <p>{post.user_name}</p>
          {post.location && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                post.location
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={css.location}
            >
              {post.location}
            </a>
          )}
        </div>
        <div className={css.tabletDiv}>
          <p className={css.title}>{post.title}</p>
          <div className={css.rating}>
            <p>
              <Stars rating={post.rating} />
            </p>
            <p className={css.ratingText}>
              {post.rating} ({post.rating_length} оцінок)
            </p>
          </div>
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
