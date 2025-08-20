import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const CalendarModals = ({
  isBookingModalOpen,
  setIsBookingModalOpen,
  bookingForm,
  setBookingForm,
  handleBookingSubmit,
  selectedRoom,
  isInfoModalOpen,
  setIsInfoModalOpen,
  currentBookingDate,
  bookings,
  selectedProperty,
  currentBookingId,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  handleDeleteBooking,
}) => {
  const bookingModal = () => (
    <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Enter booking
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleBookingSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={bookingForm.name}
              onChange={(e) =>
                setBookingForm({ ...bookingForm, name: e.target.value })
              }
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={bookingForm.email}
              onChange={(e) =>
                setBookingForm({ ...bookingForm, email: e.target.value })
              }
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={bookingForm.phone}
              onChange={(e) =>
                setBookingForm({ ...bookingForm, phone: e.target.value })
              }
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="room">Room</Label>
            <Select
              value={bookingForm.room}
              onValueChange={(value) => {
                setBookingForm({ ...bookingForm, room: value });
              }}
            >
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Select room" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Room 1">Room 1</SelectItem>
                <SelectItem value="Room 2">Room 2</SelectItem>
                <SelectItem value="Room 3">Room 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="guests">Guests</Label>
            <Input
              id="guests"
              type="number"
              min="1"
              value={bookingForm.guests}
              onChange={(e) =>
                setBookingForm({
                  ...bookingForm,
                  guests: Math.max(1, parseInt(e.target.value) || 1),
                })
              }
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={bookingForm.status}
              onValueChange={(value) =>
                setBookingForm({ ...bookingForm, status: value })
              }
            >
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={bookingForm.notes}
              onChange={(e) =>
                setBookingForm({ ...bookingForm, notes: e.target.value })
              }
              className="mt-1"
              rows={4}
            />
          </div>
          <DialogFooter className="flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => setIsBookingModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );

  const infoModal = () => (
    <Dialog open={isInfoModalOpen} onOpenChange={setIsInfoModalOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Booking Info</DialogTitle>
        </DialogHeader>
        {currentBookingDate && bookings[currentBookingDate.toDateString()] && (
          <div className="space-y-4">
            <p className="text-gray-700">
              <strong>Date:</strong>{" "}
              {new Date(currentBookingDate).toLocaleDateString()}
            </p>
            <p className="text-gray-700">
              <strong>Property:</strong> {selectedProperty}
            </p>
            <p className="text-gray-700">
              <strong>Room:</strong>{" "}
              {bookings[currentBookingDate.toDateString()].room}
            </p>
            <p className="text-gray-700">
              <strong>Name:</strong>{" "}
              {bookings[currentBookingDate.toDateString()].name}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong>{" "}
              {bookings[currentBookingDate.toDateString()].email}
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong>{" "}
              {bookings[currentBookingDate.toDateString()].phone ||
                "Not provided"}
            </p>
            <p className="text-gray-700">
              <strong>Guests:</strong>{" "}
              {bookings[currentBookingDate.toDateString()].guests}
            </p>
            <p className="text-gray-700">
              <strong>Status:</strong>{" "}
              {bookings[currentBookingDate.toDateString()].status ===
              "confirmed"
                ? "Confirmed"
                : bookings[currentBookingDate.toDateString()].status ===
                  "pending"
                ? "Pending"
                : "Canceled"}
            </p>
            <p className="text-gray-700">
              <strong>Notes:</strong>{" "}
              {bookings[currentBookingDate.toDateString()].notes || "None"}
            </p>
          </div>
        )}
        <DialogFooter className="flex justify-between">
          <Button
            variant="destructive"
            onClick={() => {
              setIsInfoModalOpen(false);
              setIsDeleteModalOpen(true);
            }}
          >
            Delete
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setIsInfoModalOpen(false);
              setIsBookingModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Button variant="outline" onClick={() => setIsInfoModalOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  const deleteModal = () => (
    <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Confirm Delete
          </DialogTitle>
        </DialogHeader>
        <p className="text-gray-700">
          Are you sure you want to delete this booking?
        </p>
        <DialogFooter className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDeleteBooking}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
  return (
    <>
      {bookingModal()}
      {infoModal()}
      {deleteModal()}
    </>
  );
};

export default CalendarModals;
