import React from "react";
import { GlobalContextProps } from "../types";

const GlobalContext = React.createContext<GlobalContextProps>({
  monthIndex: 0,
  setMonthIndex: (index) => {},
  smallCalendarMonth: 0,
  setSmallCalendarMonth: (index) => {},
  daySelected: null,
  setDaySelected: (day) => {},
  showEventModal: false,
  setShowEventModal: () => {},
  showSideCalendar: true,
  setShowSideCalendar: () => {},
  viewCalendar: "Day",
  setViewCalendar: (calendar) => {},
  dispatchCalEvent: ({ type, payload }) => {},
  savedEvents: [],
  selectedEvent: null,
  setSelectedEvent: () => {},
});

export default GlobalContext;
