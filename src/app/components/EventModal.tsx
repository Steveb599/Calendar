import { useContext } from "react";
import {
  AiOutlineAlignLeft,
  AiOutlineBook,
  AiOutlineCheck,
  AiOutlineClockCircle,
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineMenu,
} from "react-icons/ai";
import GlobalContext from "../context/GlobalContext";
import { Select, TimePicker } from "antd";
import dayjs from "dayjs";
import { useForm, Controller, Field } from "react-hook-form";
import { TMeetingSchema, meetingSchema } from "../zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { RHFElementProps } from "../types";
import { translateDay } from "../util";

const hexCodes: Record<string, string> = {
  indigo: "#3F00FF",
  gray: "#808080",
  green: "#00FF00",
  blue: "#0000FF",
  red: "#FF0000",
  purple: "#800080",
};

const labelClasses = ["indigo", "gray", "green", "blue", "red", "purple"];
const labelHexCodes = labelClasses.map((label) => hexCodes[label]);
const errorStyle = "text-red-500 font-medium text-base text-center";

const EventModal = () => {
  const {
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
    setSelectedEvent,
  } = useContext(GlobalContext);

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TMeetingSchema>({
    resolver: zodResolver(meetingSchema),
    defaultValues: selectedEvent
      ? {
        startDate: selectedEvent.startDate,
        title: selectedEvent.title,
        trainees: selectedEvent.trainees,
        duration: selectedEvent.duration,
        label: selectedEvent.label,
        type: selectedEvent.type,
        address: selectedEvent.address,
        online: selectedEvent.online,
        notes: selectedEvent.notes,
        meetingType: selectedEvent.meetingType,
      }
      : {
        startDate: dayjs(daySelected),
        label: labelHexCodes[0],
      },
  });

  const RHFElement = ({ props, Element }: RHFElementProps) => {
    return (
      <Controller
        control={props.control}
        name={props.name}
        render={({ field }) => {
          return (
            <>
              <Element field={field} />
              {errors[props.name] && (
                <div className={errorStyle}>{errors[props.name]?.message}</div>
              )}
            </>
          );
        }}
      />
    );
  };

  // const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   const calenderEvent = {
  //     title,
  //     notes: notes,
  //     label: selectedLabel,
  //     startDate: selectedTime,
  //     id: selectedEvent ? selectedEvent.id : Date.now(),
  //   };
  //   if (selectedEvent) {
  //     dispatchCalEvent({ type: "update", payload: calenderEvent });
  //   } else {
  //     dispatchCalEvent({ type: "push", payload: calenderEvent });
  //   }
  //   setSelectedEvent(null);
  // reset();
  //   setShowEventModal(false);
  // };

  // console.log('element', watch("label"))

  const newOnSubmit = async (formValues: TMeetingSchema) => {
  };

  return (
    <div className="event h-screen w-full fixed md:left-0 top-0 flex justify-center items-center z-10">
      <form
        onSubmit={handleSubmit(newOnSubmit)}
        className="bg-white rounded-lg shadow-2xl md:w-1/4 w-full">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="text-gray-400">
            <AiOutlineMenu />
          </span>
          <div className="flex gap-2">
            {selectedEvent && (
              <span
                className="text-gray-400 cursor-pointer"
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setSelectedEvent(null);
                  setShowEventModal(false);
                }}
                title="Delete"
              >
                <AiOutlineDelete />
              </span>
            )}
            <button title="Close" onClick={() => setShowEventModal(false)}>
              <span className="text-gray-400">
                <AiOutlineClose />
              </span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              {...register("title")}
              placeholder="הוסף כותרת"
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-200"
            />
            <div className="flex flex-col gap-3">
              <p>{translateDay(daySelected!)}</p>
              <div className="flex justify-between">
                <p>
                  <AiOutlineClockCircle className="text-gray-400" />
                  זמן הפגישה
                </p>
                <RHFElement
                  props={{
                    name: "startDate",
                    control: control,
                  }}
                  Element={({ field }) => (
                    <TimePicker
                      format="HH:mm"
                      minuteStep={15}
                      ref={field.ref}
                      className="w-full"
                      name={field.name}
                      value={field.value}
                      onSelect={(time) => {
                        field.onChange(time);
                      }}
                    />
                  )}
                />
              </div>
              <div className="flex justify-between">
                <p>סוג הפגישה</p>
                <RHFElement
                  props={{
                    name: "type",
                    control: control,
                  }}
                  Element={({ field }) => (
                    <Select
                      style={{ width: 120 }}
                      allowClear
                      value={field.value}
                      onSelect={(type) => {
                        field.onChange(type)
                      }}
                      options={[{ value: 'In person', label: 'פנים מול פנים' }, { value: 'Online', label: 'אונליין' }]}
                      placeholder=""
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex gap-x-2 text-center align-center">
              <span className="text-gray-400">
                <AiOutlineAlignLeft />
              </span>
              <input
                type="text"
                {...register("notes")}
                placeholder="הערות"
                className="pt-3 border-0 text-gray-600  pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-200 flex items-center justify-center"
              />
            </div>
            <div className="flex gap-x-2 text-center align-center">
              <span className="text-gray-400">
                <AiOutlineAlignLeft />
              </span>
              <input
                type="text"
                {...register("address")}
                placeholder="כתובת"
                className="pt-3 border-0 text-gray-600  pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-200 flex items-center justify-center"
              />
            </div>
            <span className="text-gray-400">
              <AiOutlineBook />
            </span>
            <div className="flex gap-x-2">
              {labelHexCodes.map((lblClass, i) => (
                <div
                  key={i}
                  className=" w-6 h-4 flex items-center justify-center cursor-pointer rounded"
                  style={{ backgroundColor: `${lblClass}` }}
                  onClick={() => setValue("label", lblClass)}
                  title={Object.keys(hexCodes).find(
                    (key) => hexCodes[key] === lblClass
                  )}
                >
                  <span className="text-white text-xs">
                    {watch("label") === lblClass && <AiOutlineCheck />}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end md:w-full border-t p-3 mt-5">
          <button
            type="submit"
            className={`${watch("title") && watch("notes")
              ? "bg-blue-100 hover:bg-blue-600"
              : "bg-blue-500"
              }  px-6 py-2 rounded text-white`}
            disabled={isSubmitting}
          // onClick={(e) => handleSubmit(e)}
          >
            שמור
          </button>
        </footer>
      </form>
    </div>
  );
};

export default EventModal;
