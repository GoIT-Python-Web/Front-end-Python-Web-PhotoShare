import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { IoIosResize } from "react-icons/io";
import Stars from "../../../helpers/Stars.jsx";
import css from "./PostItem.module.css";
import Button from "../../UI/buttons/Button.jsx";
import { useMediaQuery } from "react-responsive";

export default function PostItem({ post, location }) {
  const isAdmin = false;
  const isMyProfile = false;
  const isDesktop = useMediaQuery({ minWidth: 1440 });
  const isTablet = useMediaQuery({ minWidth: 768 });

  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className={css.li}>
      <div className={css.imageWrapper}>
        <img src={post.post_pic} alt="Post's picture" className={css.postPic} />

        <button className={css.viewButton} onClick={() => setIsOpen(true)}>
          <IoIosResize className={css.resize} />
        </button>
      </div>

      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={[{ src: post.post_pic }]}
          carousel={{ finite: true, preload: 1 }}
        />
      )}

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
            {post.rating} ({post.rating_length} оцінок)
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
