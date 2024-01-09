/*
    Calender Header Component. Desktop + Mobile

*/
import { useContext, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";
import dayjs from "dayjs";
import {
  AiOutlineLeft,
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
  AiOutlineRight,
} from "react-icons/ai";
import { useState } from "react";
import CalenderDropDown from "./CalenderDropDown";
import { Button } from "antd";
import {
  getFirstAndLastDay,
  hebrewTranslations,
  translateDay,
  translateMonth,
} from "../../util";

const CalenderHeader = () => {
  const {
    monthIndex,
    setMonthIndex,
    setDaySelected,
    showSideCalendar,
    setShowSideCalendar,
    viewCalendar,
    daySelected,
  } = useContext(GlobalContext);
  const [currentDay, setCurrentDay] = useState(daySelected?.date());

  const getDaysInMonth = (monthIndex: number): number => {
    const currentSelectedYear = daySelected!.format("YYYY");
    const date = dayjs(`${currentSelectedYear}-${monthIndex}-01`);
    return date.daysInMonth();
  };

  const handleNextPrevMonth = (actionValue: number) => {
    if (
      daySelected &&
      (viewCalendar === "Day" || viewCalendar === "Appointments")
    ) {
      if (currentDay === 1) setMonthIndex(monthIndex - 1);
      if (currentDay === getDaysInMonth(monthIndex))
        setMonthIndex(monthIndex + 1);
      setDaySelected(daySelected.add(actionValue, "day"));
    } else if (viewCalendar === "Month") {
      setMonthIndex(monthIndex + actionValue);
    } else if (daySelected) {
      setDaySelected(daySelected.add(actionValue, "weeks"));
    }
  };

  const handleReset = () => {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
    setDaySelected(dayjs());
  };

  const handleSideCalender = () => {
    setShowSideCalendar(!showSideCalendar);
  };
  useEffect(() => {}, [showSideCalendar]);

  useEffect(() => {
    setCurrentDay(daySelected?.date());
  }, [daySelected]);

  useEffect(() => {
    if (monthIndex !== daySelected?.month()) {
      setMonthIndex(daySelected!.month());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [daySelected]);

  const WeekDates = getFirstAndLastDay(daySelected!);

  const formattedYear = dayjs(new Date(dayjs().year(), monthIndex)).format(
    "YYYY"
  );
  const splittedFirstDayOfWeek = WeekDates.firstDayOfWeek.split(" ");
  const splittedLastDayOfWeek = WeekDates.lastDayOfWeek.split(" ");
  const monthWithoutComma = splittedLastDayOfWeek[1].replace(",", "");
  const translatedFirstDayOfWeek =
    splittedFirstDayOfWeek[1] === monthWithoutComma
      ? splittedFirstDayOfWeek[0]
      : `${splittedFirstDayOfWeek[0]} ${
          hebrewTranslations[splittedFirstDayOfWeek[1]]
        }`;
  const translatedLastDayOfWeek = `${splittedLastDayOfWeek[0]} ${hebrewTranslations[monthWithoutComma]}, ${splittedLastDayOfWeek[2]}`;
  const translatedMonth = translateMonth(monthIndex);
  const translatedDay = translateDay(daySelected!);

  return (
    <header className=" calenderHeaderMenu px-4 py-3 flex items-center justify-between border shadow-md border-b-gray-200">
      <div className="flex items-center justify-center">
        <div
          className="hiddenItemsSmallScreen cursor-pointer rounded py-2 px-3 mr-5 text-3xl"
          onClick={handleSideCalender}
        >
          {showSideCalendar ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
        </div>
        <CalenderDropDown />
        <Button className=" py-2 px-4 mr-5" size="large" onClick={handleReset}>
          היום
        </Button>
      </div>
      {/* Controls */}
      <div className=" controls flex items-center  flex-grow justify-center gap-4">
        {/* Left Control */}
        <Button
          size="large"
          onClick={() => handleNextPrevMonth(-1)}
          className="flex items-center justify-center border rounded p-3"
        >
          <span className="cursor-pointer text-black ">
            <AiOutlineRight />
          </span>
        </Button>
        {/* Date Display */}
        {viewCalendar === "Month" ? (
          // Month
          <div className="flex items-center justify-center border rounded w-48  px-3 py-2">
            <h2 className=" text-base text-black font-base">
              {translatedMonth} {formattedYear}
            </h2>
          </div>
        ) : viewCalendar === "Week" ? (
          // Week
          <div className="flex items-center justify-center border rounded w-48  px-3 py-2">
            <h2 className=" text-base text-black font-base">
              {translatedFirstDayOfWeek + " - " + translatedLastDayOfWeek}
            </h2>
          </div>
        ) : (
          // Day
          <div className="flex items-center justify-center border rounded w-48  px-3 py-2">
            <h2 className=" text-base text-black font-base">{translatedDay}</h2>
          </div>
        )}
        {/* Right Control */}
        <Button
          size="large"
          onClick={() => handleNextPrevMonth(1)}
          className="flex items-center justify-center border rounded p-3"
        >
          <span className="cursor-pointer text-black">
            <AiOutlineLeft />
          </span>
        </Button>
      </div>

      {/* <div className=" hiddenItemsSmallScreen flex justify-center items-center gap-4 text-3xl">
                <div className=""><SettingOutlined /> </div>
                <div className=""><AiOutlineBell /></div>
                <div name='searchBox' value={searchValue} onChange={(e) => setSearchValue(e)} type="text" className=" py-2 px-3 border rounded text-gray-400 bg-gray-200 text-lg flex items-center justify-center gap-2 cursor-pointer"> <AiOutlineSearch />  Search</div>
            </div> */}
    </header>
  );
};

export default CalenderHeader;
