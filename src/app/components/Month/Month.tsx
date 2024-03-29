import PropTypes from "prop-types";
import Day from "./Day";
import React from "react";
import { hebrewTranslations } from "../../util";
import { Dayjs } from "dayjs";

const Month = ({ month }: { month: Dayjs[][] }) => {
  return (
    <div className="flex flex-col flex-1 animate__backOutLeft animate__backInRight animate__delay-2s">
      <div className="grid grid-cols-7 grid-rows-1 py-4 border border-b-0 shadow-md">
        {month[0].map((day, i) => (
          <span
            key={i}
            className="text-sm text-center flex items-center justify-center h-4"
          >
            {hebrewTranslations[day.format("ddd")]}
          </span>
        ))}
      </div>
      <div className="overflow-y-scroll">
        <div className="flex-1 grid grid-cols-7 grid-rows-5 ">
          {month.map((row, i) => (
            <React.Fragment key={i}>
              {row.map((day, idx) => (
                <Day day={day} key={idx} rowIdx={i} />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

Month.propTypes = {
  month: PropTypes.any,
};

export default Month;
