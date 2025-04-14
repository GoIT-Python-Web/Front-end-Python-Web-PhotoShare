import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { IoIosResize } from "react-icons/io";
import css from "./PostItem.module.css";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import Stars from "../../../../helpers/Stars.jsx";
import Button from "../../../common/buttons/Button.jsx";
import formatDateTime from "../../../../helpers/formatDateTime.js";
import def from "../../../../assets/images/def.png";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsAdmin,
  selectIsLoggedIn,
} from "../../../../store/auth/selectors.js";
import { deletePost } from "../../../../store/posts/operations.js";
import GoogleMapsLink from "../../../../helpers/generateGoogleMapsUrl.jsx";
import formatRating from "../../../../helpers/formatRating.js";
import { toast } from "sonner";

export default function PostItem({ post, isMyProfile }) {
  const isAdmin = useSelector(selectIsAdmin);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isDesktop = useMediaQuery({ minWidth: 1440 });
  const isTablet = useMediaQuery({ minWidth: 768 });
  const navigate = useNavigate();
  const handleDelete = () => {
    if (isAdmin || isMyProfile) dispatch(deletePost({ id: post.id }));
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className={css.imageWrapper}>
        <img
          src={post.image_url}
          alt={`${post.user?.name}'s post picture`}
          className={css.postPic}
        />
        <button className={css.viewButton} onClick={() => setIsOpen(true)}>
          <IoIosResize className={css.resize} />
        </button>
      </div>

      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={[{ src: post.image_url }]}
          carousel={{ finite: true, preload: 1 }}
        />
      )}

      <div className={css.credentials}>
        <a
          className={css.credLink}
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
            alt={`${post.user?.name}'s profile picture`}
            width={50}
            height={50}
          />
          <p>{post.user?.name}</p>
        </a>
        {post?.location && (
          <p className={css.location}>
            {post.location && <GoogleMapsLink location={post.location} />}
          </p>
        )}
      </div>
      <div className={css.postCredentials}>
        <p className={css.title}>{post.title}</p>
        {post.tags && (
          <p className={css.tags}>
            {post.tags.map((tag) => "#" + tag.name).join(" ")}
          </p>
        )}
        <div className={css.ratingDiv}>
          <Stars rating={post.avg_rating} />
          <p className={css.rating}>
            {post.rating} ({post.rating_count} {formatRating(post.rating_count)}
            )
          </p>
        </div>
        <div className={css.dateDiv}>
          <p className={css.published}>Опубліковано</p>
          <p className={css.createdAt}>{formatDateTime(post.created_at)}</p>
        </div>
      </div>

      {isMyProfile || isAdmin ? (
        <div className={css.buttonsWrapper}>
          <Button
            size={isDesktop ? "sm" : "xs"}
            onClick={() => navigate(`/posts/${post.id}`)}
          >
            Детальніше
          </Button>
          <Button
            size={isDesktop ? "sm" : "xs"}
            variant="secondary-red"
            onClick={handleDelete}
          >
            Видалити
          </Button>
        </div>
      ) : (
        <Button
          size={isDesktop ? "xxl" : isTablet ? "xl" : "lg"}
          onClick={() => navigate(`/posts/${post.id}`)}
        >
          Детальніше
        </Button>
      )}
    </>
  );
}
