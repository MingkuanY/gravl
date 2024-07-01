"use client";

import styles from "../../styles/states.module.scss";
import { useEffect, useRef, useState } from "react";
import { interpolateColors, otherColor, todayColor } from "../../utils/color";
import { handleMapClick, loadMap, refreshMap } from "../../utils/map";
import { MapProps, PlaceInput } from "@/utils/types.ts";

export const totalStates = 50; // plus DC

export default function States({
  data,
  updateCount,
  total,
  reload,
  animate,
  places,
  visits,
  setVisits,
  currentDate,
}: MapProps) {
  const startColor = "#319fff";
  const endColor = "#319fff";
  const defaultColor = "#012241";

  const mapRef = useRef<SVGSVGElement>(null);
  const colors = interpolateColors(1, startColor, endColor);

  if (animate && data) {
    // we want to animate the data based on the other props

    useEffect(() => {
      resetMap();
      const clearTimeouts = loadMap(data, 200, colors, updateCount);
      return () => {
        clearTimeouts();
        updateCount && updateCount(total);
      };
    }, [reload, data]);

    const resetMap = () => {
      updateCount && updateCount(0);
      (
        mapRef.current?.querySelectorAll(
          "svg > g > path"
        ) as NodeListOf<SVGPathElement>
      ).forEach((state: SVGPathElement) => {
        state.style.fill = defaultColor;
      });
    };
  } else {
    useEffect(() => {
      refreshMap(visits!, currentDate!, todayColor, otherColor);
    }, [currentDate]);
  }

  // Hover label effect

  const placesMap = new Map(
    places!.map((place: PlaceInput) => [place.place_id, place.label])
  );

  const [hoverInfo, setHoverInfo] = useState<{
    x: number;
    y: number;
    label: string | null;
  }>({ x: 0, y: 0, label: null });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const target = event.target as SVGPathElement;
      const placeID = target.id;
      if (target.tagName === "path" && placeIDs.has(placeID)) {
        const placeLabel = placesMap.get(placeID);
        setHoverInfo({
          x: event.clientX,
          y: event.clientY,
          label: placeLabel!,
        });
      } else {
        setHoverInfo({ x: 0, y: 0, label: null });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const placeIDs = new Set(places?.map((place) => place.place_id));

  return (
    <>
      {hoverInfo.label && (
        <div
          className={styles.hoverLabel}
          style={{
            top: hoverInfo.y + 10,
            left: hoverInfo.x + 10,
          }}
        >
          {hoverInfo.label}
        </div>
      )}
      <svg
        ref={mapRef}
        xmlns="http://www.w3.org/2000/svg"
        id={styles.map}
        viewBox="0 0 1000 700"
        version="1.1"
        {...(!animate && {
          onClick: handleMapClick(placeIDs!, visits!, setVisits!, currentDate!),
        })}
      >
        <g id="ID_group">
          <path
            id="ID"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m182.03 213.35 7.61-30.45 1.22-4.24 2.25-4.8-.69-1.22-2.25-.05-1.13-1.5.4-1.1.31-2.74 1.42-1.98 2.68-3.24 1.62-.97 1.03-1.03 1.2-2.56 3.44-5.17 3.45-3.86.2-3.35-3.04-2.34-1.38-3.9 12.14-56.31 12.07 2.26-3.93 19 3.19 6.65-1.42 4.15 1.75 4.1 2.8 1.14 3.42 8.49 3.12 3.93.45 1.03 2.98 1 .33 1.89-6.21 15.44-.14 2.28 2.35 2.94.82-.04 4.36-2.7.62-.96 1.37.59-.24 4.75 2.44 11.2 3.5 2.8 1.5 1.94-.32 3.14.63 2.99.95.97 2.2-2.09 2.55.04 2.6 1.18 2.47-.61 3.4-.14 3.54 1.44 2.44-.28.44-2.7 2.62-.68 1.13 1.34.38 2.63 1.27 1.08-7.8 47.43s-35.39-6.53-41.61-7.88Z"
            className="state id"
          />
          {/* <text id="ID_label" x="221.97" y="191.12" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="ID_tspan" x="221.97" y="191.12" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">ID</tspan>
    </text> */}
        </g>
        <g id="HI_group">
          <path
            id="HI"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m257.21 518.95 1.75-3.16 2-.3.29.71-1.85 2.74h-2.18Zm9.08-3.29 5.48 2.28 1.86-.29 1.44-3.44-.57-3.02-3.73-.4-3.6 1.56-.87 3.31Zm27.37 8.9 3.3 4.88 2.16-.29 1.01-.43 1.3 1.15 3.31-.14.86-1.3-2.58-1.58-1.73-3.3-1.87-3.17-5.18 2.6Zm18 7.9 1.15-1.72 4.18.86.57-.43 5.47.57-.29 1.15-2.3 1.3-3.9-.3-4.89-1.43Zm4.76 4.6 1.72 3.44 2.75-1 .3-1.44-1.45-1.85-3.31-.3v1.15Zm6.19-1 2.01-2.6 4.18 2.16 3.88 1.01 3.89 2.43v1.73l-3.17 1.58-4.31.86-2.16-1.28-4.33-5.88Zm14.83 13.79 1.44-1.15 3.03 1.43 6.77 3.17 3.02 1.88 1.44 2.15 1.73 3.87 3.59 2.3-.29 1.16-3.45 2.87-3.75 1.3-1.3-.58-2.74 1.58-2.16 2.88-2.02 2.58-1.6-.14-3.16-2.3-.28-4.03.56-2.15-1.44-5.03-1.88-1.59-.14-2.29 2.01-.86 1.88-2.72.43-.86-1.43-1.57-.31-1.87Z"
            className="state hi"
          />
          {/* <text id="HI_label" x="312.49" y="557.84" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="HI_tspan" x="312.49" y="557.84" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">HI</tspan>
    </text> */}
        </g>
        <g id="AK_group">
          <path
            id="AK"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m190.38 460.6-.29 75.9 1.44.85 2.74.14 1.29-1h2.3l.15 2.56 6.2 6.06.42 2.3 3.01-1.73.59-.16.29-2.73 1.29-1.44 1-.15 1.73-1.3 2.74 1.85.58 2.6 1.72 1 1.03 2.17 3.45 1.59 3.03 5.32 2.47 3.45 2 2.42 1.3 3.3 4.46 1.59 4.62 1.87.85 3.88.41 2.73-.85 3.02-1.58 2.01-1.44-.72-1.3-2.73-2.45-1.3-1.58-1-.72.72 1.3 2.45.14 3.3-1 .43-1.75-1.72-1.85-1.15.41 1.44 1.16 1.58-.72.72s-.72-.3-1.16-.87a62.77 62.77 0 0 1-1.87-3.02l-.86-2s-.29 1.14-.86.85c-.58-.28-1.15-1.29-1.15-1.29l1.58-1.72-1.3-1.3v-4.46h-.71l-.72 3.02-1 .43-.87-3.3-.58-3.3-.72-.44.28 5.03v1l-1.28-1.14-3.16-5.32-1.88-.43-.58-3.3-1.44-2.58-1.43-1.02v-2l1.86-1.17-.43-.28-2.3.56-3.03-2.16-2.3-2.58-4.32-2.3-3.61-2.31 1.15-2.88V539l-1.59 1.44-2.56 1-3.33-1-5.03-2.16h-4.91l-.58.43-5.75-3.44-1.88-.28-2.46-5.18-3.16.29-3.19 1.3.44 4.02 1.03-2.59.85.29-1.3 3.88 2.9-2.44.57 1.43-3.46 3.87-1.13-.3-.44-1.72-1.15-.72-1.15 1-2.47-1.55-2.72 1.85-1.58 1.88-3.03 1.88-4.19-.15-.43-1.88 3.32-.57v-1.13l-2.03-.59.88-2.15 2.02-3.44v-1.59l.14-.71 3.9-2.02.87 1.15h2.44l-1.15-2.3-3.32-.29-4.45 2.45-2.16 3.02-1.59 2.3-1 2.01-3.76 1.28-2.73 2.3-.3 1.44 2.02.86.72 1.86-2.45 2.88-5.77 3.74-6.92 3.73-1.87 1-4.75 1.03-4.77 2 1.6 1.13-1.3 1.3-.43 1.01-2.45-.86-2.87.14-.72 2.02h-.87l.27-2.16-3.16 1.15-2.6.86-3.03-1.15-2.6 1.73h-2.87l-1.89 1.15-1.44.72-1.87-.3-2.3-1-2.03.58-.86.86-1.44-1v-1.73l2.72-1.15 5.62.57 3.9-1.43L93.1 559l2.6-.59 1.59-.72 2.44.15 1.44 1.13.87-.28 2.02-2.45 2.72-.86 3.03-.56 1.15-.29.57.43h.72l1.16-3.32 3.6-1.29 1.74-3.29 2.01-4.03 1.44-1.3.29-2.29-1.44 1.15-3.03.57-.58-2.16-1.15-.29-.86.87-.14 2.6-1.3-.15-1.29-5.17-1.15 1.13-1-.42-.3-1.72-3.59.14-1.87 1.01-2.32-.29 1.3-1.3.44-2.3-.57-1.72 1.29-.86 1.15-.14-.58-1.59v-3.88l-.87-.86-.72 1.3h-5.47l-1.3-1.16-.57-3.45-1.88-3.16v-.86l1.88-.72.14-1.85 1.01-1.03-.72-.4-1.15.4-1.03-2.43.88-4.47 4.03-2.87 2.31-1.44 1.73-3.3 2.46-1.16 2.3 1.03.3 2.16 2.15-.31 2.87-2.16 1.44.59.87.57h1.44l2.02-1.15.72-3.87s.3-2.57.87-3c.57-.44.86-.87.86-.87l-1-1.73-2.3.72-2.88.72-1.75-.43-3.16-1.58-4.47-.15-3.16-3.3.4-3.45.6-2.16-1.88-1.58-1.74-3.3.44-.73 6.06-.43h1.87l.86.86h.58l-.15-1.43 3.46-.57 2.3.31 1.3.99-1.3 1.87-.43 1.29 2.45 1.44 4.46 1.58 1.6-.86-2.03-3.89-.86-2.87.86-.72-3.02-1.72-.43-1.02.43-1.44-.72-3.44-2.6-4.17-2.15-3.75 2.57-1.72h2.9l1.57.57 3.75-.14 3.32-3.19 1-2.7 3.33-2.16 1.44.86 2.47-.58 3.28-1.86 1.03-.15.86.72 4.03-.14 2.46-2.74h1l3.16 2.16 1.75 1.87-.44 1 .57 1.01 1.44-1.43 3.46.28.29 3.31 1.72 1.28 6.35.59 5.62 3.74 1.29-.86 4.62 2.3 1.88-.56 1.73-.72 4.33 1.73 3.88 2.58ZM87.83 486.34l1.87 4.74-.14.87-2.6-.29-1.57-3.6-1.6-1.29h-2.15l-.14-2.3 1.59-2.16 1.02 2.16 1.3 1.3 2.44.57Zm-2.3 29.74 3.3.72 3.32.86.72.86-1.43 3.31-2.75-.14-3.02-3.17Zm-18.44-12.49 1.02 2.3 1 1.43-1 .72-1.88-2.73v-1.73h.87Zm-12.23 64.96 3.02-2.02 3.02-.86 2.33.29.43 1.44 1.72.43 1.73-1.73-.3-1.43 2.47-.58 2.57 2.3-1 1.58-3.9 1-2.44-.42-3.32-1-3.9 1.28-1.44.3-1-.58Zm43.64-4.03 1.44 1.73 1.88-1.44-1.3-1.15Zm2.59 2.73 1.03-2.01 1.84.29-.72 1.72Zm21.03-1.72 1.3 1.58.87-1-.72-1.73-1.44 1.15Zm7.78-11.06 1.01 5.16 2.59.72 4.47-2.57 3.9-2.3-1.46-2.16.44-2.16-1.88 1.16-2.59-.72 1.44-1 1.75.71 3.45-1.58.43-1.28-2.16-.72.72-1.72-2.46 1.72-4.16 3.16-4.31 2.6-1.17 1Zm37.73-17.67 2.16-1.3-.85-1.58-1.58.86.28 2.01Z"
            className="state ak"
          />
          {/* <text id="AK_label" x="152.25" y="499.24" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="AK_tspan" x="152.25" y="499.24" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">AK</tspan>
    </text> */}
        </g>
        <g id="FL_group">
          <path
            id="FL"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m726.51 447.69 2.03 6.5 3.31 8.67 4.76 8.34 3.32 5.6 4.31 4.9 3.6 3.3 1.43 2.57-1 1.16-.71 1.15 2.58 6.6 2.6 2.6 2.31 4.74 3.19 5.17 4.02 7.33 1.15 6.74.41 10.64.59 1.58-.29 3.01-2.16 1.15.28 1.73-.57 1.72.3 2.16.42 1.73-2.45 2.87-2.73 1.3-3.46.14-1.3 1.44-2.16.86-1.16-.43-1-.86-.3-2.6-.71-3.01-3.03-4.6-3.19-2.01-3.45-.3-.72 1.16-2.73-3.88-.58-3.16-2.3-3.6-1.58-1-1.43 1.87-1.6-.29-1.86-4.46-2.6-3.45-2.59-4.76-2.29-2.73-3.18-3.29 1.88-2.15 2.87-4.9-.13-1.43-4.04-.86-1.44.57.3.58 2.3.86-1.3 4.03-.72.43-1.58-3.6-1.16-4.3-.3-2.45 1.31-4.17v-8.47l-2.74-3.3-1.15-2.73-4.62-1.15-1.71-.57-1.44-2.3-3.03-1.44-1-3-2.46-.86-2.16-3.3-3.74-1.3-2.6-1.3h-2.3l-3.59.73-.15 1.72.71.86-.43 1.01-2.74-.14-3.32 3.15-3.18 1.73h-3.44l-2.87 1.16-.31-2.45-1.44-1.71-2.59-1.01-1.44-1.3-7.18-3.44-6.78-1.59-3.9.58-5.32.43-5.34 1.87-3.09.54-.2-7.15-2.32-1.73-1.58-1.58.28-2.73 9.08-1.15 22.76-2.59 6.06-.56 4.83.24 2.3 3.45 1.3 1.28 7.23.44 9.63-.58 19.17-1.15 4.83-.6 4.56.2.38 2.56 2 .72.2-4.11-1.35-3.7 1.17-1.4 4.94.53 4.63.28Zm11.18 117.68 2.15-.56 1.16-.2 1.3-2.1 2.1-1.44 1.14.43 1.51.29.36.92-3.08 1.1-3.76 1.29-2.08 1.07-.8-.79Zm12.03-4.44 1.08.92 2.45-1.85 4.75-3.73 3.32-3.46 2.23-5.89.86-1.51.14-3.02-.63.41-.87 2.53-1.3 4.1-2.87 4.67-3.9 3.73-3.02 1.72-2.23 1.38Z"
            className="state fl"
          />
          {/* <text id="FL_label" x="733.7" y="499.4" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="FL_tspan" x="733.7" y="499.4" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">FL</tspan>
    </text> */}
        </g>
        <g id="NH_group">
          <path
            id="NH"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m834.3 183.93.78-.96.96-2.92-2.26-.83-.43-2.72-3.45-1-.3-2.45-6.46-20.84-4.1-12.91h-.8l-.58 1.43-.58-.44-.87-.86-1.29 1.73-.04 4.47.29 5.04 1.73 2.44v3.6l-3.31 4.5-2.31 1v1l1 1.59v7.62l-.71 8.18-.16 4.31.87 1.13-.14 4.04-.44 1.58.88.62 14.95-3.93 1.96-.53 1.64-2.46 3.18-1.44Z"
            className="state nh"
          />
          {/* <text id="NH_label" x="820.85" y="178.94" stroke-width=".71" font-size="8.48">
      <tspan id="NH_tspan" x="820.85" y="178.94" fill="#000" stroke-width=".71" dy="0" font-family="Arial" font-size="10.6" font-style="normal" font-weight="400" style="text-align:center" text-anchor="middle">NH</tspan>
    </text> */}
        </g>
        <g id="VT_group">
          <path
            id="VT"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m801.95 194.27.28-4.75-2.57-9.59-.58-.28-2.59-1.15.72-2.6-.72-1.86-2.4-4.1.87-3.47-.72-4.6-2.16-5.75-.71-4.38 23.54-5.98.27 4.9 1.7 2.44v3.6l-3.3 4.5-2.3 1v1l1.15 1.35-.28 7.19-.54 8.23-.2 4.93.86 1.15-.14 4.07-.43 1.5.92.65-6.64 1.33-4 .65Z"
            className="state vt"
          />
          {/* <path id="VT_line" stroke="#000" stroke-opacity="1" d="m796.38 130.24 7.83 25.84-7.82-25.83Z" style="stroke-width:1.02694" />
    <text id="VT_label" x="796.14" y="126.47" stroke-width=".67" font-size="8.1">
      <tspan id="VT_tspan" x="796.14" y="126.47" fill="#000" stroke-width=".67" dy="0" font-family="Arial" font-size="10.12" font-style="normal" font-weight="400" style="text-align:center" text-anchor="middle">VT</tspan>
    </text> */}
        </g>
        <g id="ME_group">
          <path
            id="ME"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m871.75 127.42 1.75 1.84 2.01 3.31v1.73l-1.88 4.17-1.72.57-3.03 2.73-4.31 4.89h-1.16c-.58 0-.87-1.87-.87-1.87l-1.58.14-.87 1.3-2.16 1.3-.87 1.29 1.44 1.3-.43.57-.44 2.43-1.72-.14v-1.43l-.29-1.15-1.3.29-1.58-2.88-1.88 1.15 1.15 1.3.27 1-.71 1.15.28 2.73.15 1.44-1.44 2.29-2.6.43-.29 2.59-4.76 2.73-1.15.43-1.44-1.3-2.74 3.16.86 2.88-1.28 1.15-.15 3.86-1 5.56-2.18-1.02-.43-2.73-3.46-1.01-.28-2.44-6.47-20.85-4.21-13 1.27-.1 1.36.35v-2.29l1.15-4 2.31-4.16 1.3-3.6-1.75-2.15v-5.29l.74-.87.72-2.45-.15-1.3-.13-4.3 1.58-4.3 2.6-7.9 1.88-3.74H833l1.15.14v1l1.15 2.02 2.46.58.72-.72v-.87l3.6-2.58 1.58-1.58 1.3.14 5.33 2.16 1.72.86 8.06 26.6h5.34l.72 1.71.13 4.31 2.59 2.02h.72l.15-.43-.44-1 2.46-.14Zm-18.63 26.78 1.36-1.37 1.23.93.5 2.15-1.51.8-1.6-2.51Zm5.97-5.24 1.58 1.64s1.16.08 1.16-.2c0-.31.21-1.8.21-1.8l.82-.73-.74-1.57-1.78.64-1.24 2Z"
            className="state me"
          />
          {/* <text id="ME_label" x="843.99" y="136.49" stroke-width=".93" font-size="11.12">
      <tspan id="ME_tspan" x="843.99" y="136.49" fill="#000" stroke-width=".93" dy="0" font-family="Arial" font-size="13.9" font-style="normal" font-weight="400" style="text-align:center" text-anchor="middle">ME</tspan>
    </text> */}
        </g>
        <g id="RI_group">
          <path
            id="RI"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m828.32 216.35-3.3-13.29 5.59-1.64 1.95 1.71 2.94 3.84 2.4 3.9-2.67 1.44-1.15-.13-1.01 1.58-2.16 1.73-2.58.86Z"
            className="state ri"
          />
          {/* <path id="RI_line" stroke="#000" stroke-opacity="1" d="m831.53 209.25 15.36 17-15.38-17Z" style="stroke-width:1.02694" /> */}
          {/* <text id="RI_label" x="854.54" y="235.14" stroke-width=".8" font-size="9.59">
      <tspan id="RI_tspan" x="854.54" y="235.14" fill="#000" stroke-width=".8" dy="0" font-family="Arial" font-size="11.99" font-style="normal" font-weight="400" style="text-align:center" text-anchor="middle">RI</tspan>
    </text> */}
        </g>
        <g id="NY_group">
          <path
            id="NY"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m789.4 225.1-1.03-.85-2.3-.16-2.02-1.72-1.43-5.45-3.08.08-2.2-2.4-17.26 3.9-38.31 7.75-6.72 1.09-.64-5.75 1.26-.99 1.16-1 .86-1.44 1.58-1.01 1.75-1.58.41-1.44 1.9-2.44 1-.87-.15-.86-1.15-2.73-1.59-.14-1.71-5.45 2.6-1.59 3.88-1.3 3.6-1.14 2.87-.43 5.62-.15 1.75 1.13 1.44.16 1.85-1.15 2.32-1.01 4.62-.43 1.85-1.58 1.59-2.88 1.44-1.75h1.88l1.72-1 .14-2-1.29-1.87-.29-1.3 1-1.87v-1.29h-1.57l-1.6-.72-.71-1-.15-2.3 5.18-4.9.57-.71 1.3-2.6 2.6-4.02 2.43-3.28 1.88-2.16 2.16-1.64 2.74-1.1 4.9-1.15 2.87.15 4.04-1.3 6.73-1.84.47 4.42 2.15 5.75.72 4.6-.85 3.45 2.3 4.02.72 1.87-.72 2.6 2.57 1.14.6.29 2.72 9.75-.47 4.52-.44 9.63.72 4.87.72 3.17 1.3 6.47v7.18l-1 2 1.64 1.78.7 1.5-1.73 1.57.29 1.15 1.15-.3 1.3-1.13 2.03-2.31 1-.58 1.44.57 2.02.14 7.06-3.46 2.57-2.44 1.17-1.29 3.74 1.44-3.02 3.15-3.46 2.59-6.34 4.72-2.3.88-5.19 1.72-3.6 1-1.04-.45-.2-3.3.4-2.42-.13-1.87-2.5-1.51-4.03-.88-3.45-1-3.32-1.58Z"
            className="state ny"
          />
          {/* <text id="NY_label" x="776.82" y="197.83" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="NY_tspan" x="776.82" y="197.83" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">NY</tspan>
    </text> */}
        </g>
        <g id="PA_group">
          <path
            id="PA"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m784.7 257.07 1.17-.25 2.08-1.1 1.06-2.22 1.44-2 2.88-2.73v-.72l-2.16-1.44-3.16-2.15-.88-2.3-2.43-.3-.14-1-.72-2.44 2-1 .14-2.17-1.16-1.15.15-1.43 1.74-2.73v-2.73l2.4-2.36-.82-.6-2.24-.17-2.06-1.72-1.37-5.45-3.12.1-2.18-2.4-16.13 3.72-38.3 7.76-7.93 1.29-.55-5.8-4.78 4.51-1.15.41-3.74 2.67 2.6 17.03 2.2 8.65 3.18 17.12 2.92-.57 10.64-1.33 33.78-6.81 13.25-2.53 7.4-1.44.24-.2 1.88-1.44 1.88-.61Z"
            className="state pa"
          />
          {/* <text id="PA_label" x="743.06" y="249.71" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="PA_tspan" x="743.06" y="249.71" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">PA</tspan>
    </text> */}
        </g>
        <g id="VA_group">
          <path
            id="VA"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m790.5 293.84-.12-1.74 5.75-2.26-.69 2.87-2.6 3.35-.39 4.08.42 3-1.65 4.42-1.92 1.7-1.31-4.12.4-4.85 1.42-3.72.67-2.75Zm2.98 25.16-51.83 11.17-33.33 4.7-5.96-.31-2.3 1.7-6.54.2-7.47.86-9.72 1.44 9.31-5v-1.85l1.34-1.9 9.41-10.23 3.52 3.99 3.37.85 2.25-1 2-1.18 2.27 1.2 3.49-1.26 1.66-4.06 2.31.48 2.55-1.9 1.6.44 2.54-3.27.3-1.85-.86-1.13.9-1.66 4.7-10.92.54-5.08 1.11-.47 1.95 2.15 3.5-.25 1.72-6.74 2.49-.51.92-2.44 2.31-2.08 2.47-5.06.08-4.5 8.76 3.39c.61.3.74-4.5.74-4.5l3.25 1.44.06 2.6 5.16 1.16 1.9 1.02 1.48 1.85-.6 3.24-1.74 2.3.1 1.84.53 1.65 4.44 1.13 3.96.02 2.74.84 1.74.28.62 2.73 2.85.36.77 1.08-.38 4.17 1.23 1-.43 1.7 1.1.7-.2 1.24-2.4-.08.09 1.43 2.03 1.37.1 1.25 1.58 1.58.45 2.24-2.28 1.23 1.4 1.34 5.17-1.51 3.21 5.34Z"
            className="state va"
          />
          {/* <text id="VA_label" x="750.88" y="314.56" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="VA_tspan" x="750.88" y="314.56" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">VA</tspan>
    </text> */}
        </g>
        <g id="WV_group">
          <path
            id="WV"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m727.74 269.75.98 4.4.97 5.36 1.9-2.3 2.02-2.73 2.26-.53 1.3-1.3 1.59-2.3 1.29.58 2.59-.29 2.3-1.87 1.8-1.29 1.64-.43 1.16.9 3.24 1.62 1.73 1.59 1.23 1.15-.69 4.93-5.2-2.26-3.8-1.44-.07 4.6-2.45 4.93-2.26 2.16-1.06 2.44-2.36.44-.79 3.2-.92 3.5-3.54.3-2.08-2.15-.96.48-.56 4.87-1.21 3.15-4.42 9.74.8 1.02-.18 1.7-2.5 3.47-1.62-.48-2.63 1.92-2.26-.52-1.78 4.06s-2.91 1.26-3.5 1.21c-.15 0-2.2-1.1-2.2-1.1l-2.09 1.22-2.16.93-3.32-.8-1-1.02-1.95-2.7-2.8-1.77-1.51-3.22-3.82-3.08-.58-2.01-2.3-1.3-.72-1.44-.22-4.67 1.95-.08 1.72-.72.15-2.44 1.43-1.29.15-4.46.86-3.46 1.16-.58 1.13 1 .44 1.6 1.58-.86.44-1.44-1.03-1.57v-2.16l.87-1.15 2.02-3.02 1.15-1.28 1.87.43 2.03-1.44 2.73-3 2-3.46.29-5.03.44-4.46v-4.17l-1.03-2.73.88-1.28 1.16-1.15 3.1 17.62 4.14-.66 11.07-1.6Z"
            className="state wv"
          />
          {/* <text id="WV_label" x="712.16" y="302.38" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="WV_tspan" x="712.16" y="302.38" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">WV</tspan>
    </text> */}
        </g>
        <g id="OH_group">
          <path
            id="OH"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m704.7 229.19-5.44 3.59-3.45 2.01-3.03 3.3-3.6 3.46-2.87.72-2.6.43-4.9 2.3-1.88.14-3.03-2.73-4.62.58-2.29-1.3-2.12-1.2-4.36.64-9.06 1.44-9.99 1.95 1.15 12.99 1.59 12.22 2.32 20.85.51 4.28 3.66-.1 2.15-.72 3.01 1.33 1.85 3.87h4.57l1.68 1.88 1.57-.06 2.26-1.2 2.24.35 4.83.43 1.54-1.9 2.08-1.15 1.85-.62.58 2.47 1.58.85 3.1 2.1 1.95-.08 1.18-.44.17-2.46 1.41-1.28.1-4.26.91-3.65 1.16-.55 1.16 1.03.48 1.5 1.54-.93.38-1.29-1-1.7.07-2.05.67-.95 1.93-2.95.92-1.38 1.88.41 2.04-1.43 2.73-3.01 2.46-3.63.29-4.49.43-4.45-.15-4.73-.87-2.56.31-1.06 1.61-1.54-2.03-8.06-2.6-17.21Z"
            className="state oh"
          />
          {/* <text id="OH_label" x="673.46" y="274.01" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="OH_tspan" x="673.46" y="274.01" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">OH</tspan>
    </text> */}
        </g>
        <g id="IN_group">
          <path
            id="IN"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m601.57 323.97.05-2.54.43-4.02 2.01-2.57 1.6-3.45 2.3-3.74-.49-4.77-1.53-2.85-.29-2.87.72-4.89-.43-6.16-1.16-14.25-1.15-13.65-.85-10.4 2.74.78 1.3.85 1-.3 1.87-1.7 2.53-1.44 4.54-.15 19.58-2.01 4.97-.47 1.33 14.19 3.78 32.76.54 5.11-.33 2.02 1.09 1.6.1 1.2-2.26 1.45-3.15 1.36-2.86.5-.54 4.33-4.08 2.95-2.48 3.55.28 2.12-.5 1.35h-2.99l-1.4-1.44-2.23 1.13-2.4 1.34.15 2.7-1.07.25-.41-.9-1.93-1.34-2.9 1.19-1.38 2.67-1.28-.72-1.29-1.42-3.97.43-4.99.87-2.6 1.37Z"
            className="state in"
          />
          {/* <text id="IN_label" x="624.98" y="288.46" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="IN_tspan" x="624.98" y="288.46" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">IN</tspan>
    </text> */}
        </g>
        <g id="IL_group">
          <path
            id="IL"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m601.54 324.31.03-2.88.51-4.12 2.05-2.6 1.68-3.6 2-3.56-.34-4.67-1.53-2.85-.29-2.87.72-4.89-.43-6.16-1.16-14.25-1.15-13.65-.85-10.4-.45-.66-.72-2.3-1.16-3.3-1.44-1.58-1.3-2.31-.2-4.88-40.81 2.31.2 2.1 2.04.62.82 1 .41 1.65 3.46 3.04.62 2.02-.62 3.06-1.45 2.64-.65 2.59-1.99 1.46-1.4.5-5.1 1.78-.62 1.61-.62 1.83.62 1.23 1.64 1.42-.2 3.65-1.65 1.41-.61 1.44v2.42l-1.62.41-1.43 1.03-.2 1.21.2 1.85-1.52 1.16-.93 2.49.41 3.25 2.06 6.5 6.5 6.7 4.9 3.26-.21 3.86.82 1.24 5.7.4 2.44 1.22-.62 3.24-2.02 5.3-.62 2.83 2.03 3.45 5.72 4.68 4.08.62 1.83 4.45 1.85 2.85-.82 2.64 1.41 3.65 1.65 1.83 1.23-.77.82-1.85 1.97-1.54 1.9-.55 2.32 1.06 3.24 1.23 1.05-.28.19-2-1.15-2.14.28-2.11 1.64-1.2 2.69-.72 1.13-.41-.55-1.24-.7-2.1 1.27-.86 1.03-2.85Z"
            className="state il"
          />
          {/* <text id="IL_label" x="583.08" y="288.78" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="IL_tspan" x="583.08" y="288.78" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">IL</tspan>
    </text> */}
        </g>
        <g id="CT_group">
          <path
            id="CT"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m828.32 216.32-3.3-13.23-4.2.82-18.9 4.21.89 2.88 1.29 6.47.16 7.96-1.08 1.93 1.7 1.71 3.8-3.47 3.18-2.87 1.73-1.87.72.57 2.44-1.3 4.62-.99 6.93-2.83Z"
            className="state ct"
          />
          {/* <text id="CT_label" x="812.95" y="216.33" stroke-width=".68" font-size="8.16">
      <tspan id="CT_tspan" x="812.95" y="216.33" fill="#000" stroke-width=".68" dy="0" font-family="Arial" font-size="10.2" font-style="normal" font-weight="400" style="text-align:center" text-anchor="middle">CT</tspan>
    </text> */}
        </g>
        <g id="WI_group">
          <path
            id="WI"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m597.56 232.78-.07-2.81-1.06-4.03-.57-5.46-1-2.16.85-2.72.72-2.59 1.3-2.3-.57-3-.57-3.17.44-1.6 1.72-2.15.15-2.44-.72-1.15.56-2.3-.4-3.7 2.46-5.02 2.56-6.06.17-2-.29-.87-.72.43-3.74 5.61-2.46 3.6-1.72 1.59-.71 2.01-1.75.72-1 1.72-1.29-.28-.14-1.57 1.15-2.16 1.87-4.17 1.59-1.44.88-2.08-2.29-1.7-1.75-9.2-3.18-1.2-1.72-2.05-10.8-2.44-2.58-.9-7.3-1.92-7.06-1.03-3.36-4.56-.68.5-1.07-.15-.57-1-1.2.25-1 .14-1.58.86-.86-.58.57-1.72 1.73-2.74 1-1-1.72-1.3-1.87.72-2.6 1.73-6.61 2.87-2.59.57-2.6-.43-.86-.77-1.89 2.52-.2 2.45v7.51l-1.03 1.44-4.68 3.44-2.03 5.3.41.2 2.23 1.83.62 2.84-1.65 2.84V188l.41 5.9 2.65 2.65h3.06l1.63 2.84 3.08.41 3.45 5.08 6.31 3.66 1.85 2.45.82 6.6.6 2.95 2.05 1.42.19 1.23-1.83 3.04.2 2.83 2.24 3.45 2.24 1.03 2.65.41 1.2 1.21 40.35-2.36Z"
            className="state wi"
          />
          {/* <text id="WI_label" x="567.82" y="199.94" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="WI_tspan" x="567.82" y="199.94" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">WI</tspan>
    </text> */}
        </g>
        <g id="NC_group">
          <path
            id="NC"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m793.48 318.94 1.85 4.38 3.18 5.76 2.16 2.15.58 2-2.16.15.72.57-.29 3.74-2.3 1.15-.59 1.87-1.15 2.59-3.3 1.44-2.16-.3-1.3-.14-1.43-1.15.29 1.15v.87h1.71l.72 1.13-1.72 5.61h3.74l.58 1.44 2.01-2 1.13-.43-1.71 3.16-2.75 4.31h-1.15l-1-.4-2.45.56-4.62 2.15-5.75 4.75-3.03 4.16-1.72 5.75-.43 2.16-4.18.43-4.86 1.19-8.86-7.3L742 365.1l-2.59-.72-11.23 1.3-3.8.66-1.46-2.87-2.64-1.88-14.68.43-6.47.72-8.09 4.02-5.47 2.3-18.86 2.3.45-3.6 1.58-1.28 2.46-.58.57-3.32 3.75-2.44 3.46-1.3 3.74-3.17 3.9-1.87.57-2.73 3.46-3.45.58-.13s0 1 .72 1 1.71.3 1.71.3l2.03-3.17 1.87-.57 2 .28 1.45-3.15 2.6-2.3.43-1.87.16-3.25 3.8-.02 6.43-.76 14.03-2 13.48-1.85 19.28-4.2 17.8-3.8 9.96-2.15Zm3.8 29.52 2.31-2.22 2.82-2.3 1.36-.57.15-1.8-.58-5.47-1.3-2.09-.57-1.66.65-.2 2.43 4.87.36 3.96-.14 3-3.02 1.38-2.53 2.16-1 1.08-.93-.16Z"
            className="state nc"
          />
          {/* <text id="NC_label" x="748.49" y="351.58" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="NC_tspan" x="748.49" y="351.58" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">NC</tspan>
    </text> */}
        </g>
        <g id="MA_group">
          <path
            id="MA"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m851.08 211.34 1.93-.62.41-1.52.93.1.9 2.04-1.13.4-3.45.11Zm-8.36.72 2.06-2.35h1.41l1.65 1.32-2.16.92-1.92.9-1.03-.81Zm-31.01-19.56 15.73-4.13 2.03-.57 1.7-2.49 3.33-1.47 2.56 3.92-2.15 4.6-.29 1.3 1.73 2.3 1.02-.73h1.57l2.02 2.3 3.47 5.31 3.16.44 2.02-.87 1.59-1.57-.72-2.44-1.87-1.44-1.3.72-.87-1.15.43-.43 1.88-.15 1.57.72 1.73 2.16.87 2.59.29 2.15-3.74 1.29-3.47 1.74-3.45 4-1.75 1.31v-.86l2.18-1.3.43-1.58-.72-2.73-2.6 1.3-.71 1.29.43 2-1.85.9-2.47-4.03-3-3.88-1.85-1.61-5.83 1.67-4.52.92-18.43 4.1-.6-4.25.58-9.4 3.82-.8 6.06-1.15Z"
            className="state ma"
          />
          {/* <text id="MA_label" x="822.2" y="199.99" stroke-width=".67" font-size="7.98">
      <tspan id="MA_tspan" x="822.2" y="199.99" fill="#000" stroke-width=".67" dy="0" font-family="Arial" font-size="9.97" font-style="normal" font-weight="400" style="text-align:center" text-anchor="middle">MA</tspan>
    </text> */}
        </g>
        <g id="MO_group">
          <path
            id="MO"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m547.1 277.88-2.26-2.75-1-2.02-57.35 2.12-2.04.1 1.13 2.24-.2 2.04 2.23 3.45 2.75 3.65 2.77 2.45 1.91.2 1.34.83v2.62l-1.62 1.44-.42 2.02 1.83 3.04 2.26 2.64 2.23 1.63 1.23 10.37.27 32.06.2 4.16.42 4.78 19.97-.77 20.67-.61 18.54-.7 10.37-.2 1.95 3.03-.61 2.95-2.76 2.14-.51 1.64 4.8.41 3.47-.62 1.54-4.88.57-5.22 1.87-2.26 2.31-1.33.05-2.72.9-1.71-1.5-2.26-1.2.88-1.78-1.98-1.13-4.23.7-2.23-1.73-3.05-1.64-4.06-4.27-.72-6.2-4.97-1.55-3.66.72-2.84 1.85-5.39.41-2.56-1.74-.9-6.11-.73-.93-1.5-.1-3.77-4.88-3.05-6.21-6.88-2.06-6.53-.2-3.74.72-2.04Z"
            className="state mo"
          />
          {/* <text id="MO_label" x="530.96" y="322.2" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="MO_tspan" x="530.96" y="322.2" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">MO</tspan>
    </text> */}
        </g>
        <g id="GA_group">
          <path
            id="GA"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m648.5 373.35.03 1.97.14 1.87.59 3.02 3.02 7.04 2.15 8.76 1.3 5.46 1.45 4.32 1.29 6.18 1.89 5.59 2.3 3.02.43 3.01 1.73.72.14 1.87-1.58 4.32-.43 2.87-.15 1.73 1.44 3.87.29 4.72-.72 2.16.57.72 1.3.72-.14 2.48 2.3 3.45 1.3 1.28 7.23.44 19.05-.95 10.13-.55 4.45-.82 4.56.18.38 2.57 2 .72.2-4.11-1.35-3.7 1.17-1.4 4.94.53 4.69.46-.7-5.6 2.02-8.9 1.32-3.74-.44-2.3 2.98-5.54-.46-1.2-1.7.61-2.3-1.15-.58-1.87-1.15-3.16-2.01-1.87-2.31-.57-1.44-4.32-2.6-5.63-3.75-1.72-1.87-1.73-1.15-2.3-1.87-1.72-2.02-1.15-2.02-2.59-2.74-2.01-4.03-1.58-.43-1.29-2.16-2.59-.44-1.29-3.03-4.41-3.14.08-3.36-2.1-1.26-1.13-.29-1.59.78-1.72 1.98-.99-.55-1.85-37.37 4.2Z"
            className="state ga"
          />
          {/* <text id="GA_label" x="691" y="421.04" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="GA_tspan" x="691" y="421.04" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">GA</tspan>
    </text> */}
        </g>
        <g id="SC_group">
          <path
            id="SC"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m731.1 420.15-1.6.87-2.3-1.15-.58-1.87-1.15-3.17-2.02-1.86-2.32-.58-1.43-4.31-2.47-5.32-3.73-1.72-1.87-1.72-1.15-2.3-1.86-1.73-2.02-1.15-2.02-2.59-2.72-2-4.04-1.58-.43-1.28-2.16-2.6-.44-1.29-3.02-4.59-3.03.15-3.59-2.16-1.15-1.15-.29-1.58.72-1.73 2.01-.86-.45-2.03 5.14-2.08 8.1-4.08 6.95-.72 14.36-.37 2.34 1.66 1.5 2.98 3.83-.53 11.24-1.3 2.6.72 11.24 6.76 9 7.22-4.82 4.84-2.32 5.45-.44 5.61-1.43.72-1.01 2.45-2.16.57-1.88 3.19-2.44 2.42-2.01 3.02-1.44.72-3.18 3.02-2.57.14.85 2.88-4.48 4.88-1.87 1.15Z"
            className="state sc"
          />
          {/* <text id="SC_label" x="725.96" y="389.62" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="SC_tspan" x="725.96" y="389.62" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">SC</tspan>
    </text> */}
        </g>
        <g id="KY_group">
          <path
            id="KY"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m696.38 319.81-2.05 2.12-3.18 3.56-4.39 4.86-1.08 1.54-.05 1.85-3.9 1.93-5.03 3.02-6.45 1.6-46.21 4.35-14.05 1.59-4.13.45-3.44-.02-.2 3.74-7.3.13-6.19.57-7.12-.04 1.08-1.17 2.23-1.37.2-2.85.8-1.61-1.43-2.26.72-1.7 2.02-1.58 1.87-.57 2.46 1.15 3.16 1.15 1-.29.15-2.01-1.15-2.16.28-2 1.73-1.3 2.31-.57 1.44-.56-.72-1.59-.58-1.71 1.34-.88c0-.05 1.1-3.14 1.1-3.26l2.72-1.31 4.74-.87 4-.43 1.24 1.44 1.37.78 1.41-2.77 2.84-1.13 1.98 1.33.36.88 1.05-.24-.15-2.62 2.8-1.57 1.9-.96 1.37 1.48 2.96-.04.51-1.4-.3-2 2.3-3.56 4.25-3.05.61-4.31 2.62-.41 3.37-1.46 2.18-1.52-.19-1.39-1.02-1.3.51-2.66 3.74-.1 2.05-.67 2.98 1.27 1.83 3.87h4.57l1.82 1.97 1.43-.14 2.32-1.13 4.67.51 2.3.19 1.5-1.83 2.34-1.27 1.67-.62.58 2.5 1.82.95 2.37 1.85.1 5.03.72 1.42 2.3 1.37.7 2.06 3.7 3.04 1.62 3.22 2.18 1.48Z"
            className="state ky"
          />
          {/* <text id="KY_label" x="652.53" y="328.5" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="KY_tspan" x="652.53" y="328.5" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">KY</tspan>
    </text> */}
        </g>
        <g id="AL_group">
          <path
            id="AL"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m612.02 466.61-1.33-12.73-2.45-16.68.15-12.5.71-27.6-.14-14.79.14-5.7 39.46-3.24.05 1.97.16 1.87.57 3.02 3.04 7.04 2.16 8.76 1.3 5.47 1.43 4.3 1.3 6.17 1.85 5.62 2.31 3.02.43 3.02 1.75.71.13 1.87-1.58 4.32-.44 2.87-.14 1.72 1.43 3.9.3 4.72-.73 2.16.58.72 1.3.72.28 2.56-4.98-.3-6.06.57-22.75 2.59-9.28 1.25-.2 2.57 1.58 1.57 2.3 1.73.52 7.06-4.93 2.28-2.47-.29 2.47-1.72v-.85l-2.74-5.31-2.02-.58-1.29 3.88-1.15 2.45-.57-.15h-2.45Z"
            className="state al"
          />
          {/* <text id="AL_label" x="637.14" y="421.3" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="AL_tspan" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">AL</tspan>
    </text> */}
        </g>
        <g id="LA_group">
          <path
            id="LA"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m591.23 465.48-2.93-2.81.9-4.89-.6-.8-8.25.9-22.28.42-.62-2.14.82-7.52 2.94-5.29 4.49-7.72-.52-2.13 1.13-.61.41-1.73-2.05-1.82-.1-1.73-1.63-3.87-.14-5.63-49.43.82.03 8.5.62 8.34.62 3.45 2.23 3.66.82 4.47 3.86 4.88.2 2.84.62.62-.62 7.5-2.67 4.48 1.44 1.83-.62 2.24-.61 6.5-1.21 2.84.1 3.22 4.18-1.36 10.78.2 9.22 3.16 5.75 1 3.33-1.29 2.88 1 2.87.86.72-1.85-2.87-1.02-2.3.44-2.47-1.44s.16-1.15.74-1.3c.58-.14 2.73-.86 2.73-.86l1.58 1.3 1.6-.88 2.87.58 1.3 2.16.3 2.02 4.03.29 1.58 1.58-.72 1.44-1.15.71 1.44 1.44 7.5 3.15 3.16-1.15.86-2.15 2.31-.58 1.6-1.3 1.14.86.72 2.59-2.01.72.59.56 3.02-1.15 2.02-3.02.72-.44-1.87-.29.72-1.43-.15-1.3 1.87-.44 1-1.13.58.72s-.14 2.72.59 2.72c.72 0 3.74.58 3.74.58l3.6 1.74.85 1.29h2.6l1 .86 2.02-2.74v-1.3h-1.13l-3.04-2.44-5.18-.72-2.88-2.02 1-2.45 2 .29.15-.57-1.58-.87v-.43h2.88l1.59-2.72-1.15-1.72-.29-2.44-1.3.14-1.72 1.87-.57 2.3-2.74-.6-.86-1.56 1.6-1.73 1.7-3.08-.95-2.12-1.02-3.55Z"
            className="state la"
          />
          {/* <text id="LA_label" x="540.46" y="456.87" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="LA_tspan" x="540.46" y="456.87" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">LA</tspan>
    </text> */}
        </g>
        <g id="MS_group">
          <path
            id="MS"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m612.25 465.65-.24 1.13h-4.6l-1.31-.72-1.87-.3-6.06 1.74-1.57-.72-2.31 3.72-.98.7-1-2.22-1.03-3.46-3.06-2.84 1.02-4.93-.61-.82-1.65.2-7.04.79-21.87.32-.68-1.97.78-7.44 2.77-5.04 4.66-8.14-.4-2.16 1.1-.58.4-1.7-2.06-1.85-.1-1.91-1.65-3.66-.1-5.3 1.2-2.2-.21-3.06-1.58-2.74 1.34-1.31-1.39-2.22.41-1.47 1.4-5.81 2.23-1.82-.58-2.1 3.29-4.73 2.5-1.2-.2-1.48-.25-1.48 2.57-4.95 2.09-1.1.13-.79 33.27-3.45.17 5.59.14 14.79-.72 27.6-.14 12.5 2.46 16.67 1.3 11.9Z"
            className="state ms"
          />
          {/* <text id="MS_label" x="589.47" y="423.89" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="MS_tspan" x="589.47" y="423.89" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">MS</tspan>
    </text> */}
        </g>
        <g id="IA_group">
          <path
            id="IA"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m556.67 234.73.24 2.49 1.99.5.85 1.1.45 1.64 3.4 3 .6 2.13-.6 3.03-1.42 2.88-.71 2.43-1.94 1.44-1.52.5-4.97 1.64-1.23 3.43.64 1.23 1.64 1.49-.26 3.6-1.57 1.35-.68 1.46.1 2.46-1.67.41-1.43.98-.27 1.2.26 1.88-1.39 1-2.2-2.78-1.13-2.18-58.56 2.23-.82.16-1.83-4-.2-5.91-1.43-3.66-.61-4.68-2.06-3.25-.82-4.27-2.43-6.7-1.03-4.77-1.2-1.93-1.45-2.43 1.75-4.32 1.23-5.06-2.44-1.85-.41-2.42.82-2.23h1.52l73.63-1.13.76 3.73 2 1.38.22 1.28-1.81 3 .17 2.86 2.24 3.37 2.26 1.15 2.73.45.6.72Z"
            className="state ia"
          />
          {/* <text id="IA_label" x="516.12" y="250.37" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="IA_tspan" x="516.12" y="250.37" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">IA</tspan>
    </text> */}
        </g>
        <g id="MN_group">
          <path
            id="MN"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m472.96 171.84-.4-7.52-1.63-6.5-1.64-11.98-.41-8.73-1.63-3.06-1.43-4.47v-9.14l.61-3.46-1.62-4.85 26.85.05.28-7.34.58-.14 2 .43 1.72.72.72 4.89 1.3 5.46 1.45 1.44h4.3l.32 1.3 5.6.28v1.87h4.32l.3-1.15 1-1 2.01-.58 1.15.86h2.6l3.46 2.3 4.75 2.16 2.15.4.45-.83 1.29-.44.43 2.57 2.31 1.16.43-.43 1.15.16v1.86l2.3.87h2.8l1.43-.72 2.88-2.88 2.31-.4.72 1.56.43 1.15h.86l.86-.72 7.92-.28 1.58 2.73h.57l.64-.97 3.95-.34-.54 2.04-3.52 1.64-8.24 3.6-4.25 1.78-2.73 2.3-2.15 3.15-2.03 3.46-1.58.71-4.03 4.46-1.13.14-3.87 2.47-2.2 2.83-.2 2.85.09 7.15-1.24 1.5-4.52 3.32-1.99 5.32 2.57 2 .6 2.87-1.65 2.88.15 3.32.32 5.98 2.7 2.67h2.98l1.69 2.77 3 .46 3.45 5.04 6.31 3.66 1.91 2.57.6 5.7-72.35 1.04-.3-31.74-.42-2.62-3.65-3.05-1.03-1.63v-1.44l1.83-1.41 1.23-1.23.2-2.84Z"
            className="state mn"
          />
          {/* <text id="MN_label" x="499.41" y="179.01" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="MN_tspan" x="499.41" y="179.01" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">MN</tspan>
    </text> */}
        </g>
        <g id="OK_group">
          <path
            id="OK"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m388.42 342.5-14.86-1.12-.8 9.73 18.24 1.03 28.55 1.16-2.07 21.71-.41 15.85.2 1.43 3.87 3.24 1.85 1.03.62-.21.61-1.83 1.22 1.62h1.82v-1.23l2.45 1.23-.41 3.46 3.67.2 2.24 1.03 3.67.6 2.24 1.64 2.05-1.85 3.04.61 2.26 3.05h.82v2.03l2.03.61 2.03-2.05 1.64.62h2.23l.82 2.23 5.6 1.85 1.24-.61 1.62-3.65h1.03l1 1.83 3.67.61 3.29 1.22 2.64.82 1.62-.82.62-2.24h3.87l1.83.82 2.44-1.85h1.03l.61 1.44h3.66l1.44-1.83 1.61.41 1.85 2.23 2.85 1.62 2.85.82 1.74.99-.36-33.07-1.23-9.75-.13-7.89-1.28-5.81-.7-6.39-.05-3.39-10.83.29-41.35-.41-40.14-1.83-21.64-1.23Z"
            className="state ok"
          />
          {/* <text id="OK_label" x="460.6" y="377.95" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="OK_tspan" x="460.6" y="377.95" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">OK</tspan>
    </text> */}
        </g>
        <g id="TX_group">
          <path
            id="TX"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m371.6 351.19 20.22.95 27.7 1.03-2.08 20.84-.27 16.13.06 1.85 3.87 3.4 1.77 1.29 1.05-.5.33-1.62 1.02 1.6 1.88.05v-1.28l1.48.86 1.03.35-.31 3.53 3.63.1 2.6 1.06 3.53.47 2.12 1.85 1.9-1.85 3.32.53 1.98 2.88.95.28-.13 1.74 1.97.7 2.06-1.83 1.9.55 1.99.03.82 2.15 5.65 1.9 1.4-.68 1.34-3.72h.3l.81.07 1.09 1.83 3.51.6 2.98.99 3.05 1.06 1.64-.86.62-2.24 3.97.04 1.61.82 2.5-1.87.99.04.75 1.44h3.61l1.36-1.8 1.66.35 1.75 2.13 3.12 1.81 2.54.72 1.36.72 2.18 1.77 2.7-1.18 2.4 1.02.51 5.43-.04 8.62.62 8.48.62 3.2 2.39 3.93.8 4.4 3.77 4.93.17 2.79.67.7-.66 7.44-2.56 4.47 1.36 1.91-.56 2.1-.6 6.57-1.33 2.98.25 3.1-5.05 1.42-8.78 4.02-.87 1.73-2.3 1.71-1.87 1.3-1.15.72-5.03 4.75-2.47 1.85-4.75 2.87-5.06 2.16-5.61 3.03-1.58 1.3-5.18 3.16-3.02.57-3.46 4.89-3.6.29-.86 1.72 2.02 1.73-1.3 4.89-1.15 4.02-1 3.44-.72 4.03.71 2.15 1.59 6.16.87 5.48 1.58 2.44-.87 1.3-2.74 1.72-5.04-3.44-4.9-1.03-1.16.45-2.87-.58-3.75-2.73-4.62-1-6.76-3.02-1.87-3.46-1.16-5.75-2.87-1.72-.58-2 .58-.58.28-3.02-1.15-.57-.57-.87 1.15-3.88-1.44-2.01-2.87-1.15-3.03-3.88-3.19-5.89-3.73-2.3.14-1.74-4.75-10.92-.71-3.74-1.6-1.72-.14-1.29-5.34-4.74-2.29-2.73v-1.01l-2.31-1.87-6.06-1-6.61-.58-2.73-2.01-4.04 1.58-3.18 1.3-2 2.87-.87 3.3-3.9 5.47-2.16 2.15-2.3-.87-1.58-.99-1.73-.57-3.46-2.01v-.58l-1.58-1.72-4.62-1.87-6.62-6.9-2.03-4.17v-7.2l-2.87-5.74-.43-2.44-1.44-.85-1.03-1.87-4.44-1.87-1.16-1.43-6.34-7.04-1.15-2.87-4.17-2.02-1.3-3.88-2.3-2.59-1.74-.43-.56-4.16 7.11.62 25.88 2.43 25.86 1.44 2-17.31 3.46-49.4 1.44-16.66 1.21.03m88.24 204.16-.52-6.33-2.43-6.38-.51-6.27 1.37-7.3 2.94-6.12 3.1-4.8 2.8-3.17.59.2-4.24 5.91-3.9 5.81-1.8 5.9-.28 4.59.8 5.46 2.28 6.39.43 4.6.15 1.3-.8.2Z"
            className="state tx"
          />
          {/* <text id="TX_label" x="425.88" y="455.16" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="TX_tspan" x="425.88" y="455.16" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">TX</tspan>
    </text> */}
        </g>
        <g id="NM_group">
          <path
            id="NM"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m306.28 434.24-.7-4.2 7.7.45 26.89 2.61 24.3 1.5 1.97-16.63 3.44-49.67 1.54-17.23 1.4.1.72-9.92-92.66-9.44-15.58 107.05 13.76 1.76 1.16-8.9 26.04 2.51Z"
            className="state nm"
          />
          {/* <text id="NM_label" x="316.46" y="392.56" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="NM_tspan" x="316.46" y="392.56" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">NM</tspan>
    </text> */}
        </g>
        <g id="KS_group">
          <path
            id="KS"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m502.06 345.67-11.26.19-41.06-.42-39.7-1.81-21.94-1.13 3.47-57.4 19.68.6 35.9.73 39.47.89h4.54l1.95 1.92 1.8-.02 1.46.9-.06 2.67-1.65 1.54-.28 1.99 1.64 3.02 2.63 2.84 2.07 1.44 1.16 9.99.17 32.07Z"
            className="state ks"
          />
          {/* <text id="KS_label" x="440.85" y="318.86" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="KS_tspan" x="440.85" y="318.86" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">KS</tspan>
    </text> */}
        </g>
        <g id="WY_group">
          <path
            id="WY"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m370.64 184.69-95.1-11.97-12.57 78.64 100.91 12.06 6.74-78.74Z"
            className="state wy"
          />
          {/* <text id="WY_label" x="311.73" y="222.3" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="WY_tspan" x="311.73" y="222.3" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">WY</tspan>
    </text> */}
        </g>
        <g id="MT_group">
          <path
            id="MT"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m378.5 107.97-27.32-2.5-26.09-3.16-26.06-3.6L270.21 94l-16.4-3.03-29.17-6.16-3.99 18.98 3.05 6.7-1.23 4.07 1.65 4.06 2.85 1.24 4.1 9.55 2.41 2.83.41 1.03 3.06 1 .41 1.83-6.32 15.65v2.24l2.24 2.85h.82l4.27-2.65.62-1.03 1.41.62-.2 4.68 2.44 11.2 2.65 2.22.82.62 1.63 2.02-.42 3.05.62 3.06 1.03.82 2.02-2.05h2.44l2.88 1.44 2.23-.83h3.66l3.27 1.44 2.44-.4.42-2.66 2.63-.61 1.24 1.23.4 2.84 1.27.74 1.67-9.82 95.1 11.94L378.5 108Z"
            className="state mt"
          />
          {/* <text id="MT_label" x="304.23" y="144.89" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="MT_tspan" x="304.23" y="144.89" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">MT</tspan>
    </text> */}
        </g>
        <g id="CO_group">
          <path
            id="CO"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m388.14 342.64 4.37-76.74-101.03-11.24-10.88 78.18 107.54 9.81Z"
            className="state co"
          />
          {/* <text id="CO_label" x="336.78" y="305.42" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="CO_tspan" x="336.78" y="305.42" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">CO</tspan>
    </text> */}
        </g>
        <g id="UT_group">
          <path
            id="UT"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m280.75 332.99-74.62-10.56 18.35-100.04 41.67 7.77-1.32 9.45-2.05 11.7 6.94.83 14.63 1.6 7.3.77Z"
            className="state ut"
          />
          {/* <text id="UT_label" x="245.94" y="292.91" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="UT_tspan" x="245.94" y="292.91" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">UT</tspan>
    </text> */}
        </g>
        <g id="AZ_group">
          <path
            id="AZ"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m178.65 397.45-2.34 1.92-.29 1.3.44.86L193.3 411l10.81 6.75 13.1 7.62 15 8.92 10.93 2.15 22.24 2.4 15.37-105.9-74.6-10.6-2.76 14.6-1.44.01-1.52 2.34-2.25-.1-1.13-2.43-2.44-.31-.82-1.03h-.8l-.82.52-1.73.92-.1 6.2-.2 1.5-.52 11.2-1.33 1.92-.5 2.94 2.44 4.38 1.13 5.18.7.93.92.51-.1 2.02-1.44 1.24-3.05 1.52-1.73 1.72-1.33 3.25-.52 4.36-2.53 2.44-1.83.61.12.74-.4 1.52.4.72 3.26.51-.51 2.43-1.34 1.93-3.35.82Z"
            className="state az"
          />
          {/* <text id="AZ_label" x="226.7" y="389.06" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="AZ_tspan" x="226.7" y="389.06" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">AZ</tspan>
    </text> */}
        </g>
        <g id="NV_group">
          <path
            id="NV"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m224.53 222.28-21.06 114.5-1.64.34-1.4 2.13h-2.12l-1.3-2.43-2.34-.33-.68-.98-.93-.05-2.46 1.46-.28 6.04-.33 5.13-.3 7.63-1.3 1.87-2.15-.95L124.68 264l16.92-60.08 82.95 18.36Z"
            className="state nv"
          />
          {/* <text id="NV_label" x="170.81" y="273.58" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="NV_tspan" x="170.81" y="273.58" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">NV</tspan>
    </text> */}
        </g>
        <g id="OR_group">
          <path
            id="OR"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m182.06 213.37 7.88-30.94.92-3.77 2.1-5-.54-1.02-2.25-.05-1.13-1.5.4-1.3.45-2.87 3.96-4.89 1.62-.97 1.03-1.03 1.32-3.16 3.59-5.05 3.18-3.43.2-3.09-2.9-2.17-1.59-4.13-11.3-3.22-13.43-3.15-13.76.1-.39-1.23-4.89 1.85-3.97-.51-2.16-1.42-1.13.62-4.16-.2-1.54-1.24-4.67-1.83-.72.1-3.86-1.31-1.75 1.62-5.49-.3-5.3-3.66.62-.72.2-6.9-2.05-3.46-3.66-.52-.61-2.24-2.1-.4-5.16 1.82-2 5.75-2.88 8.9-2.9 5.76-4.45 12.5L91 157.79l-7.2 11.2-1.73 2.6-.72 7.61.34 10.75 100.33 23.41Z"
            className="state or"
          />
          {/* <text id="OR_label" x="136.32" y="174.01" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="OR_tspan" x="136.32" y="174.01" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">OR</tspan>
    </text> */}
        </g>
        <g id="WA_group">
          <path
            id="WA"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m140.5 64.1 3.87 1.29 8.65 2.44 7.63 1.73 17.87 5.03 20.44 5.03 13.57 2.85-12.15 56.52-11.09-3.13-13.81-3.19-13.59.03-.4-1.19-4.99 1.93-4.1-.65-1.9-1.41-1.18.58-4.2-.12-1.53-1.2-4.69-1.88-.65.13-3.9-1.35-1.7 1.61-5.58-.27-5.28-3.66.69-.82.1-6.83-2.03-3.42-3.67-.55-.61-2.24-2.02-.4-3.18 1.08-2.01-2.85.28-2.6 2.45-.28 1.44-3.6-2.3-1 .14-3.3 3.9-.58-2.46-2.44-1.3-6.32.58-2.6v-7.01l-1.54-2.88 2-8.32 1.88.43 2.16 2.6 2.46 2.28 2.88 1.73 4.02 1.87 2.73.57 2.6 1.3 3.02.85 2.02-.15v-2.13l1.15-1.03 1.85-1.13.31 1 .28 1.58-2.01.44-.28 1.87 1.58 1.3 1 2.15.58 1.75 1.32-.16.14-1.15-.86-1.15-.43-2.87.72-1.57-.58-1.3v-2l1.58-3.15-1-2.3-2.16-4.32.28-.72 1-.71Zm-8.42 5.3 1.78-.13.43 1.23 1.38-1.44h2.08l.72 1.36-1.37 1.5.58.72-.65 1.8-1.23.37s-.78.07-.78-.21c0-.3 1.28-2.31 1.28-2.31l-1.5-.5-.32 1.3-.63.58-1.37-2.02-.43-2.26Z"
            className="state wa"
          />
          {/* <text id="WA_label" x="159.53" y="108.73" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="WA_tspan" x="159.53" y="108.73" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">WA</tspan>
    </text> */}
        </g>
        <g id="CA_group">
          <path
            id="CA"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m178.47 397.07 3.49-.43 1.33-1.79.49-2.62-3.17-.51-.46-.62.41-1.8-.13-.5 1.71-.56 2.7-2.53.52-4.44 1.23-3.02 1.75-1.93 3.12-1.41 1.48-1.44.07-1.85-.9-.51-.9-.97-1.02-5.2-2.4-4.29.5-3.12-2.15-.92L124.6 264l16.84-60.08-59.77-13.96-1.34 4.2-.15 6.62-4.6 10.5-2.73 2.3-.29 1-1.58.72-1.3 3.74-.72 2.87 2.46 3.73 1.44 3.74 1 3.15-.3 5.75-1.57 2.74-.58 5.16-.87 3.3 1.6 3.46 2.44 4.02 2.03 4.32 1.16 3.6-.3 2.87-.28.4v1.89l5.03 5.6-.43 2.15-.57 2.01-.59 1.75.15 7.31 1.88 3.3 1.72 2.3 2.44.44.88 2.44-1 3.17-1.88 1.43h-1l-.72 3.44.43 2.6 2.87 3.88 1.44 4.76 1.3 4.17 1.17 2.72 3.03 5.17 1.29 2.3.43 2.58 1.44.87v2.15l-.72 1.73-1.58 6.32-.43 1.73 2.15 2.43 3.75.43 4.03 1.58 3.46 1.86h2.59l2.6 2.74 2.28 4.3 1.01 2.03 3.47 1.87 4.31.72 1.3 1.85.58 2.87-1.28.59.29.85 2.87.72 2.47.14 2.8-1.5 3.46 3.74.72 2.02 2.3 3.73.29 2.88v8.32l.43 1.59 8.93 1.3 17.57 2.44 12.34 1.2Zm-78.53-38.85 1.15 1.37-.15 1.15-2.87-.09-.51-1.07-.57-1.3 2.96-.06Zm1.72 0 1.1-.58 3.18 1.87 2.72 1.08-.78.58-4.04-.2-1.44-1.45-.72-1.29Zm18.45 17.6 1.59 2.09.72.87 1.37.51.52-1.3-.88-1.58-2.39-1.8-.92.13v1.08Zm-1.3 7.7 1.58 2.8 1.1 1.72-1.31.2-1.15-1.06s-.64-1.3-.64-1.64v-1.95l.43-.08Z"
            className="state ca"
          />
          {/* <text id="CA_label" x="119.57" y="314.66" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="CA_tspan" x="119.57" y="314.66" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">CA</tspan>
    </text> */}
        </g>
        <g id="TN_group">
          <path
            id="TN"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m670.27 340.23-46.24 4.45-14.04 1.59-4.11.46-3.46-.02-.2 3.64-7.3.24-6.18.59-6.78-.21-1.15 1.22-.7 5.18-1.34 4.84-.48 2.47-1.2 3.88-.3 2.3-2.99 1.86 1.9 2.86-.02 2.2.06 2.25 90.92-8.67.35-3.52 1.62-1.33 2.53-.66.62-3.29 3.63-2.4 3.62-1.34 3.64-3.17 3.95-1.8.48-2.73 3.62-3.53.48-.1s.03 1.03.75 1.03 1.72.3 1.72.3l2.03-3.18 1.84-.59 2.03.25 1.42-3.14 2.63-2.34.37-1.73.28-3.3-1.9-.18-2.33 1.8h-6.25l-16.33 2.14-7.2 1.7Z"
            className="state tn"
          />
          {/* <text id="TN_label" x="631.37" y="363.54" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="TN_tspan" x="631.37" y="363.54" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">TN</tspan>
    </text> */}
        </g>
        <g id="AR_group">
          <path
            id="AR"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m578.63 362.28-3.56.63-4.55-.56.37-1.44 2.67-2.26.82-3.26-1.62-2.65-69.86 2.23 1.42 6.1v7.32l1.23 9.75.2 33.63 2.04 1.75 2.64-1.23 2.44 1.03.62 5.83 49.55-1 1.02-1.86-.25-3.16-1.65-2.65 1.44-1.31-1.44-2.24.62-2.23 1.23-4.97 2.24-1.85-.62-2.01 3.3-4.78 2.42-1.23-.1-1.31-.3-1.63 2.54-4.99 2.14-1.13.05-3.03.01-2.2-1.89-2.85 3-1.86.29-2.3 1.2-3.88.36-2.41Z"
            className="state ar"
          />
          {/* <text id="AR_label" x="536.97" y="392.71" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="AR_tspan" x="536.97" y="392.71" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">AR</tspan>
    </text> */}
        </g>
        <g id="MD_group">
          <path
            id="MD"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m797.77 281.71-5.36 1.06-4.58.1-1.64-6.16-1.71-8.14-2.28-5.5-1.15-3.9-6.68 1.44-13.27 2.5-33.37 6.72 1.02 4.45.86 5.03.28-.28 1.88-2.15 2.02-2.32 2.15-.56 1.3-1.3 1.6-2.28 1.15.56 2.6-.3 2.3-1.86 1.78-1.29 1.65-.43 1.47 1 2.6 1.3 1.74 1.57 1.07 1.36 3.67 1.5v2.57l4.9 1.16 1.02.49 1.26-1.8 2.57 1.75-1.13 2.2-.69 3.55-1.58 2.3v1.85l.58 1.59 4.51 1.2 3.83-.05 2.76.86 1.87.3.86-1.87-1.3-1.87v-1.58l-2.15-1.85-1.88-4.9 1.15-4.74-.15-1.85-1.15-1.16s1.3-1.44 1.3-2c0-.58.45-1.87.45-1.87l1.73-1.15 1.72-1.44.43.86-1.3 1.44-1.14 3.3.29 1 1.58.3.43 4.89-1.87.86.29 3.15.43-.14 1-1.73 1.44 1.59-1.44 1.12-.28 3.03 2.3 3.02 3.46.41 1.44-.71 2.87 3.72 1.23.48 5.92-2.5 1.78-3.57-.38-4.38Zm-14.23 8.02 1 2.22.15 1.58 1.03 1.65s.78-.78.78-1.07c0-.29-.65-2.73-.65-2.73l-.66-2.08-1.64.43Z"
            className="state md"
          />
          {/* <path id="MD_line" stroke="#000" stroke-opacity="1" d="m767.28 267.76 42.83 29.74-42.83-29.75Z" style="stroke-width:1.02694" />
    <text id="MD_label" x="824.43" y="304.22" stroke-width=".86" font-size="10.31">
      <tspan id="MD_tspan" x="824.43" y="304.22" fill="#000" stroke-width=".86" dy="0" font-family="Arial" font-size="12.89" font-style="normal" font-weight="400" style="text-align:center" text-anchor="middle">MD</tspan>
    </text> */}
        </g>
        <g id="DE_group">
          <path
            id="DE"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m785.15 260.25.33-1.91.31-1.51-1.44.35-1.44.41-1.95 1.57 1.52 4.49 2.02 5.03 1.88 8.63 1.43 5.6 4.47-.15 5.47-1.05-2.02-6.57-.86.43-3.19-2.15-1.57-4.16-1.71-3.17-2.8-2.56-.78-1.85.33-1.44Z"
            className="state de"
          />
          {/* <path id="DE_line" stroke="#000" stroke-opacity="1" d="m816.78 272.85-23.98 4.17 23.98-4.18Z" style="stroke-width:1.02694" />
    <text id="DE_label" x="826.8" y="274.8" stroke-width=".87" font-size="10.49">
      <tspan id="DE_tspan" x="826.8" y="274.8" fill="#000" stroke-width=".87" dy="0" font-family="Arial" font-size="13.11" font-style="normal" font-weight="400" style="text-align:center" text-anchor="middle">DE</tspan>
    </text> */}
        </g>
        <g id="NJ_group">
          <path
            id="NJ"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m788.76 224.85-2.06 2.44v2.73l-1.74 2.74-.15 1.44 1.16 1.13-.14 2.15-2.02 1.03.72 2.43.14 1.01 2.46.29.86 2.3 3.18 2.15 2.16 1.44v.72l-2.67 2.4-1.44 2-1.3 2.45-2.02 1.16-.4 1.44-.21 1.07-.56 2.3.98 2 2.9 2.59 4.3 2.01 3.6.58.15 1.29-.71.86.28 2.45h.72l1.87-2.16.72-4.31 2.47-3.6 2.72-5.75 1.02-4.88-.58-1-.16-8.34-1.43-3.01-1.01.72-2.44.29-.44-.44 1.01-.86 1.87-1.72.06-.98-.35-3.06.52-2.44-.1-1.75-2.51-1.56-4.54-1.05-3.7-1.23-3.18-1.46Z"
            className="state nj"
          />
          {/* <path id="NJ_line" stroke="#000" stroke-opacity="1" d="m799.37 247.63 24.68.2-24.67-.2Z" style="stroke-width:1.02694" /> */}
          {/* <text id="NJ_label" x="833.64" y="251.13" stroke-width=".82" font-size="9.86">
      <tspan id="NJ_tspan" x="833.64" y="251.13" fill="#000" stroke-width=".82" dy="0" font-family="Arial" font-size="12.33" font-style="normal" font-weight="400" style="text-align:center" text-anchor="middle">NJ</tspan>
    </text> */}
        </g>
        <g id="MI_group">
          <path
            id="MI"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m578.12 123.77-2.01.5-4.8 3.46-1.92.72-1.64 1.83 1.44 1 1.85-.81 2.93-1.72 4.58-4.58-.4-.41Zm9.96 12.65-4.2.41-3.88 2.18-2.02 1.98-1.16 1.6-1.57.7-1.73 2.59-.15 1.16-3.9 1.85-2.16 1.74-5.32.87-.59.56v.86l-3.18 2.02-2.43.72-.64.51 3.34 4.58 7.01 1 7.33 1.93 2.54.92 10.78 2.47 1.85 2 3.16 1.23 1.73 9.14 1.23.9 1.03.93 2.83-6.22.89-3.59 1.72-3.88.72-.12 1 1.43h.57l4.03-2.17 1.3 1.43.41.17 1.15-1.03 1.03-2.72 2.16-.72 6.19-.6 1.72-2.28 4.62-.16 5.18 1.16h1.58l2.88-1.3 2.03.15 1.87-.56 3.32.4.72.32 1.16-.31-1.16-.85-1.16-.57-2.88-2.73v-6.18l-1.3-.44-1.01 1.02-5.47 1.44-1.72.41-2.59-.7-.44-.3v-5.02l-1.3-.14-2.3 1.15-4.03 1.72-5.91.27-3.01 1.03-3.6 3.16-1.46.86h-1l-1.13.72-1.46-.4-1.44-1.18-1.3.86-3.48.15-2.43-2.47-1.3-2.73-1.28-.97-2.88-.86h-2.02l-1.15-1.16-3.19 2.6-.85 1-.72-.44.27-2.28 2.16-2.88.45-2.16 2.02-.72 1.28-2.74 3.32-.85.3-.86-1.02-.99Zm59.26 20.61-1.95.2-1.44.17-.3 1 .88.42.57 2.26 2.87.13 1.16-1.07s-.08-1.31-.36-1.45a12.94 12.94 0 0 1-1.44-1.65Zm-14.48 8.27-2.6 1.56-2.59 2.02.31 3.15.85.28 1.87.45.41.72-2.28.72-2.3.28-1.31 1.58-.28 1.85.28 1.44.3 4.9-3.18 1.87-.57-.16v-3.75l1.16-2.15.56-2.16-.72-.72-1.71.72-.86 3.75-2.47.98-1.57 1.75-.14.85.56.74-.55 2.3-2.02.43v1l.72 2.16-1.02 5.47-1.42 3.6.56 4.15.44 1-.73 2.17-.27.71-.31 2.45 3.18 5.34 2.6 5.75 1.3 4.31-.72 4.15-.88 5.32-2.13 4.6-.31 2.44-2.9 2.73 3.9-.13 19.1-2 6.5-.9.1 1.49 6.1-1.06 9.16-1.37 3.45-.39.12-.55.15-1.27 1.87-3.31 1.77-1.54-.2-4.52 1.44-1.4.97-.3.2-3.17 1.34-2.7.95.53.14.6.72.14 1.75-.86-.3-8.5-2.87-7.32-2.02-8.05-2.16-2.86-2.32-1.6-1.44 1.03-3.45 1.58-1.74 4.45-2.44 3.31-1 .57-1.32-.58s-2.3-1.3-2.15-1.88c.13-.56.43-4.44.43-4.44l3.03-1.16.7-3 .6-2.32 2.13-1.43-.27-8.9-1.46-2.02-1.15-.72-.72-1.87.72-.72 1.44.31.16-1.46-2.15-2.02-1.17-2.28h-2.31l-4-1.3-4.9-3h-2.47l-.57.57-.86-.4-2.75-2.03Z"
          />
          {/* <text id="MI_label" x="638.34" y="222.11" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="MI_tspan" x="638.34" y="222.11" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">MI</tspan>
    </text> */}
        </g>
        <g id="DC_group">
          {/* <path id="DC_line" stroke="#000" stroke-opacity="1" d="m768.48 282.47 42.3 32.06Z" style="stroke-width:1.02694" /> */}
          {/* <text id="DC_label" x="822.95" y="324.13" stroke-width=".82" font-size="9.89">
      <tspan id="DC_tspan" x="822.95" y="324.13" fill="#000" stroke-width=".82" dy="0" font-family="Arial" font-size="12.36" font-style="normal" font-weight="400" style="text-align:center" text-anchor="middle">DC</tspan>
    </text> */}
          <path
            id="DC"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="M772.86 280.3a5.35 5.35 0 0 1-10.7 0 5.34 5.34 0 0 1 10.68 0Z"
          />
        </g>
        <g id="NE_group">
          <path
            id="NE"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m482.65 271.29 2.87 6.24-.12 2.06 3.08 4.88 2.42 2.79h-4.5l-38.73-.82-36.35-.8-19.82-.7 1.01-19.04-28.7-3.28 3.73-38.37 13.86.92 17.92 1.03 15.89 1 21.18 1.03 9.58-.41 1.84 2.02 4.27 2.64 1.02.82 3.86-1.23 3.47-.41 2.45-.2 1.62 1.23 3.62 1.43 2.65 1.41.4 1.42.83 1.83h1.62l.72.04.79 4.16 2.6 7.52.51 3.34 2.26 3.36.5 4.55 1.43 3.77.2 5.75Z"
            className="state ne"
          />
          {/* <text id="NE_label" x="431.51" y="261.25" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="NE_tspan" x="431.51" y="261.25" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">NE</tspan>
    </text> */}
        </g>
        <g id="SD_group">
          <path
            id="SD"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m474.05 238.68-.05-.5-2.57-4.32 1.65-4.18 1.33-5.24-2.48-1.85-.34-2.43.72-2.26h2.82l-.1-4.44-.31-26.82-.54-3.35-3.63-2.98-.88-1.48-.05-1.43 1.8-1.34 1.37-1.5.2-2.36-51.9-1.42-48.82-3.08-4.74 56.63 13 .82 17.76 1.06 15.82.82 21.19 1.15 10.65-.38 1.75 2 4.64 2.88.68.65 4.05-1.29 5.82-.54 1.5 1.19 3.75 1.43 2.62 1.44.35 1.34.93 1.98 2-.19Z"
            className="state sd"
          />
          {/* <text id="SD_label" x="424.5" y="203.51" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="SD_tspan" x="424.5" y="203.51" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">SD</tspan>
    </text> */}
        </g>
        <g id="ND_group">
          <path
            id="ND"
            fill="#d1dbdd"
            fillOpacity={1}
            stroke="#000"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeMiterlimit={4}
            strokeOpacity={1}
            strokeWidth=".82"
            d="m473.02 171.93-.54-7.5-1.5-6.05-1.68-11.59-.41-9.75-1.54-2.75-1.58-4.63.04-9.28.55-3.39-1.64-4.88-25.51-.48-16.57-.57-23.62-1.15-20.43-1.9-6.25 59.71 48.94 2.98 51.73 1.23Z"
            className="state nd"
          />
          {/* <text id="ND_label" x="424.8" y="149.27" style="font-size:12.3233px;stroke-width:1.02694">
      <tspan id="ND_tspan" x="424.8" y="149.27" fill="#000" dy="0" font-family="Arial" font-size="15.4" font-style="normal" font-weight="400" style="text-align:center;stroke-width:1.0546" text-anchor="middle">ND</tspan>
    </text> */}
        </g>
      </svg>
    </>
  );
}
