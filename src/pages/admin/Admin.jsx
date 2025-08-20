import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import AdminDashboard from "./AdminDashboard";
import AdminHotels from "./AdminHotels";
import AdminRoom from "./AdminRoom";
import AdminGuests from "./AdminGuests";
import AdminBook from "./AdminBook";
import AdminCleaning from "./AdminCleaning";
import AdminChannels from "./AdminChannels";
import AdminCalendar from "./AdminCalendar/AdminCalendar";

export default function Admin() {
  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      {/* Фиксированный сайдбар */}
      <div className="hidden lg:block h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Основная часть */}
      <div className="flex-1 flex flex-col">
        <div className="sticky top-0 z-30">
          <Navbar />
        </div>
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="hotels" element={<AdminHotels />} />
            <Route path="rooms" element={<AdminRoom />} />
            <Route path="guests" element={<AdminGuests />} />
            <Route path="book" element={<AdminBook />} />
            <Route path="cleaning" element={<AdminCleaning />} />
            <Route path="channels" element={<AdminChannels />} />
            <Route path="calendar" element={<AdminCalendar />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
