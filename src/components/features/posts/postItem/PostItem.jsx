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
import { useSelector } from "react-redux";
import { selectIsAdmin } from "../../../../store/auth/selectors.js";

export default function PostItem({ post }) {
  const isAdmin = useSelector(selectIsAdmin);
  const isMyProfile = false;
  const isDesktop = useMediaQuery({ minWidth: 1440 });
  const isTablet = useMediaQuery({ minWidth: 768 });
  const navigate = useNavigate();

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
        <Link to={`/profile/${post.user?.id}`}>
          <img
            src={post.user?.image_url ?? def}
            alt={`${post.user?.name}'s profile picture`}
            width={50}
            height={50}
          />
          <p>{post.user?.name}</p>
        </Link>
      </div>
      <div className={css.postCredentials}>
        <p className={css.title}>{post.title}</p>
        {/* <p className={css.tags}>{post.tags.join(" ")}</p> */}
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
            navigate(`/profile/${post.user.id}`);
          }}
        >
          Детальніше
        </Button>
      ) : isAdmin ? (
        <div className={css.buttonsWrapper}>
          <Button size={isDesktop ? "sm" : "xs"}>
            {isMyProfile ? "Редагувати" : "Детальніше"}
          </Button>
          <Button size={isDesktop ? "sm" : "xs"} variant="secondary-red">
            Видалити
          </Button>
        </div>
      ) : null}
    </li>
  );
}
