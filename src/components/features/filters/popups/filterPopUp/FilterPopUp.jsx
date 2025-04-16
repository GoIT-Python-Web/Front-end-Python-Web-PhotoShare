import { Formik, Form, Field } from "formik";
import css from "./FilterPopUp.module.css";
import Button from "../../../../common/buttons/Button.jsx";
import { LuCalendarDays } from "react-icons/lu";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMediaQuery } from "react-responsive";
import { useClickOutside } from "../../../../../helpers/hooks/useClickOutside.js";
import { formatDateLocal } from "../../../../../helpers/formatDateLocal.js";

export default function FilterPopUp({
  buttonRef,
  location,
  onClose,
  onFilterChange,
  keyword,
}) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const datepickerRef = useRef(null);
  const modalRef = useRef(null);

  const isTablet = useMediaQuery({ minWidth: "768px" });
  useClickOutside(modalRef, buttonRef, onClose);

  return (
    <div className={css.wrapper} ref={modalRef}>
      <Formik
        initialValues={{
          keyword: keyword || "",
          from_date: null,
          to_date: null,
          exact_star: 0,
        }}
        onSubmit={(values) => {
          const filters = {
            keyword: values.keyword,
            from_date: startDate ? formatDateLocal(startDate) : null,
            to_date: endDate ? formatDateLocal(endDate) : null,
            exact_star: values.exact_star,
          };
          onFilterChange(filters);
        }}
        onReset={() => {
          setDateRange([null, null]);
          onFilterChange({
            keyword: "",
            from_date: null,
            to_date: null,
            exact_star: 0,
            sort_by: null,
            order: null,
          });
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className={css.form}>
            <div className={css.inputWrapper}>
              <label className={css.label}>
                За датою {location === "main" ? "Публікації" : "Створення"}
                <input
                  className={css.dateInput}
                  readOnly
                  placeholder="Введіть дату або діапазон дат"
                  value={
                    startDate && endDate
                      ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                      : startDate
                      ? startDate.toLocaleDateString()
                      : ""
                  }
                  onClick={() => datepickerRef.current.setOpen(true)}
                />
                <HiOutlineMagnifyingGlass className={css.glassDateIcon} />
                <DatePicker
                  selected={startDate}
                  onChange={(update) => setDateRange(update)}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
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
                    const isFull = values.exact_star >= star;
                    const isHalf =
                      values.exact_star >= star - 0.5 &&
                      values.exact_star < star;

                    return (
                      <span
                        key={star}
                        className={css.starIcon}
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const clickX = e.clientX - rect.left;
                          const newRating =
                            clickX < rect.width / 2 ? star - 0.5 : star;
                          setFieldValue("exact_star", newRating);
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
              <Button size={isTablet ? "sm" : "xxs"} type="submit">
                Застосувати
              </Button>
              <Button
                size={isTablet ? "sm" : "xxs"}
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
