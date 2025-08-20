import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  CalendarCheck,
  DoorOpen,
  Globe,
  Hotel,
  LayoutDashboard,
  OctagonAlert,
  Users,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const adminSidebar = [
  { title: "Аналитика", icon: LayoutDashboard, path: "/admin" },
  { title: "Отели", icon: Hotel, path: "/admin/hotels" },
  { title: "Номера", icon: DoorOpen, path: "/admin/rooms" },
  { title: "Гости", icon: Users, path: "/admin/guests" },
  { title: "Бронирование", icon: CalendarCheck, path: "/admin/book" },
  { title: "Уборка", icon: OctagonAlert, path: "/admin/cleaning" },
  { title: "Каналы", icon: Globe, path: "/admin/channels" },
  { title: "Календарь", icon: Globe, path: "/admin/calendar" },
];

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="h-screen">
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 h-11 w-11 bg-white/90 backdrop-blur-md border-2 border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:border-gray-300 active:scale-95"
      >
        {isOpen ? (
          <X className="h-5 w-5 text-gray-700" />
        ) : (
          <Menu className="h-5 w-5 text-gray-700" />
        )}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen bg-white/95 backdrop-blur-md border-r border-gray-200/50 z-40
          transition-all duration-300 ease-in-out
          lg:static
          ${isCollapsed ? "w-16" : "w-64"}
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          shadow-2xl lg:shadow-lg
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200/50 bg-white/30 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 rounded-xl flex items-center justify-center shadow-lg">
                      <Hotel className="text-white h-4 w-4" strokeWidth={2.5} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                      HotelPro
                    </h1>
                    <p className="text-xs text-gray-500 font-medium tracking-wide">
                      Управление отелями
                    </p>
                  </div>
                </div>
              )}
              
              <button
                onClick={toggleCollapse}
                className="hidden lg:flex h-8 w-8 rounded-lg hover:bg-gray-100 transition-all duration-200 items-center justify-center group active:scale-95"
              >
                {isCollapsed ? (
                  <ChevronRight className="h-4 w-4 text-gray-600 group-hover:text-gray-800" />
                ) : (
                  <ChevronLeft className="h-4 w-4 text-gray-600 group-hover:text-gray-800" />
                )}
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-1.5 overflow-hidden">
            {adminSidebar.map((item, index) => {
              const isActive = location.pathname === item.path;
              
              return (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <NavLink
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`
                      relative w-full flex items-center rounded-xl text-left transition-all duration-300 group
                      hover:shadow-md hover:shadow-gray-200/60 active:scale-[0.98]
                      ${isCollapsed ? "justify-center p-3" : "space-x-3 px-3 py-3"}
                      ${
                        isActive 
                          ? "bg-gradient-to-r from-blue-200 via-blue-300 to-blue-300 text-blue-700 shadow-sm border border-blue-100/80 transform scale-[1.02]" 
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50/80"
                      }
                    `}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-gradient-to-b from-red-500 via-red-500 to-pink-500 rounded-r-full shadow-sm"></div>
                    )}
                    
                    {/* Icon container */}
                    <div className={`
                      flex items-center justify-center transition-all duration-300 relative
                      ${hoveredItem === index ? "scale-110" : ""}
                      ${isActive ? "text-indigo-600" : ""}
                    `}>
                      <item.icon 
                        className="h-5 w-5" 
                        strokeWidth={isActive ? 2.5 : 2} 
                      />
                      
                      {/* Glow effect on hover */}
                      {hoveredItem === index && (
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-lg scale-150"></div>
                      )}
                    </div>
                    
                    {/* Title */}
                    {!isCollapsed && (
                      <span className={`
                        font-semibold text-sm tracking-wide transition-all duration-300
                        ${isActive ? "text-indigo-800" : ""}
                      `}>
                        {item.title}
                      </span>
                    )}
                    
                    {/* Background gradient on hover */}
                    <div className={`
                      absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300
                      bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5
                    `}></div>
                  </NavLink>

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && hoveredItem === index && (
                    <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg shadow-xl opacity-0 animate-in fade-in-50 slide-in-from-left-2 duration-200">
                      {item.title}
                      <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Footer status */}
          {!isCollapsed && (
            <div className="p-4 border-t border-gray-200/50 bg-white/30 backdrop-blur-sm">
              <div className="flex items-center space-x-3 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-sm"></div>
                  <span className="text-gray-600 font-medium">Все системы работают</span>
                </div>
                <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Sidebar);