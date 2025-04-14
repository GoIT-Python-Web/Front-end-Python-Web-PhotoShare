import { useSelector } from "react-redux";
import { selectQR } from "../../../store/posts/selectors";
import css from "./QRModal.module.css";
import Button from "../../common/buttons/Button.jsx";
import { toast } from "sonner";

const QRModalContent = () => {
  const qr = useSelector(selectQR);

  if (!qr) return null;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = qr;
    link.download = "qr-code.png";
    link.click();
  };

  const handleCopy = async () => {
    try {
      const response = await fetch(qr);
      const blob = await response.blob();
      const clipboardItem = new ClipboardItem({ [blob.type]: blob });
      await navigator.clipboard.write([clipboardItem]);
      toast("QR-код скопійовано в буфер обміну!");
    } catch (err) {
      console.error(err);
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
