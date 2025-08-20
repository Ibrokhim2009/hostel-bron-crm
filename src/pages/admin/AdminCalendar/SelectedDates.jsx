import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

const SelectedDates = ({ selectedDates, setSelectedDates, setCurrentBookingDate, setBookingForm, setIsBookingModalOpen }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Selected Dates ({selectedDates.length})</h3>
        <div className="flex space-x-2">
          <Button
            onClick={() => {
              setCurrentBookingDate(new Date(selectedDates[0]));
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
            }}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Book Selected</span>
          </Button>
          <Button variant="outline" onClick={() => setSelectedDates([])}>
            Clear
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {selectedDates.map((dateStr) => (
          <span
            key={dateStr}
            className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
          >
            <span>{new Date(dateStr).toLocaleDateString()}</span>
            <X
              className="h-3 w-3 cursor-pointer hover:text-gray-600"
              onClick={() => setSelectedDates(selectedDates.filter((d) => d !== dateStr))}
            />
          </span>
        ))}
      </div>
    </div>
  );
};

export default React.memo(SelectedDates);