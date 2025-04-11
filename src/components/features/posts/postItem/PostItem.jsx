import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { IoIosResize } from "react-icons/io";
import css from "./PostItem.module.css";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";
import Stars from "../../../../helpers/Stars.jsx";
import Button from "../../../common/buttons/Button.jsx";
import formatDateTime from "../../../../helpers/formatDateTime.js";
import def from "../../../../assets/images/def.png";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAdmin } from "../../../../store/auth/selectors.js";
import { deletePost } from "../../../../store/posts/operations.js";
import GoogleMapsLink from "../../../../helpers/generateGoogleMapsUrl.jsx";

export default function PostItem({ post, isMyProfile }) {
  const isAdmin = useSelector(selectIsAdmin);
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery({ minWidth: 1440 });
  const isTablet = useMediaQuery({ minWidth: 768 });
  const navigate = useNavigate();
  const handleDelete = () => {
    if (isAdmin || isMyProfile) dispatch(deletePost({ id: post.id }));
  };
  console.log(post);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className={css.li}>
      <div className={css.imageWrapper}>
        <img
          src={post.image_url}
          alt="Post's picture"
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
        <Link to={`/profile/${post.user?.id}`} className={css.credLink}>
          <img
            src={post.user?.img_link ?? def}
            alt={`${post.user?.name}'s profile picture`}
            width={50}
            height={50}
          />
          <p>{post.user?.name}</p>
        </Link>
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
            {post.rating} ({post.rating_count} оцінок)
          </p>
        </div>
        <div className={css.dateDiv}>
          <p className={css.published}>Опубліковано</p>
          <p className={css.createdAt}>{formatDateTime(post.created_at)}</p>
        </div>
      </div>

      {!isAdmin && !isMyProfile ? (
        <Button
          size={isDesktop ? "xxl" : isTablet ? "xl" : "lg"}
          onClick={() => {
            navigate(`/posts/${post.id}`);
          }}
        >
          Детальніше
        </Button>
      ) : isAdmin ? (
        <div className={css.buttonsWrapper}>
          <Button
            size={isDesktop ? "sm" : "xs"}
            onClick={() => {
              navigate(`/posts/${post.id}`);
            }}
          >
            {isMyProfile ? "Редагувати" : "Детальніше"}
          </Button>
          <Button
            size={isDesktop ? "sm" : "xs"}
            variant="secondary-red"
            onClick={handleDelete}
          >
            Видалити
          </Button>
        </div>
      ) : null}
    </li>
  );
}
