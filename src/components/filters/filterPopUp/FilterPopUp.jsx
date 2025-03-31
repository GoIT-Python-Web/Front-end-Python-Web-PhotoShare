import { Formik, Form, Field } from "formik";
import css from "./FilterPopUp.module.css";
import Button from "../../UI/buttons/Button.jsx";
import { LuCalendarDays } from "react-icons/lu";
import { FaStar, FaRegStar } from "react-icons/fa";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function FilterPopUp({ location }) {
  const tags = ["#tag1", "#tag2", "#tag3"];
  const datepickerRef = useRef(null);
  return (
    <div className={css.wrapper}>
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
                За датою публікації
                <input
                  className={css.dateInput}
                  readOnly
                  placeholder="Задайте День, Місяць Або Рік"
                  value={values.date ? values.date.toLocaleDateString() : ""}
                  onClick={() => datepickerRef.current.setOpen(true)}
                />
                <HiOutlineMagnifyingGlass className={css.glassIcon} />
                <DatePicker
                  selected={values.date}
                  onChange={(date) => setFieldValue("date", date)}
                  dateFormat="dd/MM/yyyy"
                  className={css.dateBtn}
                  showPopperArrow={false}
                  ref={datepickerRef}
                  popperPlacement="bottom-start"
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
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={css.starIcon}
                      onClick={() => setFieldValue("rating", star)}
                    >
                      {values.rating >= star ? (
                        <FaStar className={css.starFaIcon} />
                      ) : (
                        <FaRegStar className={css.starFaIcon} />
                      )}
                    </span>
                  ))}
                </div>
              </label>
            </div>

            <div className={css.buttons}>
              <Button size="xs" type="submit">
                Застосувати
              </Button>
              <Button size="xs" variant="secondary-red" type="reset">
                Очистити
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
