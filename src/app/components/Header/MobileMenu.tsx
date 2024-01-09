import { useState } from "react";
import { Menu, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { hebrewTranslations } from "@/app/util";

const MobileMenu = () => {
  const [visible, setVisible] = useState(false);

  const toggleMenu = () => setVisible(!visible);

  const { viewCalendar, setViewCalendar } = useContext(GlobalContext);
  const [selectedMode, setSelectedMode] = useState(viewCalendar);

  const items = [
    {
      key: "Day",
      label: "יום",
      onClick: () => {
        setViewCalendar("Day"); // Update global context
        setSelectedMode("Day"); // Update local state
        toggleMenu();
      },
    },
    {
      key: "Week",
      label: "שבוע",
      onClick: () => {
        setViewCalendar("Week"); // Update global context
        setSelectedMode("Week"); // Update local state
        toggleMenu();
      },
    },
    {
      key: "Month",
      label: "חודש",
      onClick: () => {
        setViewCalendar("Month"); // Update global context
        setSelectedMode("Month"); // Update local state
        toggleMenu();
      },
    },
    {
      key: "Appointments",
      label: "פגישות",
      onClick: () => {
        setViewCalendar("Appointments"); // Update global context
        setSelectedMode("Appointments"); // Update local state
        toggleMenu();
      },
    },
  ];

  return (
    <div className="px-3 py-2 min-h-14 ml-auto ">
      <button
        className="mobile-menu-button border rounded-md focus:outline-none p-1 px-2"
        onClick={toggleMenu}
      >
        <MenuOutlined style={{ fontSize: "24px" }} />
      </button>
      <Drawer
        title={`היומן הנוכחי: ${hebrewTranslations[selectedMode]}`}
        placement="right"
        closable={true}
        open={visible}
        onClose={toggleMenu}
        className="mobile-menu bg-white"
      >
        <Menu items={items} mode="inline" />
      </Drawer>
    </div>
  );
};

export default MobileMenu;
