import React from "react";
import { Calendar, Users } from "lucide-react";

const FilteredBookings = ({ filteredBookings, setCurrentBookingDate, setCurrentBookingId, setBookingForm, setIsInfoModalOpen, formatDate }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed": return "bg-green-600";
      case "pending": return "bg-yellow-600";
      case "canceled": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Filtered Bookings ({filteredBookings.length})</h3>
      <div className="space-y-3">
        {filteredBookings.map(([dateStr, booking]) => (
          <div
            key={booking.id}
            className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
            onClick={() => {
              const date = new Date(dateStr);
              setCurrentBookingDate(date);
              setCurrentBookingId(booking.id);
              setBookingForm(booking);
              setIsInfoModalOpen(true);
            }}
            role="button"
            aria-label={`View booking for ${booking.name} on ${new Date(dateStr).toLocaleDateString()}`}
          >
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <h4 className="font-medium text-gray-900">{booking.name}</h4>
                <p className="text-sm text-gray-500">{new Date(dateStr).toLocaleDateString()} • {booking.room}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="flex items-center text-sm text-gray-500">
                <Users className="h-4 w-4 mr-1" />
                {booking.guests}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(booking.status)}`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(FilteredBookings);