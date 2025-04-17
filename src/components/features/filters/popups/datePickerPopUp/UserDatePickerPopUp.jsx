import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./DatePickerPopUp.module.css";
import { useClickOutside } from "../../../../../helpers/hooks/useClickOutside.js";

export default function UserDatePickerPopUp({
  buttonRef,
  onClose,
  onDateSelect,
}) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const modalRef = useRef(null);
  useClickOutside(modalRef, buttonRef, onClose);

  const handleDateChange = (update) => {
    setDateRange(update);
    if (onDateSelect) {
      const [from, to] = update;
      onDateSelect({ from, to });
    }
  };

  return (
    <div ref={modalRef} className={css.wrapper}>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        dateFormat="dd/MM/yyyy"
      />
    </div>
  );
}
