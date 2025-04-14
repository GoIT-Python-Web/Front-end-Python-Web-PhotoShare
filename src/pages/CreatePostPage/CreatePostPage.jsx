import { useDispatch, useSelector } from "react-redux";
import css from "./CreatePostPage.module.css";
import { selectLink, selectURL } from "../../store/posts/selectors.js";
import { toast } from "sonner";
import { generateQrCode } from "../../store/posts/operations.js";
import { useEffect, useRef, useState } from "react";
import { clearLink } from "../../store/posts/slice.js";
import BackButton from "../../components/common/backButton/BackButton.jsx";
import { BsQrCode } from "react-icons/bs";
import EditPostForm from "../../components/forms/CreatePostForm/CreatePostForm.jsx";
import Modal from "../../components/modals/modal/Modal.jsx";
import QRModalContent from "../../components/modals/qrModal/QRModal.jsx";
import { useMediaQuery } from "react-responsive";

const CreatePostPage = () => {
  const dispatch = useDispatch();
  const url = useSelector(selectURL);
  const link = useSelector(selectLink);
  const isTablet = useMediaQuery({ minWidth: "768px" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const qrRef = useRef(null);
  const handleGenerateQR = () => {
    if (url) {
      dispatch(generateQrCode(url));
      setIsModalOpen(true);
    } else {
      toast("Please, publish your post first.");
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearLink());
    };
  }, [dispatch]);

  return (
    <div className="container">
      <div className={css.wrapPostPage}>
        <BackButton />
        <div className={css.wrap}>
          <h2 className={css.title}>Завантаження та редагування фото</h2>
          <button
            type="button"
            className={css.qrBtn}
            ref={qrRef}
            onClick={handleGenerateQR}
          >
            <BsQrCode size={32} />
            &nbsp;Отримати QR код
          </button>
        </div>
        <EditPostForm generateQR={handleGenerateQR} url={url} ref={qrRef} />

        <Modal
          isOpen={isModalOpen}
          size={isTablet ? "md" : "s"}
          onClose={() => setIsModalOpen(false)}
        >
          <QRModalContent link={link} />
        </Modal>
      </div>
    </div>
  );
};

export default CreatePostPage;
