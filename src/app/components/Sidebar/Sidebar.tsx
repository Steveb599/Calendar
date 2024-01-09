// import CreateEventButton from "./CreateEventButton"
import JumpByWeek from "./JumpByWeek";
import SmallCalender from "./SmallCalender";

const Sidebar = () => {
  return (
    <aside className="border  px-5 w-50">
      <SmallCalender />
      <JumpByWeek />
    </aside>
  );
};

export default Sidebar;
