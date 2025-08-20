import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Home,
  CalendarIcon,
} from "lucide-react";

const CalendarHeader = ({
  currentDate,
  setCurrentDate,
  selectedProperty,
  setSelectedProperty,
  view,
  setView,
  showFilters,
  setShowFilters,
  isMultiSelect,
  setIsMultiSelect,
}) => {
  const currentMonthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const formatDisplayDate = (date) =>
    date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + direction * 7);
    setCurrentDate(newDate);
  };

  return (
    <div className="flex justify-between items-center flex-wrap gap-3">
      <div className="flex space-x-2 flex-wrap gap-2">
        <Select value={selectedProperty} onValueChange={setSelectedProperty}>
          <SelectTrigger className="w-[140px]">
            <Home className="h-4 w-4 mr-2 text-gray-600" />
            <SelectValue
              placeholder={selectedProperty.replace("Property", "Property ")}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Property1">Property 1</SelectItem>
            <SelectItem value="Property2">Property 2</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={currentMonthName}
          onValueChange={(value) => {
            const [month, year] = value.split(" ");
            const monthIndex = new Date(
              Date.parse(month + " 1, 2000")
            ).getMonth();
            const newDate = new Date(parseInt(year), monthIndex, 1);
            setCurrentDate(newDate);
          }}
        >
          <SelectTrigger className="w-[140px]">
            <CalendarIcon className="h-4 w-4 mr-2 text-gray-600" />
            <SelectValue placeholder={currentMonthName} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="August 2025">August 2025</SelectItem>
            <SelectItem value="September 2025">September 2025</SelectItem>
            <SelectItem value="October 2025">October 2025</SelectItem>
            <SelectItem value="November 2025">November 2025</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              view === "month" ? navigateMonth(-1) : navigateWeek(-1)
            }
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-lg font-medium min-w-[180px] text-center">
            {view === "month"
              ? currentMonthName
              : `Week of ${formatDisplayDate(currentDate)}`}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              view === "month" ? navigateMonth(1) : navigateWeek(1)
            }
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex space-x-2">
          <Button
            variant={view === "week" ? "default" : "outline"}
            onClick={() => setView("week")}
            className="rounded-full"
          >
            Week
          </Button>
          <Button
            variant={view === "month" ? "default" : "outline"}
            onClick={() => setView("month")}
            className="rounded-full"
          >
            Month
          </Button>
          <Button
            variant={isMultiSelect ? "default" : "outline"}
            onClick={() => setIsMultiSelect(true)}
            className="rounded-full"
          >
            Multi
          </Button>
          <Button
            variant={!isMultiSelect ? "default" : "outline"}
            onClick={() => setIsMultiSelect(false)}
            className="rounded-full"
          >
            Single
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CalendarHeader);
