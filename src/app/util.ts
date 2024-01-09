import dayjs, { Dayjs } from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrBefore);

const getMonth = (month: number = dayjs().month()): Dayjs[][] => {
  month = Math.floor(month);
  const year = dayjs().year();
  const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfMonth;

  const daysMatrix: Dayjs[][] = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });

  return daysMatrix;
};

const getWeekHours = (startDate: Dayjs = dayjs()): string[][][] => {
  const weekHours: string[][][] = [];
  let currentDate = dayjs(startDate);
  if (currentDate.weekday() !== 0) {
    currentDate = currentDate.startOf("week");
  }
  for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
    const dayHours: string[][] = [];
    for (let hourIndex = 0; hourIndex < 24; hourIndex++) {
      const hourIntervals: string[] = [];
      for (let intervalIndex = 0; intervalIndex < 4; intervalIndex++) {
        const time = currentDate.hour(hourIndex).minute(intervalIndex * 15);
        const formattedTime = time.format("DD-MM-YYYY HH:mm");
        hourIntervals.push(formattedTime);
      }
      dayHours.push(hourIntervals);
    }
    weekHours.push(dayHours);
    currentDate = currentDate.add(1, "day");
  }
  return weekHours;
};

function getQuartoHourBlocks(
  selectedDate: Dayjs = dayjs().startOf("day")
): string[][] {
  const hoursArray: string[][] = [];
  const startDate = dayjs(selectedDate).startOf("day");

  for (let i = 0; i < 24; i++) {
    const currentHour = startDate.add(i, "hours");
    const hourArray: string[] = [];
    for (let j = 0; j < 4; j++) {
      const currentInterval = currentHour.add(j * 15, "minutes");
      // Use "HH:mm" format for 24-hour time representation
      const formattedInterval = currentInterval.format("HH:mm");
      hourArray.push(formattedInterval);
    }
    hoursArray.push(hourArray);
  }
  return hoursArray;
}

function getHourBlocks(
  selectedDate: Dayjs = dayjs().startOf("day")
): string[][] {
  const hoursArray: string[][] = [];
  const startDate = dayjs(selectedDate).startOf("day");
  for (let i = 0; i < 24; i++) {
    const currentHour = startDate.add(i, "hours");
    const hourArray: string[] = [];

    for (let j = 0; j < 4; j++) {
      const currentInterval = currentHour.add(j * 15, "minutes");
      const formattedInterval = currentInterval.format("DD-MM-YYYY HH:mm ");
      hourArray.push(formattedInterval);
    }

    hoursArray.push(hourArray);
  }
  return hoursArray;
}

const getWeekOfMonth = (selectedDate: Dayjs): number => {
  const startOfMonth = selectedDate.startOf("month");
  const diffInDays = selectedDate.diff(startOfMonth, "day");
  return Math.floor((diffInDays + startOfMonth.day()) / 7);
};

const getFirstAndLastDay = (
  selectedDate: Dayjs
): { firstDayOfWeek: string; lastDayOfWeek: string } => {
  const selectedDay = dayjs(selectedDate);
  const firstDayOfWeek = selectedDay.startOf("week").format("D MMM");
  const lastDayOfWeek = selectedDay.endOf("week").format("D MMM, YYYY");
  return { firstDayOfWeek, lastDayOfWeek };
};

const getWeekDays = (date: Dayjs = dayjs()): string[] => {
  const selectedDate = dayjs(date);
  const firstDayOfWeek = selectedDate.startOf("week");
  const lastDayOfWeek = selectedDate.endOf("week");
  const days: string[] = [];

  for (
    let currentDate = firstDayOfWeek;
    currentDate.isSameOrBefore(lastDayOfWeek);
    currentDate = currentDate.add(1, "day")
  ) {
    const formattedSplittedCurrentDay = currentDate.format("ddd D").split(" ");
    const translatedCurrentDay =
      hebrewTranslations[formattedSplittedCurrentDay[0]] +
      " " +
      formattedSplittedCurrentDay[1];
    days.push(translatedCurrentDay);
  }

  return days;
};

const translateMonth = (monthIndex: number): string => {
  return hebrewTranslations[dayjs().month(monthIndex).format("MMMM")];
};

const translateDay = (day: Dayjs): string => {
  const splittedDay = day.format("D MMMM, YYYY").split(" ");
  const translatedMonth =
    hebrewTranslations[dayjs().month(day.month()).format("MMMM")];
  const translatedDay =
    splittedDay[0] + " " + "ל" + translatedMonth + " " + splittedDay[2];
  return translatedDay;
};

const hebrewTranslations: Record<string, string> = {
  Week: "שבוע",
  Day: "יום",
  Month: "חודש",
  Appointments: "פגישות",
  January: "ינואר",
  February: "פברואר",
  March: "מרץ",
  April: "אפריל",
  May: "מאי",
  June: "יוני",
  July: "יולי",
  August: "אוגוסט",
  September: "ספטמבר",
  October: "אוקטובר",
  November: "נובמבר",
  December: "דצמבר",
  Jan: "ינו",
  Feb: "פבר",
  Mar: "מרץ",
  Apr: "אפר",
  Jun: "יוני",
  Jul: "יולי",
  Aug: "אוג",
  Sep: "ספט",
  Oct: "אוק",
  Nov: "נוב",
  Dec: "דצמ",
  Sat: "שבת",
  Sun: "ראשון",
  Mon: "שני",
  Tue: "שלישי",
  Wed: "רביעי",
  Thu: "חמישי",
  Fri: "שישי",
};

export {
  getMonth,
  getFirstAndLastDay,
  getHourBlocks,
  getQuartoHourBlocks,
  getWeekDays,
  getWeekHours,
  getWeekOfMonth,
  hebrewTranslations,
  translateDay,
  translateMonth,
};
