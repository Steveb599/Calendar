import dayjs, { Dayjs } from "dayjs";
import React, { useState, useEffect, useContext } from "react";
import { getMonth, hebrewTranslations } from "../../util";
import GlobalContext from "../../context/GlobalContext";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const SmallCalender = () => {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const {
    monthIndex,
    daySelected,
    setSmallCalendarMonth,
    setDaySelected,
    setMonthIndex,
  } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  // Handle Next and Prev Months
  const handlePrevNextMonth = (action: number) => {
    // setCurrentMonthIdx(currentMonthIdx - action)
    setMonthIndex(currentMonthIdx - action);
  };

  const getDayClass = (day: Dayjs) => {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);
    return nowDay === currDay
      ? "bg-red-500 text-white p-1 rounded-full "
      : currDay == slcDay
      ? "bg-blue-100 rounded-full text-blue-600 font-bold"
      : "";
  };

  const getMonthClass = (day: Dayjs) => {
    const nowMonth = dayjs().format();
    const currMonth = day.format();
    return nowMonth <= currMonth ? "text-black" : "text-gray-500";
  };

  const translatedMonth =
    hebrewTranslations[dayjs().month(currentMonthIdx).format("MMMM")];
  const formattedYear = dayjs(new Date(dayjs().year(), currentMonthIdx)).format(
    "YYYY"
  );

  return (
    <div className="py-4">
      <header className="flex justify-between items-center">
        <p className="text-black text-sm font-medium">
          {translatedMonth} {formattedYear}
        </p>
        <div className="flex items-center justify-center gap-2 ">
          <button onClick={() => handlePrevNextMonth(1)} className="">
            <span className="cursor-pointer text-black text-lg">
              <AiOutlineRight />
            </span>
          </button>
          <button onClick={() => handlePrevNextMonth(-1)} className="">
            <span className="cursor-pointer text-black text-lg">
              <AiOutlineLeft />
            </span>
          </button>
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-6 mt-5">
        {currentMonth[0].map((day, i) => (
          <span
            key={i}
            className="text-xs py-1 text-center text-gray-400 font-semibold"
          >
            {hebrewTranslations[day.format("ddd")]}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIdx);
                  setDaySelected(day);
                }}
                key={idx}
                className={`${getDayClass(day)} ${getMonthClass(day)}`}
              >
                <span className="text-sm">{day.format("D")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SmallCalender;
