import { Formik, Form, Field } from "formik";
import css from "../CreatePostForm/CreatePostForm.module.css";
import Button from "../../common/buttons/Button.jsx";
import Input from "../../common/inputs/Input.jsx";
import { useState } from "react";
import { BsQrCode } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../../store/posts/operations.js";
import FilterSelector from "./FilterSelector/FilterSelector.jsx";
import { selectLink } from "../../../store/posts/selectors.js";
import { CitySearchSelect } from "../../features/locationSelect/LocationSelect.jsx";
import def from "../../../assets/images/circle-user.png";
import { clearLink } from "../../../store/posts/slice.js";

const INITIAL_VALUES = {
  title: "",
  description: "",
  location: "",
  tags: ["", "", "", "", ""],
};

const EditPostForm = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(null);
  const [image_url, setImage] = useState(null);
  const [size, setSize] = useState(0);
  const [scale, setScale] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const link = useSelector(selectLink);

  const handleImageFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setImage(file);
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

  return (
    <div className={css.container}>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values, { resetForm }) => {
          const tags = values.tags
            .filter((tag) => tag.trim() !== "")
            .map((tag) => ({ name: tag.trim() }));

          const payload = {
            title: values.title,
            description: values.description,
            location: values.location,
            tags,
            image_url: link,
          };

          console.log("Submitting JSON body:", payload);

          dispatch(createPost(payload));

          resetForm();
          dispatch(clearLink());
          setImage(null);
          setSize(0);
          setScale(0);
        }}
      >
        {({ isSubmitting, values, handleChange }) => (
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
                    data-label={!image_url && "def"}
                    src={
                      link || (image_url ? URL.createObjectURL(image_url) : def)
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
              <button className={css.qrBtnDown}>
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
              <fieldset disabled={!image_url} className={css.sliderSection}>
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
                  onApply={(filterValue) => setFilter(filterValue)}
                />
              </fieldset>

              <div className={css.wrapBtn}>
                <Button
                  size="lg"
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Опублікувати
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditPostForm;
