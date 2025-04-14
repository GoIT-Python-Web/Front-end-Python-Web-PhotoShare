import { Formik, Form, Field } from "formik";
import css from "../CreatePostForm/CreatePostForm.module.css";
import Button from "../../common/buttons/Button.jsx";
import Input from "../../common/inputs/Input.jsx";
import { useEffect, useRef, useState } from "react";
import { BsQrCode } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../../store/posts/operations.js";
import FilterSelector from "./FilterSelector/FilterSelector.jsx";
import { selectLink } from "../../../store/posts/selectors.js";
import { CitySearchSelect } from "../../features/locationSelect/LocationSelect.jsx";
import def from "../../../assets/images/circle-user.png";
import { clearLink } from "../../../store/posts/slice.js";
import { toast } from "sonner";

const INITIAL_VALUES = {
  title: "",
  description: "",
  location: "",
  tags: ["", "", "", "", ""],
};

const EditPostForm = ({ generateQR, url, ref }) => {
  const buttonRef = useRef();
  const formikRef = useRef();
  const dispatch = useDispatch();
  const [image_url, setImage] = useState(null);
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const [submit, setSubmit] = useState(false);
  const [link, setLink] = useState(null);
  const [size, setSize] = useState(0);
  const [scale, setScale] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const reduxLink = useSelector(selectLink);

  const handleImageFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setIsFormDisabled(false);
    }
  };

  const showLoadingToast = () => {
    if (submit) {
      toast.info("Йде процес публікації, будь ласка, зачекайте...", {
        autoClose: false,
        toastId: "loading",
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    handleImageFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleImageFile(file);
  };

  useEffect(() => {
    if (reduxLink && submit) {
      setLink(reduxLink);
      toast.dismiss("loading");
      const tags = formikRef.current?.values.tags
        .filter((tag) => tag.trim() !== "")
        .map((tag) => ({ name: tag.trim().replace(/#/g, "") }));

      const payload = {
        title: formikRef.current?.values.title,
        description: formikRef.current?.values.description,
        location: formikRef.current?.values.location,
        tags,
        image_url: reduxLink,
      };
      dispatch(createPost(payload));
      formikRef.current?.resetForm();
      dispatch(clearLink());
      setLink(null);
      setImage(def);
      setSize(0);
      setScale(0);
      setSubmit(false);
      formikRef.current?.setFieldValue("location", "");
      setIsFormDisabled(true);
      setTimeout(() => {
        toast("Фото було опубліковано! Тепер ви можете отримати QR код.", {
          action: {
            label: "Отримати QR",
            onClick: () => ref.current?.click(),
          },
        });
      }, 1000);
    } else if (reduxLink) {
      setLink(reduxLink);
      toast.dismiss("loading");
    }
  }, [reduxLink, submit, generateQR, url, dispatch]);

  const handlePublish = () => {
    if (!link) {
      buttonRef.current?.click();
      showLoadingToast();
    }
    setSubmit(true);
  };

  return (
    <div className={css.container}>
      <Formik initialValues={INITIAL_VALUES} innerRef={formikRef}>
        {({ values, handleChange }) => (
          <Form className={css.form}>
            <div className={css.wrapImgDesk}>
              <div
                className={`${css.imageWrap} ${isDragging ? css.dragging : ""}`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
              >
                <div className={css.imageBox}>
                  <img
                    data-label={isFormDisabled && "def"}
                    src={
                      link ||
                      (image_url && image_url instanceof File
                        ? URL.createObjectURL(image_url)
                        : def)
                    }
                    alt="Прев'ю"
                    className={css.previewImage}
                    style={{
                      width: `${50 + Number(size)}%`,
                      height: `${50 + Number(size)}%`,
                      transform: `scale(${1 + Number(scale) / 100})`,
                      transition: "0.3s ease",
                    }}
                  />
                </div>
                <p className={css.imageText}>
                  {image_url
                    ? "Перетягніть нове зображення сюди"
                    : "Перетягніть зображення сюди"}
                </p>
                <label htmlFor="upload-photo" className={css.uploadLabel}>
                  Завантажити фото
                </label>
                <input
                  id="upload-photo"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>
              <button
                className={css.qrBtnDown}
                type="button"
                onClick={() => generateQR(url)}
              >
                <BsQrCode size={32} />
                &nbsp;Отримати QR код
              </button>
            </div>

            <div className={css.wrapAll}>
              <div className={css.wrapDescription}>
                <Field
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  className={css.textarea}
                  placeholder="Заголовок зображення"
                />
              </div>
              <div className={css.wrapDescription}>
                <textarea
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  className={css.textarea}
                  placeholder="Опис фото..."
                  rows="5"
                />
              </div>
              <div className={css.wrapDescription}>
                <CitySearchSelect />
              </div>

              <div className={css.wrapTegs}>
                {values.tags.map((_, index) => (
                  <div className={css.tegItem} key={index}>
                    <Field name={`tags[${index}]`}>
                      {({ field, meta }) => (
                        <Input
                          {...field}
                          type="text"
                          placeholder="Введіть тег #"
                          error={meta.touched && meta.error}
                          errorMessage={
                            meta.touched && meta.error ? meta.error : ""
                          }
                        />
                      )}
                    </Field>
                  </div>
                ))}
              </div>
              <fieldset disabled={isFormDisabled} className={css.sliderSection}>
                <div className={css.sliderWrap}>
                  <div className={css.sliderWrapper}>
                    <label className={css.sliderLabel}>Змінити Розмір</label>
                    <div className={css.sliderContainer}>
                      <input
                        type="range"
                        min="-100"
                        max="100"
                        step="1"
                        value={size}
                        onChange={(e) => setSize(Number(e.target.value))}
                        className={css.slider}
                        style={{
                          background: `linear-gradient(to right, var(--text) ${
                            ((size + 100) / 200) * 100
                          }%, var(--button-notactive) ${
                            ((size + 100) / 200) * 100
                          }%)`,
                        }}
                      />
                      <div className={css.sliderMarks}>
                        <span>-100</span>
                        <span>0</span>
                        <span>100</span>
                      </div>
                    </div>
                  </div>

                  <div className={css.sliderWrapper}>
                    <label className={css.sliderLabel}>Масштабувати</label>
                    <div className={css.sliderContainer}>
                      <input
                        type="range"
                        min="-100"
                        max="100"
                        step="1"
                        value={scale}
                        onChange={(e) => setScale(Number(e.target.value))}
                        className={css.slider}
                        style={{
                          background: `linear-gradient(to right, var(--text) ${
                            ((scale + 100) / 200) * 100
                          }%, var(--button-notactive) ${
                            ((scale + 100) / 200) * 100
                          }%)`,
                        }}
                      />
                      <div className={css.sliderMarks}>
                        <span>-100</span>
                        <span>0</span>
                        <span>100</span>
                      </div>
                    </div>
                  </div>
                </div>
                <FilterSelector
                  image={image_url}
                  size={size}
                  scale={scale}
                  buttonRef={buttonRef}
                />
              </fieldset>

              <div className={css.wrapBtn}>
                <button
                  onClick={handlePublish}
                  type="submit"
                  disabled={!image_url}
                  className={css.btn}
                >
                  Опублікувати
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditPostForm;
