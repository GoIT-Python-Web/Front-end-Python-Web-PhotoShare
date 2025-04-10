import { useSelector } from "react-redux";
import Stars from "../../../../helpers/Stars.jsx";
import css from "./PostView.module.css";
import { selectPost } from "../../../../store/posts/selectors.js";
import def from "../../../../assets/images/def.png";

export default function PostView() {
  const post = useSelector(selectPost) ?? {};

  return (
    <div>
      <img
        src={post.image_url}
        alt={`${post.user_name}'s post picture`}
        width={328}
        height={300}
        className={css.image}
      />
      <div className={css.credentials}>
        {post.user && (
          <>
            <div className={css.userInfo}>
              <img
                src={post.user?.img_link ?? def}
                alt={`${post.user?.name ?? "User"}'s profile picture`}
                width={38}
                height={38}
                className={css.userPhoto}
              />
              <p>{post.user?.name}</p>

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
          </>
        )}

        <div className={css.tabletDiv}>
          <p className={css.title}>{post.title}</p>
          <div className={css.rating}>
            <>
              <Stars rating={post.avg_rating} id={post.id} />
            </>
            <p className={css.ratingText}>
              {post.rating} ({post.rating_count} оцінок)
            </p>
          </div>
        </div>
        <p className={css.description}>{post.description}</p>
        {post.tags && (
          <div className={css.tags}>
            {post.tags.map((tag, index) => (
              <span key={index} className={css.tag}>
                #{tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
