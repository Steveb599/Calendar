'use client'
import { useState, useEffect, useReducer, ReactNode } from "react";
import GlobalContext from "./GlobalContext";
import dayjs, { Dayjs } from "dayjs";
import { CalendarEvent, GlobalContextProps } from "../types";

// Context Reducer
const savedEventsReducer = (state: CalendarEvent[], { type, payload }: { type: string; payload: CalendarEvent }): CalendarEvent[] => {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
};

// Checks If there are events
const initEvents = (): CalendarEvent[] => {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
};

// Sets up Our current calendar to last view if it exists, Defaults to Day calendar
const initView = (): string => {
  const storageView = localStorage.getItem("calendarView");
  return storageView ? JSON.parse(storageView) : "Day";
};

interface ContextWrapperProps {
  children: ReactNode;
}

const ContextWrapper = (props: ContextWrapperProps) => {
  const [monthIndex, setMonthIndex] = useState<number>(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState<number | null>(null);
  const [daySelected, setDaySelected] = useState<Dayjs | null>(dayjs());
  const [showEventModal, setShowEventModal] = useState<boolean>(false);
  const [showSideCalendar, setShowSideCalendar] = useState<boolean>(true);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [viewCalendar, setViewCalendar] = useState<string>(initView());
  const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, [], initEvents);

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    localStorage.setItem("calendarView", JSON.stringify(viewCalendar));
  }, [viewCalendar]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  console.log('daySelected', daySelected)
  const contextValue: GlobalContextProps = {
    monthIndex,
    setMonthIndex,
    smallCalendarMonth,
    setSmallCalendarMonth,
    daySelected,
    setDaySelected: (day) => setDaySelected(day || dayjs()), 
    showEventModal,
    setShowEventModal,
    showSideCalendar,
    setShowSideCalendar,
    viewCalendar,
    setViewCalendar,
    dispatchCalEvent,
    savedEvents,
    selectedEvent,
    setSelectedEvent,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
