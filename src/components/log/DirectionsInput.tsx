import styles from "../../styles/directionsinput.module.scss";
import Icon from "../icons/Icon";
import classnames from "classnames";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

type Suggestion = {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
};

export default function DirectionsInput() {
  // starting point autocomplete
  const {
    ready: readyFrom,
    value: valueFrom,
    suggestions: { status: statusFrom, data: dataFrom },
    setValue: setValueFrom,
    clearSuggestions: clearSuggestionsFrom,
  } = usePlacesAutocomplete({
    callbackName: "YOUR_CALLBACK_NAME",
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
    callbackName: "YOUR_CALLBACK_NAME",
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
        console.log(`📍 From ${lat} ${lng}`);
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
        console.log(`📍 To ${lat} ${lng}`);
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
}
