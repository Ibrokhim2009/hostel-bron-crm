import React, { useRef, useEffect, useState } from "react";
import { Users, MapPin, Clock, Info } from "lucide-react";

const CalendarGrid = ({
  currentDate,
  view,
  bookings,
  selectedDates,
  setSelectedDates,
  isMultiSelect,
  setCurrentBookingDate,
  setCurrentBookingId,
  setBookingForm,
  setIsBookingModalOpen,
  setIsInfoModalOpen,
  setEditMode,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredDate, setHoveredDate] = useState(null);
  const calendarRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Исправленная функция получения дней месяца
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Понедельник = 0
    const days = [];

    // Предыдущий месяц
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        isPreviousMonth: true,
      });
    }

    // Текущий месяц
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: new Date(year, month, day),
        isCurrentMonth: true,
        isPreviousMonth: false,
      });
    }

    // Следующий месяц
    const remainingSlots = 42 - days.length;
    for (let day = 1; day <= remainingSlots; day++) {
      days.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false,
        isPreviousMonth: false,
      });
    }
    return days;
  };

  const getWeekDays = (date) => {
    const startOfWeek = new Date(date);
    const day = (startOfWeek.getDay() + 6) % 7; // Понедельник = 0
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push({ date: day, isCurrentMonth: true, isPreviousMonth: false });
    }
    return days;
  };

  const formatDate = (date) => {
    // Убираем проблемы с временными зонами
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Исправленная функция проверки выбранной даты
  const isSelected = (date) => {
    const dateStr = formatDate(date);
    return selectedDates.includes(dateStr);
  };

  const hasBooking = (date) => bookings[formatDate(date)];

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-500 border-emerald-200";
      case "pending":
        return "bg-amber-500 border-amber-200";
      case "canceled":
        return "bg-red-500 border-red-200";
      default:
        return "bg-slate-500 border-slate-200";
    }
  };

  const getStatusGradient = (status) => {
    switch (status) {
      case "confirmed":
        return "from-emerald-400 to-emerald-600";
      case "pending":
        return "from-amber-400 to-amber-600";
      case "canceled":
        return "from-red-400 to-red-600";
      default:
        return "from-slate-400 to-slate-600";
    }
  };

  // Исправленная функция обработки кликов
  const handleDateClick = (date, event) => {
    event.stopPropagation();
    const dateStr = formatDate(date);
    const booking = bookings[dateStr];

    if (booking) {
      // Если есть бронирование - показываем информацию
      setCurrentBookingDate(date);
      setCurrentBookingId(booking.id);
      setBookingForm(booking);
      setIsInfoModalOpen(true);
    } else if (isMultiSelect) {
      // Мультивыбор дат
      setSelectedDates((prevSelected) => {
        if (prevSelected.includes(dateStr)) {
          return prevSelected.filter((d) => d !== dateStr);
        } else {
          return [...prevSelected, dateStr];
        }
      });
    } else {
      // Одиночный выбор даты
      setSelectedDates([dateStr]);
      setCurrentBookingDate(date);
      setEditMode(false);
      setBookingForm({
        name: "",
        email: "",
        phone: "",
        room: "Room 1",
        guests: 1,
        status: "confirmed",
        notes: "",
      });
      setIsBookingModalOpen(true);
    }
  };

  // Обработка наведения для показа информации о бронировании
  const handleMouseEnter = (date) => {
    if (!isMobile) {
      setHoveredDate(formatDate(date));
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setHoveredDate(null);
    }
  };

  const renderBookingTooltip = (booking) => (
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg p-3 z-50 min-w-48">
      <div className="text-sm font-semibold text-slate-800 mb-2">
        {booking.name}
      </div>
      <div className="space-y-1 text-xs text-slate-600">
        <div className="flex items-center space-x-2">
          <Users className="h-3 w-3" />
          <span>{booking.guests} гостей</span>
        </div>
        {booking.room && (
          <div className="flex items-center space-x-2">
            <MapPin className="h-3 w-3" />
            <span>{booking.room}</span>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <div
            className={`w-2 h-2 rounded-full ${
              getStatusColor(booking.status).split(" ")[0]
            }`}
          />
          <span className="capitalize">{booking.status}</span>
        </div>
      </div>
      <div className="text-xs text-slate-500 mt-2">
        Нажмите для подробностей
      </div>
    </div>
  );

  const renderMonthView = () => {
    const daysToShow = getDaysInMonth(currentDate);

    return (
      <div className="w-full max-w-[90%] mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-2 sm:px-4 py-3 border-b border-slate-200">
          <div className="grid grid-cols-7 gap-1">
            {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day, index) => (
              <div key={day} className="text-center py-2">
                <span className="text-xs sm:text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  {isMobile ? day.charAt(0) : day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 divide-x divide-slate-200">
          {daysToShow.map((dayInfo, index) => {
            const { date, isCurrentMonth } = dayInfo;
            const dateStr = formatDate(date);
            const booking = hasBooking(date);
            const status = booking ? booking.status : null;
            const selected = isSelected(date);
            const today = isToday(date);
            const hovered = hoveredDate === dateStr;

            return (
              <div
                key={index}
                onClick={(e) => handleDateClick(date, e)}
                onMouseEnter={() => handleMouseEnter(date)}
                onMouseLeave={handleMouseLeave}
                className={`
                  group relative min-h-[60px] sm:min-h-[80px] md:min-h-[100px] p-1 sm:p-2 cursor-pointer transition-all duration-200
                  ${
                    isCurrentMonth
                      ? "hover:bg-slate-50"
                      : "bg-slate-50/30 hover:bg-slate-50/50"
                  }
                  ${today ? "bg-blue-50 hover:bg-blue-100" : ""}
                  ${
                    selected && !booking
                      ? "bg-slate-800 text-white hover:bg-slate-700"
                      : ""
                  }
                  ${!isCurrentMonth ? "opacity-60" : ""}
                  border-b border-slate-200
                  ${booking ? "hover:bg-slate-100" : ""}
                `}
                role="button"
                tabIndex={0}
                aria-label={`День ${date.getDate()}, ${
                  booking ? `Забронировано: ${booking.name}` : "Доступно"
                }`}
              >
                {/* Date Number */}
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`
                    text-xs sm:text-sm md:text-base font-medium transition-colors
                    ${
                      selected && !booking
                        ? "text-white"
                        : today
                        ? "text-blue-600 font-bold"
                        : isCurrentMonth
                        ? "text-slate-800"
                        : "text-slate-400"
                    }
                  `}
                  >
                    {date.getDate()}
                  </span>
                  {today && !selected && (
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-pulse" />
                  )}
                </div>

                {/* Booking Info */}
                {booking ? (
                  <div className="space-y-1 relative">
                    <div
                      className={`
                        text-xs px-1.5 sm:px-2 py-1 rounded-md font-medium text-white shadow-sm truncate
                        bg-gradient-to-r ${getStatusGradient(status)}
                        hover:shadow-md transition-shadow duration-200
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span className="truncate flex-1 mr-1">
                          {booking.name}
                        </span>
                        <Info className="h-2.5 w-2.5 sm:h-3 sm:w-3 flex-shrink-0 opacity-70" />
                      </div>
                    </div>

                    <div className="text-xs text-center text-slate-600 bg-slate-100 rounded px-1 py-0.5">
                      Забронировано
                    </div>

                    {!isMobile && (
                      <div className="text-xs flex items-center space-x-1 text-slate-500">
                        <Users className="h-2.5 w-2.5" />
                        <span>{booking.guests}</span>
                      </div>
                    )}

                    {/* Tooltip on hover */}
                    {hovered && !isMobile && renderBookingTooltip(booking)}
                  </div>
                ) : selected ? (
                  <div className="text-xs text-center text-white bg-slate-600 rounded px-1 py-0.5 mt-1">
                    Выбрано
                  </div>
                ) : null}

                {/* Hover Effect for empty dates */}
                {!booking && (
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays(currentDate);
    const properties = ["Объект 1", "Объект 2"];

    return (
      <div className="w-full max-w-[90%] mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
        {/* Week Header */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
          <div className="grid grid-cols-8 gap-px">
            {/* Empty corner for property labels */}
            <div className="bg-slate-100 p-2 sm:p-4">
              <span className="text-xs sm:text-sm font-semibold text-slate-700">
                Объекты
              </span>
            </div>

            {/* Week days headers */}
            {weekDays.map((dayInfo, index) => {
              const { date } = dayInfo;
              const today = isToday(date);

              return (
                <div
                  key={index}
                  className={`
                    p-2 sm:p-4 text-center border-l border-slate-200
                    ${today ? "bg-blue-50" : "bg-white"}
                  `}
                >
                  <div
                    className={`
                    text-xs font-medium mb-1
                    ${today ? "text-blue-600" : "text-slate-600"}
                  `}
                  >
                    {date.toLocaleDateString("ru-RU", { weekday: "short" })}
                  </div>
                  <div
                    className={`
                    text-sm sm:text-lg font-bold
                    ${
                      today
                        ? "text-blue-600 bg-blue-100 rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center mx-auto"
                        : "text-slate-800"
                    }
                  `}
                  >
                    {date.getDate()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Properties Grid */}
        <div className="divide-y divide-slate-200">
          {properties.map((property, propIndex) => (
            <div
              key={propIndex}
              className="grid grid-cols-8 gap-px min-h-[50px] sm:min-h-[70px]"
            >
              {/* Property Label */}
              <div className="bg-slate-50 p-2 sm:p-4 flex items-center border-r border-slate-200">
                <span className="text-xs sm:text-sm font-medium text-slate-700 truncate">
                  {property}
                </span>
              </div>

              {/* Week days cells */}
              {weekDays.map((dayInfo, dayIndex) => {
                const { date } = dayInfo;
                const dateStr = formatDate(date);
                const booking = bookings[dateStr];
                const selected = isSelected(date);
                const today = isToday(date);
                const hovered = hoveredDate === dateStr;

                return (
                  <div
                    key={dayIndex}
                    onClick={(e) => handleDateClick(date, e)}
                    onMouseEnter={() => handleMouseEnter(date)}
                    onMouseLeave={handleMouseLeave}
                    className={`
                      group relative p-1 sm:p-2 cursor-pointer transition-all duration-200 
                      border-l border-slate-200 hover:bg-slate-50
                      ${
                        today
                          ? "bg-blue-50/50 hover:bg-blue-100/50"
                          : "bg-white"
                      }
                      ${
                        selected && !booking
                          ? "bg-slate-800 hover:bg-slate-700"
                          : ""
                      }
                    `}
                    role="button"
                    tabIndex={0}
                    aria-label={`${property} на ${date.toLocaleDateString(
                      "ru-RU"
                    )}`}
                  >
                    {booking ? (
                      <div className="h-full relative">
                        <div
                          className={`
                            h-full rounded-md p-1 sm:p-2 text-white shadow-sm
                            bg-gradient-to-r ${getStatusGradient(
                              booking.status
                            )}
                            hover:shadow-md transition-shadow duration-200
                          `}
                        >
                          <div className="text-xs font-medium truncate mb-1 flex items-center justify-between">
                            <span className="truncate flex-1">
                              {booking.name}
                            </span>
                            <Info className="h-2.5 w-2.5 flex-shrink-0 opacity-70" />
                          </div>
                          {!isMobile && (
                            <div className="text-xs opacity-90 flex items-center space-x-1">
                              <Users className="h-2.5 w-2.5" />
                              <span>{booking.guests}</span>
                            </div>
                          )}
                        </div>

                        {/* Tooltip */}
                        {hovered && !isMobile && renderBookingTooltip(booking)}
                      </div>
                    ) : (
                      <>
                        {/* Empty cell indicator */}
                        <div className="absolute inset-1 border-2 border-dashed border-slate-300 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        {selected && (
                          <div className="absolute inset-0 bg-slate-800 rounded-md opacity-80" />
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full px-2 sm:px-4">
      {view === "month" ? renderMonthView() : renderWeekView()}
    </div>
  );
};

export default React.memo(CalendarGrid);
