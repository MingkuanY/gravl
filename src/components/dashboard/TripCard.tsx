import { useScreenWidth } from "@/utils/hooks";
import styles from "../../styles/tripcard.module.scss";
import Icon from "../icons/Icon";
import classnames from "classnames";
import { Mode } from "@/utils/types";

export default function TripCard({
  name,
  desc,
  selected,
  isClicked,
  editTrip,
  mode,
}: {
  name: string;
  desc: string;
  selected: boolean;
  isClicked: Function;
  editTrip: Function;
  mode: Mode;
}) {
  const isMobile = useScreenWidth();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget.contains(e.target as Node)) {
      const target = e.target as HTMLElement;
      if (target.closest(`.${styles.editContainer}`)) {
        e.stopPropagation();
        editTrip();
      } else {
        isClicked(e);
      }
    }
  };

  return (
    <div
      className={classnames(
        styles.container,
        selected && styles.selected,
        "trip-card"
      )}
      onClick={handleClick}
    >
      <div className={classnames(styles.right, mode === "USER" && styles.editMode)}>
        <p className={styles.title}>{name}</p>
        <p className={classnames(styles.locations, selected && styles.expanded)}>{desc}</p>
      </div>
      {!isMobile && mode === "USER" && (
        <button className={styles.editContainer} onClick={handleClick}>
          <div className={styles.edit}>
            <Icon type="edit" fill={selected ? "#fff" : "#757575"} />
          </div>
        </button>
      )}
    </div>
  );
}
