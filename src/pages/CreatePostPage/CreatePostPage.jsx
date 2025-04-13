import css from "./CreatePostPage.module.css";
import { BsQrCode } from "react-icons/bs";
import EditPostForm from "../../components/forms/CreatePostForm/CreatePostForm";
import BackButton from "../../components/common/backButton/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { generateQrCode } from "../../store/posts/operations.js";
import { toast } from "sonner";
import { useEffect } from "react";
import { clearLink } from "../../store/posts/slice.js";

const CreatePostPage = () => {
  const dispatch = useDispatch();
  const handleGenerateQR = () => {
    if (post?.id) {
      dispatch(generateQrCode(post.id));
    } else {
      toast("Спочатку створіть пост");
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearLink());
    };
  }, []);

  return (
    <div className="container">
      <div className={css.wrapPostPage}>
        <BackButton />
        <div className={css.wrap}>
          <h2 className={css.title}>Завантаження та редагування фото</h2>
          <button className={css.qrBtn} onClick={handleGenerateQR}>
            <BsQrCode size={32} />
            &nbsp;Отримати QR код
          </button>
        </div>
        <EditPostForm />
      </div>
    </div>
  );
};

export default CreatePostPage;
