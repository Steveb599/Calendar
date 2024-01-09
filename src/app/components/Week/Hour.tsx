import { useContext, useState, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";
import dayjs from "dayjs";
import { CalendarEvent } from "@/app/types";

const Hour = ({ hour }: { hour: string[] }) => {
  const { setDaySelected, setSelectedEvent, savedEvents, setShowEventModal } =
    useContext(GlobalContext);
  const [localEvents, setLocalEvents] = useState<CalendarEvent[]>(savedEvents);

  useEffect(() => {
    setLocalEvents(savedEvents);
  }, [savedEvents]);

  const checkifSunSat = () => {
    const checkVariable = dayjs(hour[0].toString(), "DD-MM-YYYY HH:mm");
    if (
      checkVariable.format("ddd") === "Sun" ||
      checkVariable.format("ddd") === "Sat"
    ) {
      return true;
    }
  };
  const cssstyle = {
    background: `${checkifSunSat() ? "#F4F4F4" : "#EBEBEB1A"}`,
  };

  return (
    <div
      className={`border border-gray-200  h-32 ${
        checkifSunSat()
          ? "flex items-start justify-start"
          : "grid grid-cols-1 grid-rows-4"
      }`}
      style={cssstyle}
    >
      {checkifSunSat() ? (
        <div
          className="mt-1 text-xs text-gray-400 cursor-pointer"
          title="Day-Off"
        >
          Day-Off
        </div>
      ) : (
        hour.map((quarter, idk) => (
          <div
            className={`flex justify-start items-center border border-gray-100 cursor-pointer ${
              idk === 2 && !checkifSunSat()
                ? "border-t-blue-200 border-solid"
                : "border-dashed"
            }`}
            key={idk}
            onClick={() => {
              setDaySelected(dayjs(quarter, "DD-MM-YYYY HH:mm"));
              console.log('daySelectedclick', dayjs(quarter, "DD-MM-YYYY HH:mm"))
              setShowEventModal(true);
            }}
            title={!checkifSunSat() ? quarter.slice(10) : undefined}
          >
            {localEvents
              .filter(
                (item) =>
                  dayjs(item.time).format("DD-MM-YYYY HH:mm") === quarter
              )
              .map((evt, idx) => (
                <div
                  key={idx}
                  className=" p-1 mr-3 text-white text-sm rounded mb-1 truncate"
                  style={{ backgroundColor: evt.label }}
                  onClick={() => setSelectedEvent(evt)}
                >
                  {evt.title}
                </div>
              ))}
          </div>
        ))
      )}
    </div>
  );
};

export default Hour;
