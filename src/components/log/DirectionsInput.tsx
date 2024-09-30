import styles from "../../styles/directionsinput.module.scss";
import Icon from "../icons/Icon";
import classnames from "classnames";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { VisitInput } from "@/utils/types";
import { sortVisits } from "./ManualFillCard";

type Suggestion = {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
};

export type DirectionsInputHandle = {
  clearInputs: () => void;
}

const DirectionsInput = forwardRef<DirectionsInputHandle, {
  currentDate: string,
  visits: VisitInput[],
  setVisits: Function
}>(({ currentDate, visits, setVisits }, ref) => {
  const [startCoords, setStartCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [endCoords, setEndCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const clearInputs = () => {
    // clear input fields
    setValueFrom('');
    setValueTo('');

    // clear input state variables
    setStartCoords(null);
    setEndCoords(null);
  }

  useImperativeHandle(ref, () => {
    return {
      clearInputs
    }
  })

  // starting point autocomplete
  const {
    ready: readyFrom,
    value: valueFrom,
    suggestions: { status: statusFrom, data: dataFrom },
    setValue: setValueFrom,
    clearSuggestions: clearSuggestionsFrom,
  } = usePlacesAutocomplete({
    callbackName: "PLACES_AUTOCOMPLETE_FROM",
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

  // ending point autocomplete
  const {
    ready: readyTo,
    value: valueTo,
    suggestions: { status: statusTo, data: dataTo },
    setValue: setValueTo,
    clearSuggestions: clearSuggestionsTo,
  } = usePlacesAutocomplete({
    callbackName: "PLACES_AUTOCOMPLETE_TO",
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

  // handles clicks outside for "from" and "to"
  const refFrom = useOnclickOutside(() => {
    // When the user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestionsFrom();
  });
  const refTo = useOnclickOutside(() => {
    // When the user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestionsTo();
  });

  const handleInputFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update the keyword of the input element
    setValueFrom(e.target.value);
  };
  const handleInputTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update the keyword of the input element
    setValueTo(e.target.value);
  };

  const handleSelectFrom =
    ({ description }: Suggestion) =>
      () => {
        // When the user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"
        setValueFrom(description, false);
        clearSuggestionsFrom();

        // Get latitude and longitude via utility functions
        getGeocode({ address: description }).then((results) => {
          const { lat, lng } = getLatLng(results[0]);
          setStartCoords({ lat, lng });
        });
      };
  const handleSelectTo =
    ({ description }: Suggestion) =>
      () => {
        // When the user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"
        setValueTo(description, false);
        clearSuggestionsTo();

        // Get latitude and longitude via utility functions
        getGeocode({ address: description }).then((results) => {
          const { lat, lng } = getLatLng(results[0]);
          setEndCoords({ lat, lng });
        });
      };

  const renderSuggestionsFrom = () =>
    dataFrom.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          className={styles.result}
          onClick={handleSelectFrom(suggestion)}
        >
          <span className={styles.main}>{main_text}</span>
          <span className={styles.secondary}>{secondary_text}</span>
        </li>
      );
    });
  const renderSuggestionsTo = () =>
    dataTo.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          className={styles.result}
          onClick={handleSelectTo(suggestion)}
        >
          <span className={styles.main}>{main_text}</span>
          <span className={styles.secondary}>{secondary_text}</span>
        </li>
      );
    });

  /**
   * Uses Google Maps Directions Service to get the polyline from origin to destination and makes a request to FastAPI server to get corresponding county FIPS codes.
   *
   * @returns FIPS codes in order of intersection (travel)
   */
  const calculateRoute = async () => {
    if (!startCoords || !endCoords) {
      return;
    }
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: `${startCoords.lat}, ${startCoords.lng}`,
      destination: `${endCoords.lat}, ${endCoords.lng}`,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    // Polyline between origin and destination
    const polyline = results.routes[0].overview_polyline;

    const decodedPolyline = google.maps.geometry.encoding
      .decodePath(polyline)
      .map((latLng) => [latLng.lng(), latLng.lat()]);

    // Send polyline to FastAPI server - https://tvl4fw67ebzzhfihr6kxttsovu0hnkre.lambda-url.us-east-1.on.aws/
    const response = await fetch("http://localhost:8000/process_polyline/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ polyline: decodedPolyline }),
    });

    if (!response.ok) {
      console.error("Error processing polyline:", response.statusText);
      return;
    }

    const data = await response.json();
    const fipsCodes: string[] = data.fips_codes;
    const newVisits = fipsCodes.map(fips_code => {
      return {
        fips_code: fips_code,
        date: currentDate,
        order: visits.filter((visit) => visit.date === currentDate).length,
      };
    });

    setVisits(sortVisits([...visits, ...newVisits]));
  };

  useEffect(() => {
    if (startCoords && endCoords) {
      calculateRoute();
    }
  }, [startCoords, endCoords])

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer} ref={refFrom}>
        <div className={classnames(styles.icon, styles.car)}>
          <Icon type="car" fill="#319fff" />
        </div>
        <input
          type="text"
          placeholder="from"
          value={valueFrom}
          onChange={handleInputFrom}
          disabled={!readyFrom}
        />
        {statusFrom === "OK" && (
          <ul className={styles.searchResults}>{renderSuggestionsFrom()}</ul>
        )}
      </div>
      <div className={styles.dotContainer}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={styles.inputContainer} ref={refTo}>
        <div className={classnames(styles.icon, styles.pin)}>
          <Icon type="pin" fill="#319fff" />
        </div>
        <input
          type="text"
          placeholder="to"
          value={valueTo}
          onChange={handleInputTo}
          disabled={!readyTo}
        />
        {statusTo === "OK" && (
          <ul className={styles.searchResults}>{renderSuggestionsTo()}</ul>
        )}
      </div>
    </div>
  );
});

export default DirectionsInput;
