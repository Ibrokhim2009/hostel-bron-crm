import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const BookingModal = ({ open, onOpenChange, bookingForm, setBookingForm, editMode, handleBookingSubmit }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editMode ? "Edit Booking" : "Create Booking"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleBookingSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Guest Name *</Label>
            <Input
              id="name"
              value={bookingForm.name}
              onChange={(e) => setBookingForm((prev) => ({ ...prev, name: e.target.value }))}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={bookingForm.email}
              onChange={(e) => setBookingForm((prev) => ({ ...prev, email: e.target.value }))}
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
              onChange={(e) => setBookingForm((prev) => ({ ...prev, phone: e.target.value }))}
              className="mt-1"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="room">Room</Label>
              <Select
                value={bookingForm.room}
                onValueChange={(value) => setBookingForm((prev) => ({ ...prev, room: value }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder={bookingForm.room} />
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
                  setBookingForm((prev) => ({
                    ...prev,
                    guests: Math.max(1, parseInt(e.target.value) || 1),
                  }))
                }
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={bookingForm.status}
              onValueChange={(value) => setBookingForm((prev) => ({ ...prev, status: value }))}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder={bookingForm.status.charAt(0).toUpperCase() + bookingForm.status.slice(1)} />
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
              onChange={(e) => setBookingForm((prev) => ({ ...prev, notes: e.target.value }))}
              placeholder="Additional notes..."
              className="mt-1"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{editMode ? "Update" : "Create"} Booking</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(BookingModal);