// No logic implemented

import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

const JumpByWeek = () => {
  const { setDaySelected, daySelected } = useContext(GlobalContext);

  const numberItems = [1, 2, 3, 4, 5, 6];
  const checkIfLast = (index: number) => {
    return !(numberItems.length - 1 === index);
  };

  const jumpByMuch = (numberOfWeeks: number) => {
    setDaySelected(daySelected!.add(numberOfWeeks, "weeks"));
  };

  return (
    <div>
      <h2 className="text-center text-base font-semibold">לעבור שבוע</h2>
      <div className="flex items-center justify-center mt-6 gap-1">
        {numberItems.map((item, i) => (
          <div
            className={`p-1 flex items-center justify-center text-sm cursor-pointer ${
              checkIfLast(i) ? "border-r-2" : " "
            } `}
            key={i}
            onClick={() => {
              jumpByMuch(item);
            }}
          >
            <span>+{item}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-5 gap-1">
        {numberItems.map((item, idx) => (
          <div
            className={`p-1 flex items-center justify-center text-sm cursor-pointer ${
              checkIfLast(idx) ? "border-r-2" : " "
            }`}
            key={idx}
            onClick={() => {
              jumpByMuch(-item);
            }}
          >
            <span>- {item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JumpByWeek;
