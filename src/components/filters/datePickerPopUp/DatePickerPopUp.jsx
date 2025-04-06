import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./DatePickerPopUp.module.css";
import { useClickOutside } from "../../../helpers/useClickOutside.js";

export default function DatePickerPopUp({ buttonRef, onClose }) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const modalRef = useRef(null);
  useClickOutside(modalRef, buttonRef, onClose);

  return (
    <div ref={modalRef} className={css.wrapper}>
      <DatePicker
        selected={startDate}
        onChange={(update) => setDateRange(update)}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        dateFormat="dd/MM/yyyy"
      />
    </div>
  );
}
