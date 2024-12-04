"use client"

import { PlaceInput, UserWithTrips } from '@/utils/types';
import styles from '../../../styles/gravlwrapped.module.scss';
import WrappedLoader from './WrappedLoader';
import { sortTrips } from '@/utils/date';

export default function GravlWrapped({ user, places }: {
  user: UserWithTrips;
  places: PlaceInput[];
}) {
  // Stats
  const year = new Date().getFullYear();
  const newCounties = 292;
  const newStates = 7;

  return (
    <div className={styles.viewport}>
      <h1>{year}</h1>
      <p className={styles.stat}>{newCounties} new counties</p>
      <p className={styles.stat}>{newStates} new states</p>
      <WrappedLoader trips={sortTrips(user.trips, true)} places={places} />
      <p className={styles.link}>gravl.org/wrapped</p>
    </div>
  )
}
