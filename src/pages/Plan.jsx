import styles from "../styles/plan.module.scss";
import Header from "../components/header/Header";
import Loading from "./Loading";

import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";

const zoom = 11;
const center = { lat: 33.7756, lng: -84.2463 }; // Georgia Tech lng: -84.3963

export default function Plan() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCC0Ea654g-GJnZACL8UfXGUKEvfbiefA8",
  });

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <div className={styles.main}>
        <div className={styles.map}>
          <GoogleMap
            center={center}
            zoom={zoom}
            mapContainerStyle={{
              width: "100%",
              height: "100%",
            }}
            options={{
              zoomControl: false,
              fullscreenControl: false,
              streetViewControl: false,
            }}
          ></GoogleMap>
          <div className={styles.sidebar}>
            <p className={styles.myPlans}>My Plans</p>
          </div>
        </div>
      </div>
    </>
  );
}
