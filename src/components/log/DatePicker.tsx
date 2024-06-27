import styles from "../../styles/datepicker.module.scss";
import Icon from "../icons/Icon";

export default function DatePicker({
  date,
  setDate,
}: {
  date: string;
  setDate: Function;
}) {
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    setDate(date);
  };

  return (
    <div className={styles.datePickerContainer}>
      <input
        className={styles.dateInput}
        type="date"
        onChange={handleDateChange}
        value={date}
      />
    </div>
  );
}
