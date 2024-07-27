import { useScreenWidth } from "@/utils/hooks";
import styles from "../../styles/tripcard.module.scss";
import Icon from "../icons/Icon";
import classnames from "classnames";

export default function TripCard({
  name,
  desc,
  selected,
  isClicked,
  editTrip,
}: {
  name: string;
  desc: string;
  selected: boolean;
  isClicked: Function;
  editTrip: Function;
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
      className={classnames(styles.container, selected && styles.selected)}
      onClick={handleClick}
    >
      <div className={styles.right}>
        <p className={styles.title}>{name}</p>
        <p className={styles.locations}>{desc}</p>
      </div>
      {!isMobile && (
        <button className={styles.editContainer} onClick={handleClick}>
          <div className={styles.edit}>
            <Icon type="edit" fill={selected ? "#fff" : "#757575"} />
          </div>
        </button>
      )}
    </div>
  );
}
