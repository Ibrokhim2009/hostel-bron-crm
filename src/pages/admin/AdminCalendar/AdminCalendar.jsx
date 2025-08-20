import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import SelectedDates from "./SelectedDates";
import CalendarFilters from "./CalendarFilters";
import FilteredBooking from "./FilteredBooking";
import Legend from "./Legend";
import BookingModalInfo from "./BookingModalInfo";
import BookingModal from "./BookingModal";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";

const AdminCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date("2025-08-09"));
  const [selectedDates, setSelectedDates] = useState([]);
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("Property1");
  const [view, setView] = useState("month");
  const [showFilters, setShowFilters] = useState(false);
  const [bookings, setBookings] = useState({
    "2025-08-15": {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      room: "Room 1",
      guests: 2,
      status: "confirmed",
      notes: "Early check-in requested",
    },
    "2025-08-20": {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+0987654321",
      room: "Room 2",
      guests: 1,
      status: "pending",
      notes: "",
    },
    "2025-08-25": {
      id: "3",
      name: "Bob Wilson",
      email: "bob@example.com",
      phone: "+1122334455",
      room: "Room 1",
      guests: 3,
      status: "canceled",
      notes: "Canceled due to emergency",
    },
  });

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentBookingDate, setCurrentBookingDate] = useState(null);
  const [currentBookingId, setCurrentBookingId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    room: "Room 1",
    guests: 1,
    status: "confirmed",
    notes: "",
  });

  const [filter, setFilter] = useState({
    guestName: "",
    phone: "",
    status: "all",
    room: "all",
  });

  const generateBookingId = () => Math.random().toString(36).substr(2, 9);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (bookingForm.name && bookingForm.email) {
      const newBookings = { ...bookings };
      if (editMode && currentBookingId) {
        const dateStr = formatDate(currentBookingDate);
        newBookings[dateStr] = { ...bookingForm, id: currentBookingId };
      } else {
        const datesToBook =
          selectedDates.length > 0
            ? selectedDates
            : [formatDate(currentBookingDate)];
        datesToBook.forEach((dateStr) => {
          newBookings[dateStr] = { id: generateBookingId(), ...bookingForm };
        });
      }
      setBookings(newBookings);
      setIsBookingModalOpen(false);
      setSelectedDates([]);
      setEditMode(false);
    }
  };

  const handleDeleteBooking = () => {
    if (currentBookingId) {
      const newBookings = { ...bookings };
      Object.keys(newBookings).forEach((dateStr) => {
        if (newBookings[dateStr].id === currentBookingId) {
          delete newBookings[dateStr];
        }
      });
      setBookings(newBookings);
      setIsInfoModalOpen(false);
      setIsDeleteModalOpen(false);
    }
  };

  const handleEditBooking = () => {
    setEditMode(true);
    setIsInfoModalOpen(false);
    setIsBookingModalOpen(true);
  };

  const formatDate = (date) => date.toISOString().split("T")[0];

  const filteredBookings = Object.entries(bookings).filter(([_, booking]) => {
    const matchesName = booking.name
      .toLowerCase()
      .includes(filter.guestName.toLowerCase());
    const matchesPhone = booking.phone
      .toLowerCase()
      .includes(filter.phone.toLowerCase());
    const matchesStatus =
      filter.status === "all" || booking.status === filter.status;
    const matchesRoom = filter.room === "all" || booking.room === filter.room;
    return matchesName && matchesPhone && matchesStatus && matchesRoom;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-4">
        <CalendarHeader
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          selectedProperty={selectedProperty}
          setSelectedProperty={setSelectedProperty}
          view={view}
          setView={setView}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          isMultiSelect={isMultiSelect}
          setIsMultiSelect={setIsMultiSelect}
        />
        <CalendarGrid
          currentDate={currentDate}
          view={view}
          bookings={bookings}
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
          isMultiSelect={isMultiSelect}
          setCurrentBookingDate={setCurrentBookingDate}
          setCurrentBookingId={setCurrentBookingId}
          setBookingForm={setBookingForm}
          setIsBookingModalOpen={setIsBookingModalOpen}
          setIsInfoModalOpen={setIsInfoModalOpen}
          setEditMode={setEditMode}
        />
        {selectedDates.length > 0 && (
          <SelectedDates
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
            setCurrentBookingDate={setCurrentBookingDate}
            setBookingForm={setBookingForm}
            setIsBookingModalOpen={setIsBookingModalOpen}
          />
        )}
        {showFilters && <CalendarFilters filter={filter} setFilter={setFilter} />}
        {showFilters && filteredBookings.length > 0 && (
          <FilteredBooking
            filteredBookings={filteredBookings}
            setCurrentBookingDate={setCurrentBookingDate}
            setCurrentBookingId={setCurrentBookingId}
            setBookingForm={setBookingForm}
            setIsInfoModalOpen={setIsInfoModalOpen}
            formatDate={formatDate}
          />
        )}
        <Legend />
        <BookingModal
          open={isBookingModalOpen}
          onOpenChange={setIsBookingModalOpen}
          bookingForm={bookingForm}
          setBookingForm={setBookingForm}
          editMode={editMode}
          handleBookingSubmit={handleBookingSubmit}
        />
        <BookingModalInfo
          open={isInfoModalOpen}
          onOpenChange={setIsInfoModalOpen}
          bookingForm={bookingForm}
          currentBookingDate={currentBookingDate}
          handleEditBooking={handleEditBooking}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
        <DeleteConfirmationModal
          open={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          bookingForm={bookingForm}
          handleDeleteBooking={handleDeleteBooking}
        />
      </div>
    </div>
  );
};

export default AdminCalendar;
