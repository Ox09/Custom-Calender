import { useEffect, useRef, useState } from "react";
import "./calender.scss";
import { motion } from "framer-motion";
// import useOutsideClick from "../../hooks/useOutsideClick";

interface CalenderProps {
  multiple?: boolean;
}

interface DatesTypes {
  currentDate: Date;
  selectedDate: Array<string>;
}
interface ArrayOfDatesTypes {
  currentMonth: boolean;
  date: Date;
  today?: number | boolean;
}

const Calender = ({ multiple }: CalenderProps) => {
  const [arrayOfDates, setArrayOfDates] = useState<ArrayOfDatesTypes[]>([]);
  const [date, setDate] = useState<DatesTypes>({
    currentDate: new Date(),
    selectedDate: [],
  });
  const [showCalender, setShowCalender] = useState(false);
  const calenderRef = useRef<HTMLDivElement | null>(null);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    generateDate(date.currentDate);
  }, [date.currentDate]);

  const generateDate = (date: Date) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDateOfMonth = new Date(year, month, 1);
    const lastDateOfMonth = new Date(year, month + 1, 0);
    const firstDate = firstDateOfMonth.getDate();
    const lastDate = lastDateOfMonth.getDate();
    const firstDay = firstDateOfMonth.getDay();
    const lastDay = lastDateOfMonth.getDay();

    const arrayOfDates = [];

    for (let date = firstDay - 1; date >= 0; date--) {
      arrayOfDates.push({
        currentMonth: false,
        date: new Date(year, month, 0 - date),
      });
    }
    // Current month dates
    for (let date = firstDate; date <= lastDate; date++) {
      const currentDateObject = new Date(year, month, date);
      arrayOfDates.push({
        currentMonth: true,
        date: currentDateObject,
        today: date === new Date().getDate(),
      });
      currentDateObject.setDate(date);
    }
    // Suffix next month dates
    for (let date = 6; date > lastDay; date--) {
      arrayOfDates.push({
        currentMonth: false,
        date: new Date(year, month + 1, 7 - date),
      });
    }
    // console.log(arrayOfDates);
    setArrayOfDates(arrayOfDates);
  };
    const prevMonth = () => {
      setDate((prev) => ({
        ...prev,
        currentDate: new Date(
          prev.currentDate.getFullYear(),
          prev.currentDate.getMonth() - 1,
          1
        ),
      }));
    };
    const nextMonth = () => {
      setDate((prev) => ({
        ...prev,
        currentDate: new Date(
          prev.currentDate.getFullYear(),
          prev.currentDate.getMonth() + 1,
          1
        ),
      }));
    };
  const goToToday = () => {
    setDate((prev) => ({
      ...prev,
      currentDate: new Date(),
    }));
  };
  const handleSelectedDates = (currentMonth: boolean, val: string) => {
    if (!currentMonth) return;
    if (multiple) {
      setDate((prev) => {
        if (!prev.selectedDate.includes(val))
          return { ...prev, selectedDate: [...prev.selectedDate, val] };
        else {
          const filterDate = prev.selectedDate.filter((date) => date !== val);
          return { ...prev, selectedDate: filterDate };
        }
      });
    } else {
      setDate((prev) => {
        if (!prev.selectedDate.includes(val))
          return { ...prev, selectedDate: [val] };
        else {
          const filterDate = prev.selectedDate.filter((date) => date !== val);
          return { ...prev, selectedDate: filterDate };
        }
      });
    }
  };
  const formatDateToDdMmYyyy = (date: string) => {
    // Parse the input string
    const parsedDate = new Date(date);

    // Format the date to "dd-mm-yyyy"
    const day = String(parsedDate.getDate()).padStart(2, "0");
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const year = parsedDate.getFullYear();

    return date ? `${day}-${month}-${year}` : "DD-MM-YYYY";
  };
  // console.log(date.selectedDate);

  return (
    <div className="calender-container" ref={calenderRef}>
      <div
        className="calenderInput"
        onClick={() => setShowCalender(!showCalender)}
      >
        <div className="selectedDate">
          {formatDateToDdMmYyyy(
            date.selectedDate[date.selectedDate.length - 1]
          )}
        </div>
        <div className="calenderIcon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" />
          </svg>
        </div>
      </div>

      {showCalender && (
        <motion.div
          className="calender-wrapper"
          initial={{ opacity: 0, visibility: "hidden", top: "35px" }}
          animate={{ opacity: 1, visibility: "visible", top: "38px" }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
        >
          <div className="calender">
            <div className="calender-heading">
              <h2>
                {months[date.currentDate.getMonth()]},{" "}
                {date.currentDate.getFullYear().toString()}
              </h2>
              <div className="dateNavigation">
                <div className="nav-arrow" onClick={prevMonth}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                  </svg>
                </div>

                <div className="today" onClick={goToToday}>
                  Today
                </div>

                <div className="nav-arrow" onClick={nextMonth}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="calender-body">
              {days.map((val, i) => (
                <div className="weekDays" key={i}>
                  {val}
                </div>
              ))}
              {arrayOfDates.map((val, i) => {
                return (
                  <div
                    className={`day ${val.today ? "currentDay" : "otherDay"} ${
                      val.currentMonth ? "currentMonthDay" : "otherMonthDay"
                    } ${
                      date.selectedDate.includes(val.date.toDateString())
                        ? "selectedDate"
                        : ""
                    }`}
                    key={i}
                    onClick={() =>
                      handleSelectedDates(
                        val.currentMonth,
                        val.date.toDateString()
                      )
                    }
                  >
                    <span>{val.date.getDate().toString()}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="selected-field">
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {" "}
              {date.selectedDate[date.selectedDate.length - 1]}
            </motion.span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Calender;
