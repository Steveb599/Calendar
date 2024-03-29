import { Dayjs } from "dayjs";
import { FieldValues } from "react-hook-form";

export interface CalendarEvent {
  id: number | string;
  title: string;
  notes?: string;
  label: string;
  day: number;
  trainees: string[];
  duration: number;
  type: "Online" | "In person";
  meetingType: "Nutrition" | "Training" | "Nutrition and training";
  online?: "Zoom" | "Skype" | "WhatsApp" | "Facebook" | "Instagram";
  address?: string;
  startDate: Dayjs;
}

export interface RHFElementProps {
  props: {
    control: any;
    name: "startDate" | "title" | "trainees" | "duration" | "label" | "type" | "address" | "online" | "notes" | "meetingType";
  };
  Element: React.FC<{ field: FieldValues }>;
}

export interface GlobalContextProps {
  monthIndex: number;
  setMonthIndex: (index: number) => void;
  smallCalendarMonth: number | null;
  setSmallCalendarMonth: (index: number) => void;
  daySelected: Dayjs | null;
  setDaySelected: (day: Dayjs | null) => void;
  showEventModal: boolean;
  setShowEventModal: (arg0: boolean) => void;
  showSideCalendar: boolean;
  setShowSideCalendar: (arg0: boolean) => void;
  viewCalendar: "Day" | "Week" | "Month" | string;
  setViewCalendar: (calendar: "Day" | "Week" | "Month" | string) => void;
  dispatchCalEvent: (event: { type: string; payload: any }) => void;
  savedEvents: CalendarEvent[];
  selectedEvent: CalendarEvent | null;
  setSelectedEvent: (event: CalendarEvent | null) => void; // Update this with the actual type of event
}
