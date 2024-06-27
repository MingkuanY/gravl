"use client";

import styles from "../../styles/dashboard.module.scss";
import EditProfileButton from "@/components/dashboard/EditProfileButton";
import MapLoader from "@/components/dashboard/MapLoader";
import UserStats from "@/components/dashboard/UserStats";
import Timeline from "@/components/dashboard/Timeline";
import { useState } from "react";
import { User } from "@prisma/client";
import { PlaceInput, TripWithVisits } from "@/utils/types";
import NewTrip from "../log/NewTrip";

export default function Dashboard({
  user,
  trips,
  userWithTripsAndVisits,
  maps,
  places,
}: {
  user: User;
  trips: TripWithVisits[];
  userWithTripsAndVisits: any;
  maps: any;
  places: PlaceInput[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [logTrip, setLogTrip] = useState(-1);

  return (
    <>
      {logTrip !== -1 && (
        <NewTrip
          user={user}
          places={places}
          logTrip={logTrip}
          setLogTrip={setLogTrip}
        />
      )}
      {logTrip === -1 && (
        <div className={styles.container}>
          <Timeline
            trips={trips}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setLogTrip={setLogTrip}
          />
          <div className={`${styles.main} ${isOpen ? styles.shifted : ""}`}>
            <div className={styles.profile}>
              <div className={styles.pfpContainer}>
                <img src={user!.image!} alt="PFP" />
              </div>
              <div className={styles.userInfo}>
                <div className={styles.usernameAndEdit}>
                  <p className={styles.username}>{user!.username}</p>
                  <div className={styles.edit}>
                    <EditProfileButton />
                  </div>
                </div>
                <p className={styles.location}>{user!.location}</p>
                <p className={styles.bio}>{user!.bio}</p>
              </div>
              <UserStats
                trips={userWithTripsAndVisits!.trips}
                setIsOpen={setIsOpen}
              />
            </div>

            <MapLoader
              counties={maps.counties}
              states={maps.states}
              countries={maps.countries}
              nationalparks={maps.nationalparks}
            />
          </div>
        </div>
      )}
    </>
  );
}
