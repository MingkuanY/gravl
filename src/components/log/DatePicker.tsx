import { useState } from "react";
import styles from "../../styles/datepicker.module.scss";
import Icon from "../icons/Icon";

export default function DatePicker({ setDate }: { setDate: Function }) {
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    setSelectedDate(date);
    setDate(date);
  };

  return (
    <div className={styles.datePickerContainer}>
      <input
        className={styles.dateInput}
        type="date"
        onChange={handleDateChange}
        value={selectedDate}
      />
    </div>
  );
}
