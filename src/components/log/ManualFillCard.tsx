"use client";

import { useOptimistic, useState, useTransition } from "react";
import styles from "../../styles/manualfillcard.module.scss";
import Counties from "../maps/Counties";
import { BasicTripInfo } from "./BasicTripInfoCard";
import { VisitInput } from "@/utils/types";
import Icon from "../icons/Icon";
import { addDays, dayOfWeek, formatMDYDate } from "@/utils/date";
import { PlaceInput } from "@/utils/types";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { addDesignationToLabel } from "@/utils/map";
import ConfirmSelection from "../modals/ConfirmSelection";
import ToggleBtn from "./ToggleBtn";
import DirectionsInput from "./DirectionsInput";

/**
 * Sort visit chronologically by date and order if same date.
 *
 * @param list the visits to be sorted
 * @returns sorted visits
 */
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
  tripData,
  visits,
  setVisitsData,
  places,
  setLogTripPage,
  addTrip,
}: {
  tripData: BasicTripInfo;
  visits: VisitInput[];
  setVisitsData: Function;
  places: PlaceInput[];
  setLogTripPage: Function;
  addTrip: Function;
}) {
  const placesMap = new Map(
    places.map((place) => [place.fips_code, place.label])
  );

  // Tracks which day the user is logging

  const [dayCount, setDayCount] = useState(1);
  const getCurrentDate = () => {
    const currentDate = addDays(tripData.start_date, dayCount - 1);
    return currentDate;
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
      (visit) => visit.fips_code === visit1 && visit.date === getCurrentDate()
    );
    const dropIndex = visits.findIndex(
      (visit) => visit.fips_code === visit2 && visit.date === getCurrentDate()
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
        (visit) => visit.fips_code === sourceVisitId
      );
      const destinationIndex = state.findIndex(
        (visit) => visit.fips_code === destinationVisitId
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
      const destinationVisitId = visits[result.destination.index].fips_code;
      startTransition(() => {
        swapOptimistic({ sourceVisitId, destinationVisitId });
      });

      // reorder list
      setVisitsData(reorderVisits(sourceVisitId, destinationVisitId));
    }
  };

  const clearToday = () => {
    const newVisits = visits.filter((visit) => visit.date !== getCurrentDate());
    setVisitsData(newVisits);
  };

  const handleBack = () => {
    if (tripData.start_date === getCurrentDate()) {
      setLogTripPage(0);
    } else {
      changeDate(-1);
    }
  };

  const handleNext = () => {
    if (tripData.end_date === getCurrentDate()) {
      if (visits.length > 0) {
        setConfirmFinish(true);
      }
    } else {
      changeDate(1);
    }
  };

  /**
   * Checks that the user has at least one visit selected, navigates the user back to dashboard, and calls the function to update the db in the dashboard.
   */
  const handleAdd = async () => {
    if (visits) {
      setLogTripPage(-1);
      const newTrip = {
        trip_name: tripData.trip_name,
        description: tripData.description,
        visits: visits,
      };
      addTrip(newTrip);
    }
  };

  const [confirmFinish, setConfirmFinish] = useState(false);

  const [toggleHighways, setToggleHighways] = useState(false);

  const handleToggle = (checked: boolean) => {
    setToggleHighways(checked);
  };

  return (
    <div className={styles.everything}>
      {confirmFinish && (
        <ConfirmSelection
          warningText="Finish this trip?"
          yesFunction={handleAdd}
          noFunction={() => setConfirmFinish(false)}
        />
      )}
      <div className={styles.main}>
        <div className={styles.leftSide}>
          <div className={styles.titleContainer}>
            <p className={styles.name}>{tripData.trip_name}</p>
            <p className={styles.dayCount}>Day {dayCount}</p>
          </div>

          <div className={styles.mapContainer}>
            <div className={styles.highwayContainer}>
              <p className={styles.highways}>Show Highways</p>
              <ToggleBtn onToggle={handleToggle} />
            </div>
            <Counties
              animate={false}
              places={places}
              visits={visits}
              setVisits={setVisitsData}
              currentDate={getCurrentDate()}
              toggleHighways={toggleHighways}
            />
          </div>

          <p className={styles.tip}>
            {!visits.length && "click a county to get started"}
          </p>

          <div className={styles.dateChanger}>
            <button className={styles.backBtn} onClick={handleBack}>
              Back
            </button>
            <div className={styles.currentDateContainer}>
              <p className={styles.first}>
                {dayOfWeek[new Date(getCurrentDate()).getDay()]}
              </p>
              <p>{formatMDYDate(getCurrentDate(), true)}</p>
            </div>
            <button className={styles.forwardBtn} onClick={handleNext}>
              {tripData.end_date === getCurrentDate() ? "Finish" : "Next"}
            </button>
          </div>
        </div>

        <div className={styles.rightSide}>
          <div className={styles.header}>
            <p className={styles.text}>
              On {dayOfWeek[new Date(getCurrentDate()).getDay()]}
            </p>
            <p className={styles.date}>{formatMDYDate(getCurrentDate())}</p>
            <p className={styles.text}>you visited...</p>
          </div>

          <DirectionsInput />

          <p className={styles.instruction}>
            {visits.filter((visit) => visit.date === getCurrentDate()).length >
            0
              ? "Drag to reorder."
              : "Or select a place on the map..."}
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
                    .map((visit, index) => {
                      const originalIndex = optimisticState.findIndex(
                        (v) =>
                          v.fips_code === visit.fips_code && v.date === visit.date
                      );
                      return (
                        <Draggable
                          key={visit.fips_code}
                          draggableId={visit.fips_code}
                          index={originalIndex}
                        >
                          {(provided) => (
                            <p
                              className={styles.visitedPlace}
                              key={visit.fips_code}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {index +
                                1 +
                                ". " +
                                addDesignationToLabel(
                                  placesMap.get(visit.fips_code)!,
                                  "County"
                                )}
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

          <button className={styles.clearBtn} onClick={clearToday}>
            Clear Day
          </button>
        </div>
      </div>

      <button
        className={styles.closeContainer}
        onClick={() => setLogTripPage(-1)}
      >
        <div className={styles.close}>
          <Icon type="close" fill="#cfcfcf" />
        </div>
      </button>
    </div>
  );
}
