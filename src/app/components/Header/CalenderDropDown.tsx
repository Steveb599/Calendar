/*
Dropdown component for calender Header with the ability to switch the display mode.
*/

import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Typography } from "antd";
import { hebrewTranslations } from "../../util";

const CalenderDropDown = () => {
  const { viewCalendar, setViewCalendar } = useContext(GlobalContext);

  const items = [
    {
      key: "יום",
      label: "יום",
      onClick: () => {
        setViewCalendar("Day");
      },
    },
    {
      key: "שבוע",
      label: "שבוע",
      onClick: () => {
        setViewCalendar("Week");
      },
    },
    {
      key: "Month",
      label: "חודש",
      onClick: () => {
        setViewCalendar("Month");
      },
    },
    {
      key: "Appointments",
      label: "פגישות",
      onClick: () => {
        setViewCalendar("Appointments");
      },
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        defaultSelectedKeys: [viewCalendar],
      }}
      className="mr-5 border px-4 py-2 w-36 hiddenItemsSmallScreen"
    >
      <Typography>
        <Space className="flex items-center justify-between">
          {hebrewTranslations[viewCalendar]}
          <DownOutlined />
        </Space>
      </Typography>
    </Dropdown>
  );
};

export default CalenderDropDown;
