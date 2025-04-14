import { useSelector } from "react-redux";
import Stars from "../../../../helpers/Stars.jsx";
import css from "./PostView.module.css";
import { selectPost } from "../../../../store/posts/selectors.js";
import def from "../../../../assets/images/def.png";
import GoogleMapsLink from "../../../../helpers/generateGoogleMapsUrl.jsx";
import { useNavigate } from "react-router-dom";
import formatRating from "../../../../helpers/formatRating.js";
import { toast } from "sonner";
import { selectIsLoggedIn } from "../../../../store/auth/selectors.js";
import { useEffect, useState } from "react";

export default function PostView() {
  const post = useSelector(selectPost) ?? {};
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  const [avgRating, setAvgRating] = useState(post.avg_rating ?? 0);
  const [ratingCount, setRatingCount] = useState(post.rating_count ?? 0);
  useEffect(() => {
    setAvgRating(post.avg_rating);
    setRatingCount(post.rating_count);
  }, [post]);

  const handleRated = (newRating) => {
    const total = avgRating * ratingCount;
    const newCount = ratingCount + 1;
    const updatedAvg = (total + newRating) / newCount;

    setRatingCount(newCount);
    setAvgRating(updatedAvg);
  };

  return (
    <div>
      <img
        src={post.image_url}
        alt={`${post.user?.name}'s post picture`}
        width={328}
        height={300}
        className={css.image}
      />
      <div className={css.credentials}>
        {post.user && (
          <>
            <div className={css.userInfo}>
              <a
                className={css.link}
                href={`/profile/${post.user?.id}`}
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
                    navigate(`/profile/${post.user?.id}`);
                  }
                }}
              >
                <img
                  src={post.user?.img_link ?? def}
                  alt={`${post.user?.name ?? "User"}'s profile picture`}
                  width={38}
                  height={38}
                  className={css.userPhoto}
                />
                <p>{post.user?.name}</p>
              </a>
              <p className={css.location}>
                {post.location && <GoogleMapsLink location={post.location} />}
              </p>
            </div>
          </>
        )}

        <div className={css.tabletDiv}>
          <p className={css.title}>{post.title}</p>
          <div className={css.rating}>
            <>
              <Stars
                rating={avgRating}
                id={post.id}
                post={true}
                onRated={handleRated}
              />
            </>
            <p className={css.ratingText}>
              {avgRating?.toFixed(1)} ({ratingCount} {formatRating(ratingCount)}
              )
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
