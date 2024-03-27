import styles from "../../styles/timelineyear.module.scss";
import TripCard from "./TripCard";

export default function TimelineYear({ year }) {
  return (
    <div className={styles.container}>
      <div className={styles.year}>{year}</div>
      <div className={styles.allMonthsContainer}>
        <div className={styles.monthContainer}>
          <div className={styles.month}>April</div>
          <div className={styles.trips}>
            <TripCard
              title="Solar Eclipse in Texas"
              locations={["Austin", "Houston"]}
              dates={["2024-04-05", "2024-04-09"]}
              thumbnail="https://res.cloudinary.com/simpleview/image/upload/v1648755098/clients/austin/Austin_Skyline_Credit_Christopher_Sherman_lifetime__4f60343d-9f69-450c-8ad3-fa636761786d.jpg"
            />
            <TripCard
              title="Southern California"
              locations={["Santa Barbara", "San Diego"]}
              dates={["2024-01-30", "2024-02-03"]}
              thumbnail="https://lajolla.com/wp-content/uploads/2018/12/Southern-California.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
