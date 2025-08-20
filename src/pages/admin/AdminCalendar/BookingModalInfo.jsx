import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Users, Edit, Trash2 } from "lucide-react";

const BookingInfoModal = ({ open, onOpenChange, bookingForm, currentBookingDate, handleEditBooking, setIsDeleteModalOpen }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed": return "bg-green-600";
      case "pending": return "bg-yellow-600";
      case "canceled": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  const formatDisplayDate = (date) => date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-500">Guest Name</Label>
              <p className="text-base">{bookingForm.name}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Status</Label>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(bookingForm.status)}`}>
                {bookingForm.status?.charAt(0).toUpperCase() + bookingForm.status?.slice(1)}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-500">Email</Label>
              <p className="text-base">{bookingForm.email}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Phone</Label>
              <p className="text-base">{bookingForm.phone || "N/A"}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-500">Room</Label>
              <p className="text-base">{bookingForm.room}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Guests</Label>
              <p className="text-base flex items-center">
                <Users className="h-4 w-4 mr-1 text-gray-600" />
                {bookingForm.guests}
              </p>
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-500">Date</Label>
            <p className="text-base">{currentBookingDate && formatDisplayDate(currentBookingDate)}</p>
          </div>
          {bookingForm.notes && (
            <div>
              <Label className="text-sm font-medium text-gray-500">Notes</Label>
              <p className="text-base bg-gray-50 p-3 rounded-md">{bookingForm.notes}</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button
            variant="outline"
            onClick={handleEditBooking}
            className="flex items-center space-x-2"
          >
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onOpenChange(false);
              setIsDeleteModalOpen(true);
            }}
            className="flex items-center space-x-2"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(BookingInfoModal);