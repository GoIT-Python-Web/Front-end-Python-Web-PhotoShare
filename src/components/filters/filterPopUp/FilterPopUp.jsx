import { Formik, Form, Field } from "formik";
import css from "./FilterPopUp.module.css";
import Button from "../../UI/buttons/Button.jsx";
import { LuCalendarDays } from "react-icons/lu";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMediaQuery } from "react-responsive";

export default function FilterPopUp({ buttonRef, location, onClose }) {
  const tags = ["#tag1", "#tag2", "#tag3"];

  const datepickerRef = useRef(null);
  const modalRef = useRef(null);

  const isTablet = useMediaQuery({ minWidth: "768px" });

  // close on click outside the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, buttonRef]);

  return (
    <div className={css.wrapper} ref={modalRef}>
      <Formik
        initialValues={{
          search: "",
          tags: [],
          date: null,
          rating: 0,
        }}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, setFieldValue }) => (
          <Form className={css.form}>
            <div className={css.inputWrapper}>
              <label className={css.label}>
                За тегами
                <Field
                  className={css.searchInput}
                  type="text"
                  name="search"
                  placeholder="Введіть #"
                />
                <HiOutlineMagnifyingGlass className={css.glassIcon} />
              </label>
            </div>

            <div className={css.inputWrapper}>
              <label className={css.label}>
                Популярні теги
                <div className={css.btnList}>
                  {tags.map((tag) => (
                    <button
                      type="button"
                      key={tag}
                      className={css.tagBtn}
                      data-active={values.tags.includes(tag)}
                      onClick={() =>
                        setFieldValue(
                          "tags",
                          values.tags.includes(tag)
                            ? values.tags.filter((t) => t !== tag)
                            : [...values.tags, tag]
                        )
                      }
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </label>
            </div>

            <div className={css.inputWrapper}>
              <label className={css.label}>
                За датою {location === "main" ? "Публікації" : "Створення"}
                <input
                  className={css.dateInput}
                  readOnly
                  placeholder="Введіть День, Місяць Або Рік"
                  value={values.date ? values.date.toLocaleDateString() : ""}
                  onClick={() => datepickerRef.current.setOpen(true)}
                />
                <HiOutlineMagnifyingGlass className={css.glassDateIcon} />
                <DatePicker
                  selected={values.date}
                  onChange={(date) => setFieldValue("date", date)}
                  dateFormat="dd/MM/yyyy"
                  className={css.dateBtn}
                  showPopperArrow={false}
                  ref={datepickerRef}
                  popperPlacement="bottom-end"
                  customInput={<input className={css.hidden} readOnly />}
                />
                <LuCalendarDays
                  className={css.dateIcon}
                  onClick={() => datepickerRef.current.setOpen(true)}
                />
              </label>
            </div>

            <div className={css.inputWrapper}>
              <label className={css.label}>
                За рейтингом
                <div className={css.starList}>
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFull = values.rating >= star;
                    const isHalf =
                      values.rating >= star - 0.5 && values.rating < star;

                    return (
                      <span
                        key={star}
                        className={css.starIcon}
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const clickX = e.clientX - rect.left;
                          const newRating =
                            clickX < rect.width / 2 ? star - 0.5 : star;
                          setFieldValue("rating", newRating);
                        }}
                      >
                        {isFull ? (
                          <FaStar className={css.starFaIcon} />
                        ) : isHalf ? (
                          <FaStarHalfAlt className={css.starFaIcon} />
                        ) : (
                          <FaRegStar className={css.starFaIcon} />
                        )}
                      </span>
                    );
                  })}
                </div>
              </label>
            </div>

            <div className={css.buttons}>
              <Button size={isTablet ? "sm" : "xs"} type="submit">
                Застосувати
              </Button>
              <Button
                size={isTablet ? "sm" : "xs"}
                variant="secondary-red"
                type="reset"
              >
                Очистити
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
