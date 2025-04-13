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
    setDateRange(update); // Оновлюємо стан з вибраними датами
    if (onDateSelect) {
      const [from, to] = update;
      onDateSelect({ from, to }); // Передаємо обрані дати назад в батьківський компонент
    }
  };

  return (
    <div ref={modalRef} className={css.wrapper}>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange} // Викликаємо функцію для оновлення дати
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        dateFormat="dd/MM/yyyy"
      />
    </div>
  );
}
