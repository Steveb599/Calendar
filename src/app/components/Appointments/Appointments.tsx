import { List, Typography } from "antd";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import dayjs from "dayjs";

const Appointments = () => {
  const { savedEvents, setShowEventModal, setSelectedEvent } =
    useContext(GlobalContext);

  return (
    <div className="animate__backOutLeft animate__backInRight animate__delay-2s flex flex-col w-full">
      {!savedEvents?.length && (
        <Typography.Text className="flex justify-center items-center h-screen text-gray-600 text-bold">
          אין לך פגישות. לחץ על כפתור ההוספה להוספת פגישה חדשה
        </Typography.Text>
      )}
      {!!savedEvents?.length && (
        <List
          className="border shadow-md rounded-md"
          itemLayout="horizontal"
          dataSource={savedEvents}
          renderItem={(itemEvent, i) => (
            <List.Item
              className="cursor-pointer hover:bg-gray-100"
              key={i}
              onClick={() => {
                setSelectedEvent(itemEvent);
                setShowEventModal(true);
              }}
            >
              <List.Item.Meta
                title={<Typography.Text>{itemEvent.title}</Typography.Text>}
              />
              <List.Item.Meta
                title={
                  <Typography.Text>
                    {dayjs(itemEvent.time).format(" HH:mm, dddd, MMMM DD")}
                  </Typography.Text>
                }
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default Appointments;
