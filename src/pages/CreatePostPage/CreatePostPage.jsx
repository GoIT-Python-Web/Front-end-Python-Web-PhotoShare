import css from "./CreatePostPage.module.css";
import { BsQrCode } from "react-icons/bs";
import EditPostForm from "../../components/forms/CreatePostForm/CreatePostForm";
import BackButton from "../../components/common/backButton/BackButton";

const CreatePostPage = () => {
  return (
    <div className="container">
      <div className={css.wrapPostPage}>
        <BackButton />
        <div className={css.wrap}>
          <h2 className={css.title}>Завантаження та редагування фото</h2>
          <button className={css.qrBtn}>
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
