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

export type InputField = {
  value: string;
  coords: { lat: number; lng: number } | null;
}

type RouteSegment = {
  start: { lat: number, lng: number };
  end: { lat: number, lng: number };
  polyline: string;
  fipsCodes: string[];
}

const DirectionsInput = forwardRef<DirectionsInputHandle, {
  currentDate: string,
  visits: VisitInput[],
  setVisits: Function,
  setLoadingRoute: Function,
  setErrorMessage: Function,
  inputs: InputField[],
  setInputs: (newInputs: InputField[]) => void,
}>(({ currentDate, visits, setVisits, setLoadingRoute, setErrorMessage, inputs, setInputs }, ref) => {

  // Which input is focused on and should get autocomplete
  const [focusedInputIndex, setFocusedInputIndex] = useState<number | null>(null)

  const clearInputs = () => {
    setInputs([{ value: "", coords: null }, { value: "", coords: null }]);
  };

  useImperativeHandle(ref, () => ({
    clearInputs
  }));

  // Input autocomplete
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: "PLACES_AUTOCOMPLETE_FROM",
    requestOptions: {
      componentRestrictions: { country: 'us' }
    },
    debounce: 300,
  });

  // handles clicks outside for "from" and "to"
  const refInput = useOnclickOutside(() => {
    // When the user clicks outside of the component, we can dismiss the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInputChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedInputs = [...inputs];
    updatedInputs[index].value = e.target.value;
    setInputs(updatedInputs);
    setValue(e.target.value); // Update autocomplete value for active input
    setFocusedInputIndex(index); // Set focused input for suggestions
  };

  const handleSelect =
    (index: number, suggestion: Suggestion) =>
      () => {
        const updatedInputs = [...inputs];
        updatedInputs[index].value = suggestion.description;
        setInputs(updatedInputs);
        setValue(suggestion.description, false);
        clearSuggestions();

        // Get latitude and longitude via utility functions
        getGeocode({ address: suggestion.description }).then((results) => {
          const { lat, lng } = getLatLng(results[0]);
          updatedInputs[index].coords = { lat, lng };
          setInputs([...updatedInputs]);
        });
      };

  const handleAddStop = () => {
    setInputs([...inputs, { value: "", coords: null }]);
  }

  const handleRemoveStop = (index: number) => () => {
    const updatedInputs = inputs.filter((_, i) => i !== index);
    setInputs([...updatedInputs]);
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          className={styles.result}
          onClick={handleSelect(focusedInputIndex!, suggestion)}
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
    const directionsService = new google.maps.DirectionsService();

    try {
      // Start loading wheel
      setLoadingRoute(true);

      const routeSegments: RouteSegment[] = [];

      for (let i = 0; i < inputs.length - 1; i++) {
        const start = inputs[i].coords;
        const end = inputs[i + 1].coords;

        if (!start || !end) continue;

        // Check if this segment is already calculated
        const existingSegment = routeSegments.find(segment =>
          segment.start.lat === start.lat &&
          segment.start.lng === start.lng &&
          segment.end.lat === end.lat &&
          segment.end.lat === end.lng
        );

        if (existingSegment) {
          routeSegments.push(existingSegment);
          continue;
        }

        // Calculate route for this segment
        const results = await directionsService.route({
          origin: `${start.lat}, ${start.lng}`,
          destination: `${end.lat}, ${end.lng}`,
          travelMode: google.maps.TravelMode.DRIVING,
        });

        // Polyline between origin and destination
        const polyline = results.routes[0].overview_polyline;

        const decodedPolyline = google.maps.geometry.encoding
          .decodePath(polyline)
          .map((latLng) => [latLng.lng(), latLng.lat()]);

        // Send polyline to FastAPI server running on EC2 instance
        const response = await fetch("https://api.gravl.org/process_polyline/", {
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

        routeSegments.push({
          start,
          end,
          polyline,
          fipsCodes
        });
      }

      // Merge all segments
      const allFipsCodes = routeSegments.flatMap(segment => segment.fipsCodes)
      const seenFipsCodes = new Set();
      const newVisits = allFipsCodes
        .filter(fips_code => {
          if (seenFipsCodes.has(fips_code)) {
            return false;
          }
          seenFipsCodes.add(fips_code)
          return true;
        })
        .map(fips_code => {
          return {
            fips_code: fips_code,
            date: currentDate,
            order: visits.filter((visit) => visit.date === currentDate).length,
          };
        });

      setVisits(sortVisits([...visits, ...newVisits].filter((visit, index, self) => {
        return self.findIndex(v => v.fips_code === visit.fips_code) === index;
      })));
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error && error.code === google.maps.DirectionsStatus.ZERO_RESULTS) {
        setErrorMessage('No route found. :(')
      }
    }

    // Stop loading wheel
    setLoadingRoute(false);
  };

  useEffect(() => {
    // Calculates route whenever input coords change and only when all coords are filled out
    if (inputs.every(input => input.coords)) {
      calculateRoute();
    }
  }, [inputs]);

  return (
    <div className={styles.container}>
      {inputs.map((input, index) => (
        <div key={index}>
          <div className={styles.inputContainer} ref={index === focusedInputIndex ? refInput : null}>
            <div className={classnames(styles.icon, index === 0 ? styles.car : styles.pin)}>
              {
                index === 0 ? <Icon type="car" fill="#319fff" /> :
                  index === inputs.length - 1 ? <Icon type="pin" fill="#319fff" /> :
                    <div className={styles.dotContainer}><div></div></div>
              }
            </div>
            <input
              type="text"
              placeholder={index === 0 ? "from" : "to"}
              value={input.value}
              onChange={handleInputChange(index)}
              onFocus={() => setFocusedInputIndex(index)}
              disabled={!ready}
            />
            <div className={styles.rightSide}>
              {inputs.length > 2 && (
                <button className={styles.removeBtn} onClick={handleRemoveStop(index)}>
                  <Icon type="close" fill="#ababab" />
                </button>
              )}
            </div>

            {index === focusedInputIndex && status === "OK" && (
              <ul className={styles.searchResults}>{renderSuggestions()}</ul>
            )}
          </div>

          {index < inputs.length - 1 && <div className={styles.dots}>
            <div></div>
            <div></div>
            <div></div>
          </div>}
        </div>
      ))}

      {inputs.every(input => input.value) && inputs.length < 5 && <div className={styles.addStop} onClick={handleAddStop}>
        <div className={styles.leftSide}>
          <div className={styles.plus}>
            <Icon type="plus" fill="#319fff" />
          </div>
        </div>
        <p>Add Stop</p>
      </div>}
    </div>
  );
});

DirectionsInput.displayName = "DirectionsInput";

export default DirectionsInput;
