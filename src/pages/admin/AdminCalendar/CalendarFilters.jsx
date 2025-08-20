import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CalendarFilterd = ({ filter, setFilter }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Filter</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <Label htmlFor="guestName">Guest Name</Label>
          <Input
            id="guestName"
            value={filter.guestName}
            onChange={(e) => setFilter((prev) => ({ ...prev, guestName: e.target.value }))}
            placeholder="Search by name..."
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={filter.phone}
            onChange={(e) => setFilter((prev) => ({ ...prev, phone: e.target.value }))}
            placeholder="Search by phone..."
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={filter.status}
            onValueChange={(value) => setFilter((prev) => ({ ...prev, status: value }))}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder={filter.status === "all" ? "All Status" : filter.status.charAt(0).toUpperCase() + filter.status.slice(1)} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="room">Room</Label>
          <Select
            value={filter.room}
            onValueChange={(value) => setFilter((prev) => ({ ...prev, room: value }))}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder={filter.room === "all" ? "All Rooms" : filter.room} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Rooms</SelectItem>
              <SelectItem value="Room 1">Room 1</SelectItem>
              <SelectItem value="Room 2">Room 2</SelectItem>
              <SelectItem value="Room 3">Room 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CalendarFilterd);