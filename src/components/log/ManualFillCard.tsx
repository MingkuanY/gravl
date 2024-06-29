"use client";

import {
  useEffect,
  useOptimistic,
  useRef,
  useState,
  useTransition,
} from "react";
import styles from "../../styles/manualfillcard.module.scss";
import Counties from "../maps/Counties";
import Countries from "../maps/Countries";
import NationalParks from "../maps/NationalParks";
import States from "../maps/States";
import { BasicTripInfo } from "./BasicTripInfoCard";
import { VisitInput } from "@/utils/types";
import { mapNames } from "../dashboard/MapLoader";
import Icon from "../icons/Icon";
import { addDays, formatMDYShortDate } from "@/utils/date";
import { PlaceInput } from "@/utils/types";
import { User } from "@prisma/client";
import CloseBtn from "./CloseBtn";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { addTripToUser } from "@/actions/actions";

export const sortVisits = (list: VisitInput[]) => {
  list.sort((a, b) => {
    if (a.date === b.date) {
      return a.order - b.order;
    }
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  return list;
};

export default function ManualFillCard({
  user,
  tripData,
  visits,
  setVisitsData,
  places,
  setLogTrip,
}: {
  user: User;
  tripData: BasicTripInfo;
  visits: VisitInput[];
  setVisitsData: Function;
  places: PlaceInput[];
  setLogTrip: Function;
}) {
  const placeIDs = new Set(places.map((place) => place.place_id));
  const placesMap = new Map(
    places.map((place) => [place.place_id, place.label])
  );

  // Tracks which day the user is logging

  const [dayCount, setDayCount] = useState(1);
  const getCurrentDate = () => {
    return addDays(tripData.start_date, dayCount - 1);
  };

  // Determines which map to display

  const [mapPopup, setMapPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        !popupRef.current?.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setMapPopup(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const [currentMap, setCurrentMap] = useState(0);
  /**
   * Renders the correct map based on the types index
   * @param {number} index the index in the types array that indicates which map should be rendered
   * @returns the map component to be rendered
   */
  const renderMap = (index: number) => {
    switch (index) {
      case 0:
        return (
          <Counties
            animate={false}
            placeIDs={placeIDs}
            visits={visits}
            setVisits={setVisitsData}
            currentDate={getCurrentDate()}
          />
        );
      case 1:
        return (
          <States
            animate={false}
            placeIDs={placeIDs}
            visits={visits}
            setVisits={setVisitsData}
            currentDate={getCurrentDate()}
          />
        );
      case 2:
        return (
          <Countries
            animate={false}
            placeIDs={placeIDs}
            visits={visits}
            setVisits={setVisitsData}
            currentDate={getCurrentDate()}
          />
        );
      case 3:
        return (
          <NationalParks
            animate={false}
            placeIDs={placeIDs}
            visits={visits}
            setVisits={setVisitsData}
            currentDate={getCurrentDate()}
          />
        );
    }
  };

  // Change dates

  const changeDate = (direction: number) => {
    setDayCount((dayCount) => Math.max(1, dayCount + direction));
  };

  // Handles the drag and drop to reorder visits

  const reorderVisits = (visit1: string, visit2: string) => {
    if (visit1 === visit2) {
      return visits;
    }
    const dragIndex = visits.findIndex(
      (visit) => visit.place_id === visit1 && visit.date === getCurrentDate()
    );
    const dropIndex = visits.findIndex(
      (visit) => visit.place_id === visit2 && visit.date === getCurrentDate()
    );

    const draggedVisit = visits[dragIndex];
    draggedVisit.order = dropIndex;

    if (dragIndex < dropIndex) {
      for (let i = dragIndex; i < dropIndex; i++) {
        visits[i] = visits[i + 1];
        visits[i].order--;
      }
    } else {
      for (let i = dragIndex; i > dropIndex; i--) {
        visits[i] = visits[i - 1];
        visits[i].order++;
      }
    }
    visits[dropIndex] = draggedVisit;

    return visits;
  };

  const [optimisticState, swapOptimistic] = useOptimistic(
    visits,
    (state, { sourceVisitId, destinationVisitId }) => {
      const sourceIndex = state.findIndex(
        (visit) => visit.place_id === sourceVisitId
      );
      const destinationIndex = state.findIndex(
        (visit) => visit.place_id === destinationVisitId
      );
      const newState = [...state];
      newState[sourceIndex] = state[destinationIndex];
      newState[destinationIndex] = state[sourceIndex];
      return newState;
    }
  );

  const [, startTransition] = useTransition();

  const onDragEnd = (result: any) => {
    const sourceVisitId = result.draggableId;
    if (result.destination) {
      const destinationVisitId = visits[result.destination.index].place_id;
      startTransition(() => {
        swapOptimistic({ sourceVisitId, destinationVisitId });
      });

      // reorder list
      setVisitsData(reorderVisits(sourceVisitId, destinationVisitId));
    }
  };

  /**
   * Checks that the user has at least one visit selected, updates the db with the new trip, and navigates the user back to dashboard.
   */
  const handleFinish = async () => {
    // maybe use useOptimistic after returning to dashboard to show the recently added trip's animation while updating db
    setLogTrip(-1);
    const newTrip = {
      trip_name: tripData.trip_name,
      description: tripData.description,
      visits: visits,
    };

    const addedTrip = await addTripToUser(user.id, newTrip);
  };

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => setLogTrip(0)}>
        <div className={styles.back_arrow}>
          <Icon type="back_arrow" fill="#fff" />
        </div>
        <p className={styles.back}>Back</p>
      </button>
      <CloseBtn setLogTrip={setLogTrip} />
      <div className={styles.leftSide}>
        <div className={styles.titleContainer}>
          <p className={styles.name}>{tripData.trip_name}</p>
          <p className={styles.dayCount}>Day {dayCount}</p>
        </div>

        <div
          className={`${styles.mapContainer} ${
            currentMap === 2 && styles.largeMapContainer
          }`}
        >
          {renderMap(currentMap)}
        </div>

        <div className={styles.mapPickerContainer}>
          <p className={styles.currentMapName}>{mapNames[currentMap]}</p>
          <button
            className={styles.popupButton}
            onClick={() => setMapPopup((mapPopup) => !mapPopup)}
            ref={buttonRef}
          >
            <div className={styles.mapIcon}>
              <Icon type="map" fill="#319fff" />
            </div>
          </button>

          {mapPopup && (
            <div className={styles.popupContainer} ref={popupRef}>
              {mapNames.map((map, index) => (
                <button
                  className={`${styles.mapNames} ${
                    index === currentMap && styles.selected
                  }`}
                  key={index}
                  onClick={() => {
                    if (index !== currentMap) {
                      setCurrentMap(index);
                      setMapPopup(false);
                    }
                  }}
                >
                  {map}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.rightSide}>
        <div className={styles.header}>
          <p className={styles.heading}>Visited on</p>

          <div className={styles.dateChanger}>
            <button
              className={`${styles.backDate} ${
                dayCount === 1 && styles.disabled
              }`}
              onClick={() => changeDate(-1)}
            >
              <div className={styles.back_arrow}>
                <Icon type="back_arrow" fill="#fff" />
              </div>
            </button>
            <p className={styles.currentDate}>
              {formatMDYShortDate(getCurrentDate())}
            </p>
            <button
              className={styles.forwardDate}
              onClick={() => changeDate(1)}
            >
              <div className={styles.forward_arrow}>
                <Icon type="back_arrow" fill="#fff" />
              </div>
            </button>
          </div>
        </div>

        <p className={styles.instruction}>
          {visits.filter((visit) => visit.date === getCurrentDate()).length > 0
            ? "Drag to reorder."
            : "Select a place on the map."}
        </p>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={"visits"}>
            {(droppableProvided) => (
              <div
                className={styles.visitedList}
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
              >
                {optimisticState
                  .filter((visit) => visit.date === getCurrentDate())
                  .map((visit) => {
                    const originalIndex = optimisticState.findIndex(
                      (v) =>
                        v.place_id === visit.place_id && v.date === visit.date
                    );
                    return (
                      <Draggable
                        key={visit.place_id}
                        draggableId={visit.place_id}
                        index={originalIndex}
                      >
                        {(provided) => (
                          <p
                            className={styles.visitedPlace}
                            key={visit.place_id}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {placesMap.get(visit.place_id)}
                          </p>
                        )}
                      </Draggable>
                    );
                  })}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <button
          className={`${styles.finish} ${
            !visits.length && styles.unselectable
          }`}
          onClick={handleFinish}
        >
          Finish
        </button>
      </div>
    </div>
  );
}
