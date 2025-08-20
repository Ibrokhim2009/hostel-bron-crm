import React, { useState } from "react";
import {
  Search,
  Bell,
  User,
  Menu,
  X,
  ChevronDown,
  Settings,
  LogOut,
  Shield,
  Zap,
  Clock,
  AlertCircle,
  CheckCircle,
  Star,
  Activity,
} from "lucide-react";

export default function Navbar() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "Новое бронирование в отеле 'Гранд Плаза'",
      time: "5 минут назад",
      unread: true,
      type: "success",
      icon: CheckCircle,
    },
    {
      id: 2,
      text: "Гость отменил бронирование номера 305",
      time: "1 час назад",
      unread: true,
      type: "warning",
      icon: AlertCircle,
    },
    {
      id: 3,
      text: "Требуется уборка номера 205",
      time: "2 часа назад",
      unread: false,
      type: "info",
      icon: Clock,
    },
    {
      id: 4,
      text: "Новый отзыв на отель получен",
      time: "3 часа назад",
      unread: false,
      type: "info",
      icon: Star,
    },
  ]);

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  const getNotificationStyles = (type) => {
    switch (type) {
      case "success":
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "warning":
        return "text-amber-600 bg-amber-50 border-amber-200";
      case "info":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="bg-white/95 backdrop-blur-xl border-b border-gray-200/60 sticky top-0 z-30 shadow-lg shadow-gray-100/50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Search Section */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <div
                  className={`
                  absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300
                  ${isSearchFocused ? "text-indigo-500" : "text-gray-400"}
                `}
                >
                  <Search className="h-5 w-5" strokeWidth={2} />
                </div>
                <input
                  type="text"
                  placeholder="Поиск по отелям, номерам, гостям..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className={`
                    block w-full pl-12 pr-4 py-3 text-sm rounded-2xl border transition-all duration-300
                    focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400
                    ${
                      isSearchFocused
                        ? "bg-white border-indigo-300 shadow-xl shadow-indigo-100/50 scale-105"
                        : "bg-gray-50/70 border-gray-200 hover:bg-white hover:border-gray-300 hover:shadow-md"
                    }
                  `}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Actions Section */}
            <div className="hidden lg:flex items-center space-x-4 px-4 py-1 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">24</div>
                <div className="text-xs text-gray-500">Активных</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-lg font-bold text-emerald-600">85%</div>
                <div className="text-xs text-gray-500">Загрузка</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {/* Quick Stats */}

              {/* Quick Action Button */}
              <button className="hidden md:flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-indigo-200/60 hover:shadow-xl hover:shadow-indigo-300/60 active:scale-95 group">
                <Zap className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                <span>Быстрое бронирование</span>
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="relative p-3 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 transition-all duration-200 group active:scale-95"
                  aria-label={`Уведомления, ${unreadCount} непрочитанных`}
                >
                  <Bell
                    className="h-5 w-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-200"
                    strokeWidth={2}
                  />
                  {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 min-w-[22px] h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1.5 shadow-lg animate-bounce">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </div>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {isNotificationsOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsNotificationsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200/50 z-50 overflow-hidden">
                      {/* Header */}
                      <div className="p-5 bg-gradient-to-r from-gray-50 via-white to-gray-50 border-b border-gray-200/50">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">
                              Уведомления
                            </h3>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {unreadCount > 0
                                ? `${unreadCount} новых уведомлений`
                                : "Все уведомления прочитаны"}
                            </p>
                          </div>
                          {unreadCount > 0 && (
                            <button
                              onClick={markAllAsRead}
                              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold transition-colors px-2 py-1 rounded-lg hover:bg-indigo-50"
                            >
                              Отметить все
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Notifications List */}
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((notification) => {
                            const IconComponent = notification.icon;
                            return (
                              <div
                                key={notification.id}
                                className={`
                                  p-4 border-b border-gray-100 hover:bg-gray-50/50 transition-all duration-200 cursor-pointer
                                  ${notification.unread ? "bg-blue-50/30" : ""}
                                `}
                                onClick={() => markAsRead(notification.id)}
                              >
                                <div className="flex items-start space-x-3">
                                  <div
                                    className={`
                                    flex-shrink-0 w-8 h-8 rounded-lg border flex items-center justify-center
                                    ${getNotificationStyles(notification.type)}
                                  `}
                                  >
                                    <IconComponent
                                      className="h-4 w-4"
                                      strokeWidth={2}
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p
                                      className={`text-sm font-medium ${
                                        notification.unread
                                          ? "text-gray-900"
                                          : "text-gray-700"
                                      }`}
                                    >
                                      {notification.text}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1 flex items-center">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {notification.time}
                                    </p>
                                  </div>
                                  {notification.unread && (
                                    <div className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0"></div>
                                  )}
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="p-8 text-center">
                            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 text-sm font-medium">
                              Нет уведомлений
                            </p>
                            <p className="text-gray-400 text-xs mt-1">
                              Все уведомления будут появляться здесь
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Footer */}
                      {notifications.length > 0 && (
                        <div className="p-3 bg-gray-50/50 border-t border-gray-200/50">
                          <div className="flex items-center justify-between">
                            <button
                              onClick={clearAllNotifications}
                              className="text-xs text-red-600 hover:text-red-800 font-semibold transition-colors px-2 py-1 rounded-lg hover:bg-red-50"
                            >
                              Очистить все
                            </button>
                            <button className="text-xs text-gray-600 hover:text-gray-800 font-semibold transition-colors px-2 py-1 rounded-lg hover:bg-gray-100">
                              Показать все
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 transition-all duration-200 group active:scale-95"
                  aria-label="Профиль пользователя"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    А
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-semibold text-gray-900">
                      Администратор
                    </div>
                    <div className="text-xs text-gray-500">
                      admin@hotelpro.com
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsProfileOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200/50 z-50 overflow-hidden">
                      {/* Profile Header */}
                      <div className="p-4 bg-gradient-to-r from-indigo-50 via-white to-purple-50 border-b border-gray-200/50">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg">
                            А
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900">
                              Администратор
                            </div>
                            <div className="text-xs text-gray-500">
                              admin@hotelpro.com
                            </div>
                            <div className="text-xs text-indigo-600 font-medium mt-1">
                              Онлайн
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <button className="w-full px-4 py-3 text-left flex items-center space-x-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors group">
                          <User className="h-4 w-4 group-hover:scale-110 transition-transform" />
                          <span className="text-sm font-medium">
                            Мой профиль
                          </span>
                        </button>

                        <button className="w-full px-4 py-3 text-left flex items-center space-x-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors group">
                          <Settings className="h-4 w-4 group-hover:scale-110 transition-transform" />
                          <span className="text-sm font-medium">Настройки</span>
                        </button>

                        <button className="w-full px-4 py-3 text-left flex items-center space-x-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors group">
                          <Shield className="h-4 w-4 group-hover:scale-110 transition-transform" />
                          <span className="text-sm font-medium">
                            Безопасность
                          </span>
                        </button>

                        <div className="border-t border-gray-200 my-2"></div>

                        <button className="w-full px-4 py-3 text-left flex items-center space-x-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors group">
                          <LogOut className="h-4 w-4 group-hover:scale-110 transition-transform" />
                          <span className="text-sm font-medium">Выйти</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button className="md:hidden p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 transition-all duration-200 active:scale-95">
                <Menu className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
