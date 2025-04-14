import { useSelector } from "react-redux";
import { selectQR } from "../../../store/posts/selectors";
import css from "./QRModal.module.css";
import Button from "../../common/buttons/Button.jsx";
import { toast } from "sonner";

const QRModalContent = ({ link }) => {
  const qr = useSelector(selectQR);

  if (!link && !qr) return null;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = qr;
    link.download = "qr-code.png";
    link.click();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(qr);
      toast("URL QR-коду скопійовано в буфер обміну!");
    } catch (err) {
      toast.error("Не вдалося скопіювати URL QR-коду.");
    }
  };

  return (
    <div className={css.wrapper}>
      <p>Фото успішно перетворено!</p>
      <img src={qr} alt="QR Code" />
      <div className={css.buttons}>
        <Button variant="primary" size="xxs" onClick={handleDownload}>
          Завантажити
        </Button>
        <Button variant="secondary" size="xxs" onClick={handleCopy}>
          Скопіювати
        </Button>
      </div>
    </div>
  );
};

export default QRModalContent;
