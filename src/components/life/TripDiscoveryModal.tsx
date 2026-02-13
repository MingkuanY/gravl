import { formatSeparatedDate } from "@/utils/date";
import styles from "../../styles/tripdiscoverymodal.module.scss";

type TripPreview = {
  name: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
};

export default function TripDiscoveryModal({
  tripPreviews,
  onDismiss,
}: {
  tripPreviews: TripPreview[];
  onDismiss: () => void;
}) {
  const formatDateRange = (startDate: string, endDate: string) => {
    if (startDate === endDate) {
      return formatSeparatedDate(startDate).join(" ");
    }
    return `${formatSeparatedDate(startDate).join(" ")} - ${formatSeparatedDate(endDate).join(" ")}`;
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          We found {tripPreviews.length} trip{tripPreviews.length !== 1 ? 's' : ''}
        </h2>

        <div className={styles.tripList}>
          {tripPreviews.map((preview, index) => (
            <div key={index} className={styles.tripCard}>
              <div className={styles.imageContainer}>
                <img
                  src={preview.imageUrl}
                  alt={preview.name}
                  className={styles.image}
                />
              </div>
              <p className={styles.tripName}>{preview.name}</p>
              <p className={styles.tripDate}>
                {formatDateRange(preview.startDate, preview.endDate)}
              </p>
            </div>
          ))}
        </div>

        <button onClick={onDismiss} className={styles.dismissButton}>
          Let&apos;s Go!
        </button>
      </div>
    </div>
  );
}
