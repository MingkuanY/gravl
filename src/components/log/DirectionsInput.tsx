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
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: "YOUR_CALLBACK_NAME",
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    // When the user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }: Suggestion) =>
    () => {
      console.log("clicked");
      // When the user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log("📍 Coordinates: ", { lat, lng });
      });
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
          onClick={handleSelect(suggestion)}
        >
          <span className={styles.main}>{main_text}</span>
          <span className={styles.secondary}>{secondary_text}</span>
        </li>
      );
    });

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer} ref={ref}>
        <div className={classnames(styles.icon, styles.car)}>
          <Icon type="car" fill="#319fff" />
        </div>
        <input
          type="text"
          placeholder="from"
          value={value}
          onChange={handleInput}
          disabled={!ready}
        />
        {status === "OK" && (
          <ul className={styles.searchResults}>{renderSuggestions()}</ul>
        )}
      </div>
      <div className={styles.dotContainer}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={styles.inputContainer}>
        <div className={classnames(styles.icon, styles.pin)}>
          <Icon type="pin" fill="#319fff" />
        </div>
        <input type="text" placeholder="to" />
      </div>
    </div>
  );
}
