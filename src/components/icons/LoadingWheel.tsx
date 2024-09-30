import styles from '../../styles/loadingwheel.module.scss';
import Icon from './Icon';

export default function LoadingWheel() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.wheel}>
        <Icon type="wheel" fill="#24292f" />
      </div>
      <p className={styles.pending}>Loading...</p>
    </div>
  )
}
