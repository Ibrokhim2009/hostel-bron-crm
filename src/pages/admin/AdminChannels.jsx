import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  DollarSign,
  TrendingUp,
  Search,
  Filter,
  Settings,
  Eye,
  BarChart3,
  Users,
  Globe,
  Plane,
  Hotel,
  Building2,
  Plus,
  Power,
  Archive,
  Edit,
  ChevronRight,
  Activity,
  Wifi,
  WifiOff,
  FolderSync,
  Clock1,
} from "lucide-react";

function AdminChannels() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Автообновление времени
  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdate(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Данные каналов продаж
  const [salesChannels, setSalesChannels] = useState([
    {
      id: 1,
      name: "Booking.com",
      type: "OTA",
      icon: Building2,
      status: "active",
      commission: 15,
      bookings: 234,
      revenue: 2340000,
      revenueCents: 12500,
      commissionAmount: 351000,
      lastSync: new Date(Date.now() - 5 * 60 * 1000),
      connected: true,
      growth: "+12%",
      availability: 95,
    },
    {
      id: 2,
      name: "Expedia",
      type: "OTA",
      icon: Plane,
      status: "active",
      commission: 18,
      bookings: 189,
      revenue: 1560000,
      revenueCents: 13700,
      commissionAmount: 280800,
      lastSync: new Date(Date.now() - 12 * 60 * 1000),
      connected: true,
      growth: "+8%",
      availability: 87,
    },
    {
      id: 3,
      name: "Прямые продажи",
      type: "Прямой канал",
      icon: Globe,
      status: "active",
      commission: 0,
      bookings: 156,
      revenue: 3230000,
      revenueCents: 11800,
      commissionAmount: 0,
      lastSync: new Date(Date.now() - 1 * 60 * 1000),
      connected: true,
      growth: "+25%",
      availability: 100,
    },
    {
      id: 4,
      name: "Agoda",
      type: "OTA",
      icon: Hotel,
      status: "inactive",
      commission: 20,
      bookings: 0,
      revenue: 0,
      revenueCents: 0,
      commissionAmount: 0,
      lastSync: null,
      connected: false,
      growth: "0%",
      availability: 0,
    },
  ]);

  // Данные календаря тарифов
  const [tariffCalendar, setTariffCalendar] = useState([
    {
      id: 1,
      date: "пт, 21 июнь",
      dayNumber: 21,
      status: "open",
      baseRate: 5500,
      rates: [
        { channel: "Booking.com", rate: 5500, available: 5, icon: Building2 },
        { channel: "Expedia", rate: 5800, available: 3, icon: Plane },
        { channel: "Прямые продажи", rate: 5000, available: 8, icon: Globe },
      ],
    },
    {
      id: 2,
      date: "сб, 22 июнь",
      dayNumber: 22,
      status: "standard",
      baseRate: 6000,
      rates: [
        { channel: "Booking.com", rate: 6000, available: 2, icon: Building2 },
        { channel: "Expedia", rate: 6300, available: 1, icon: Plane },
        { channel: "Прямые продажи", rate: 5500, available: 5, icon: Globe },
      ],
    },
    {
      id: 3,
      date: "вс, 23 июнь",
      dayNumber: 23,
      status: "standard",
      baseRate: 5500,
      rates: [
        { channel: "Booking.com", rate: 5500, available: 7, icon: Building2 },
        { channel: "Expedia", rate: 5800, available: 4, icon: Plane },
        { channel: "Прямые продажи", rate: 5000, available: 10, icon: Globe },
      ],
    },
  ]);

  // Функции
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(amount)
      .replace("₽", "P");
  };

  const formatTimeAgo = (date) => {
    if (!date) return "Никогда";
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 1) return "Только что";
    if (minutes < 60) return `${minutes} мин назад`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} ч назад`;
    return `${Math.floor(hours / 24)} дн назад`;
  };

  const handleSync = async (channelId) => {
    setIsLoading(true);
    // Имитация синхронизации
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setSalesChannels((prev) =>
      prev.map((channel) =>
        channel.id === channelId
          ? { ...channel, lastSync: new Date() }
          : channel
      )
    );
    setIsLoading(false);
  };

  const handleToggleChannel = (channelId) => {
    setSalesChannels((prev) =>
      prev.map((channel) =>
        channel.id === channelId
          ? {
              ...channel,
              status: channel.status === "active" ? "inactive" : "active",
              connected: !channel.connected,
            }
          : channel
      )
    );
  };

  const updateTariff = (dayId, channelName, newRate) => {
    setTariffCalendar((prev) =>
      prev.map((day) =>
        day.id === dayId
          ? {
              ...day,
              rates: day.rates.map((rate) =>
                rate.channel === channelName ? { ...rate, rate: newRate } : rate
              ),
            }
          : day
      )
    );
  };

  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-emerald-100 text-emerald-800 border-emerald-200"
      : "bg-red-100 text-red-800 border-red-200";
  };

  const getStatusIcon = (connected) => {
    return connected ? (
      <Wifi className="h-3 w-3" />
    ) : (
      <WifiOff className="h-3 w-3" />
    );
  };

  const filteredChannels = salesChannels.filter((channel) => {
    const matchesSearch = channel.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "active" && channel.status === "active") ||
      (selectedFilter === "inactive" && channel.status === "inactive");
    return matchesSearch && matchesFilter;
  });

  // Подсчет общей статистики
  const totalRevenue = salesChannels.reduce(
    (sum, channel) => sum + channel.revenue,
    0
  );
  const totalCommission = salesChannels.reduce(
    (sum, channel) => sum + channel.commissionAmount,
    0
  );
  const activeChannels = salesChannels.filter(
    (channel) => channel.status === "active"
  ).length;
  const avgCommission =
    salesChannels.length > 0
      ? Math.round(
          salesChannels.reduce((sum, channel) => sum + channel.commission, 0) /
            salesChannels.length
        )
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Улучшенная статистика */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">
                    {activeChannels}
                  </p>
                  <p className="text-sm font-medium text-gray-600">
                    Активных каналов
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-emerald-100">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">
                    {formatCurrency(totalRevenue)}
                  </p>
                  <p className="text-sm font-medium text-gray-600">
                    Общая выручка
                  </p>
                  <Badge className="bg-green-100 text-green-700 text-xs mt-1">
                    +15% за месяц
                  </Badge>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-red-50 to-rose-100">
            <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-rose-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">
                    {formatCurrency(totalCommission)}
                  </p>
                  <p className="text-sm font-medium text-gray-600">Комиссии</p>
                  <Badge className="bg-red-100 text-red-700 text-xs mt-1">
                    -3% за неделю
                  </Badge>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-violet-100">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-violet-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">
                    {avgCommission}%
                  </p>
                  <p className="text-sm font-medium text-gray-600">
                    Средняя комиссия
                  </p>
                  <Badge className="bg-purple-100 text-purple-700 text-xs mt-1">
                    Оптимально
                  </Badge>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Каналы продаж - улучшенная версия */}
          <div className="xl:col-span-2">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                        <Settings className="h-4 w-4 text-white" />
                      </div>
                      Каналы продаж
                    </CardTitle>
                    <p className="text-gray-600 mt-1">
                      Управление подключенными каналами
                    </p>
                  </div>
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                    onClick={() => {
                      // Добавление нового канала
                      const newChannel = {
                        id: Date.now(),
                        name: "Новый канал",
                        type: "OTA",
                        icon: Hotel,
                        status: "inactive",
                        commission: 0,
                        bookings: 0,
                        revenue: 0,
                        connected: false,
                      };
                      setSalesChannels([...salesChannels, newChannel]);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Подключить канал
                  </Button>
                </div>

                {/* Поиск и фильтры */}
                <div className="flex gap-3 mt-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Поиск каналов..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className={`${
                      showFilters ? "bg-blue-50 border-blue-200" : ""
                    }`}
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>

                {/* Фильтры */}
                {showFilters && (
                  <div className="flex gap-2 mt-4 p-4 bg-gray-50 rounded-lg">
                    {["all", "active", "inactive"].map((filter) => (
                      <Button
                        key={filter}
                        variant={
                          selectedFilter === filter ? "default" : "ghost"
                        }
                        size="sm"
                        onClick={() => setSelectedFilter(filter)}
                        className="capitalize"
                      >
                        {filter === "all"
                          ? "Все"
                          : filter === "active"
                          ? "Активные"
                          : "Неактивные"}
                      </Button>
                    ))}
                  </div>
                )}
              </CardHeader>

              <CardContent className="space-y-4">
                {filteredChannels.map((channel) => {
                  const IconComponent = channel.icon;
                  return (
                    <div
                      key={channel.id}
                      className={`border-2 rounded-xl p-6 transition-all duration-300 cursor-pointer hover:shadow-lg
                        ${
                          selectedChannel === channel.id
                            ? "border-blue-200 bg-blue-50 shadow-md"
                            : "border-gray-100 hover:border-gray-200 bg-white"
                        }`}
                      onClick={() =>
                        setSelectedChannel(
                          selectedChannel === channel.id ? null : channel.id
                        )
                      }
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                        {/* Основная информация канала */}
                        <div className="flex items-center gap-4 flex-1">
                          <div
                            className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300
                            ${
                              channel.connected
                                ? "bg-gradient-to-br from-blue-100 to-indigo-100"
                                : "bg-gray-100"
                            }`}
                          >
                            <IconComponent
                              className={`h-7 w-7 ${
                                channel.connected
                                  ? "text-blue-600"
                                  : "text-gray-400"
                              }`}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="text-lg font-bold text-gray-900">
                                {channel.name}
                              </h3>
                              {getStatusIcon(channel.connected)}
                              <Badge
                                className={`${getStatusColor(
                                  channel.status
                                )} text-xs`}
                              >
                                {channel.status === "active"
                                  ? "Активен"
                                  : "Неактивен"}
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-2">{channel.type}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>Доступность: {channel.availability}%</span>
                              <span className="text-green-600 font-medium">
                                {channel.growth}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Метрики */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center lg:text-left">
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">
                              Бронирований
                            </p>
                            <p className="text-xl font-bold text-gray-900">
                              {channel.bookings}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">Доход</p>
                            <p className="text-xl font-bold text-gray-900">
                              {formatCurrency(channel.revenue)}
                            </p>
                            <p className="text-xs text-green-600">
                              +{formatCurrency(channel.revenueCents)}/день
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">Комиссия</p>
                            <p className="text-lg font-bold text-red-600">
                              {channel.commission}%
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatCurrency(channel.commissionAmount)}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">
                              Синхронизация
                            </p>
                            <p className="text-sm font-medium text-gray-700">
                              {formatTimeAgo(channel.lastSync)}
                            </p>
                          </div>
                        </div>

                        {/* Действия */}
                        <div className="flex items-center gap-2">
                          <ChevronRight
                            className={`h-5 w-5 text-gray-400 transition-transform duration-200 
                            ${
                              selectedChannel === channel.id ? "rotate-90" : ""
                            }`}
                          />
                        </div>
                      </div>

                      {/* Развернутые действия */}
                      {selectedChannel === channel.id && (
                        <div className="mt-6 pt-6 border-t border-gray-200 animate-in slide-in-from-top-2 duration-300">
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-2 hover:bg-blue-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Настройки канала
                              }}
                            >
                              <Settings className="h-4 w-4" />
                              Настройки
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-2 hover:bg-green-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSync(channel.id);
                              }}
                              disabled={isLoading}
                            >
                              <FolderSync
                                className={`h-4 w-4 ${
                                  isLoading ? "animate-spin" : ""
                                }`}
                              />
                              {isLoading
                                ? "Синхронизация..."
                                : "Синхронизировать"}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-2 hover:bg-orange-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleChannel(channel.id);
                              }}
                            >
                              <Power className="h-4 w-4" />
                              {channel.status === "active"
                                ? "Отключить"
                                : "Включить"}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-2 hover:bg-gray-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Архивирование
                              }}
                            >
                              <Archive className="h-4 w-4" />
                              Архивировать
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Календарь тарифов - улучшенная версия */}
          <div>
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  Календарь тарифов
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Управление ценами и доступностью
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {tariffCalendar.map((day) => (
                  <div
                    key={day.id}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 bg-white"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                            <span className="text-lg font-bold text-blue-600">
                              {day.dayNumber}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {day.date}
                            </p>
                            <p className="text-sm text-gray-600 capitalize">
                              {day.status}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                        {formatCurrency(day.baseRate)}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                        Тарифы по каналам
                      </p>
                      {day.rates.map((rate, rateIndex) => {
                        const IconComponent = rate.icon;
                        return (
                          <div
                            key={rateIndex}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center group-hover:scale-110 transition-transform">
                                <IconComponent className="h-3 w-3 text-gray-600" />
                              </div>
                              <span className="text-sm text-gray-700 font-medium">
                                {rate.channel}
                              </span>
                            </div>
                            <div className="text-right">
                              <input
                                type="number"
                                value={rate.rate}
                                onChange={(e) =>
                                  updateTariff(
                                    day.id,
                                    rate.channel,
                                    parseInt(e.target.value)
                                  )
                                }
                                className="w-20 text-sm font-bold text-right border-none bg-transparent focus:bg-white focus:border focus:border-blue-300 rounded px-1"
                              />
                              <p className="text-xs text-gray-500">
                                {rate.available} номеров
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 h-8 text-xs hover:bg-blue-50"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Редактировать
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 h-8 text-xs hover:bg-green-50"
                      >
                        <FolderSync className="h-3 w-3 mr-1" />
                        Синхронизировать
                      </Button>
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  className="w-full mt-4 border-dashed border-2 hover:bg-blue-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить даты
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Последние бронирования */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  Последние бронирования
                </CardTitle>
                <p className="text-gray-600">
                  Актуальная информация о новых заказах
                </p>
              </div>
              <Button variant="outline" className="hover:bg-blue-50">
                <Eye className="h-4 w-4 mr-2" />
                Все бронирования
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  guest: "Иван Петров",
                  channel: "Booking.com",
                  checkIn: "2024-06-25",
                  checkOut: "2024-06-27",
                  amount: 12000,
                  status: "confirmed",
                  time: "2 мин назад",
                  icon: Building2,
                  room: "Стандарт",
                },
                {
                  id: 2,
                  guest: "Maria Garcia",
                  channel: "Expedia",
                  checkIn: "2024-06-26",
                  checkOut: "2024-06-29",
                  amount: 18500,
                  status: "pending",
                  time: "15 мин назад",
                  icon: Plane,
                  room: "Делюкс",
                },
                {
                  id: 3,
                  guest: "Анна Сидорова",
                  channel: "Прямые продажи",
                  checkIn: "2024-06-28",
                  checkOut: "2024-06-30",
                  amount: 15000,
                  status: "confirmed",
                  time: "1 ч назад",
                  icon: Globe,
                  room: "Люкс",
                },
              ].map((booking) => {
                const IconComponent = booking.icon;
                return (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200 bg-gradient-to-r from-white to-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-semibold text-gray-900">
                            {booking.guest}
                          </h4>
                          <Badge
                            className={`text-xs ${
                              booking.status === "confirmed"
                                ? "bg-green-100 text-green-700 border-green-200"
                                : "bg-orange-100 text-orange-700 border-orange-200"
                            }`}
                          >
                            {booking.status === "confirmed"
                              ? "Подтверждено"
                              : "Ожидает"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {booking.channel} • {booking.room}
                        </p>
                        <p className="text-xs text-gray-500">
                          {booking.checkIn} - {booking.checkOut}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        {formatCurrency(booking.amount)}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock1 className="h-3 w-3" />
                        <span>{booking.time}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Аналитика каналов */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-4 w-4 text-white" />
              </div>
              Аналитика по каналам
            </CardTitle>
            <p className="text-gray-600">Детальная статистика продаж</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* График производительности каналов */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Производительность каналов
                </h3>
                {salesChannels
                  .filter((c) => c.status === "active")
                  .map((channel) => {
                    const IconComponent = channel.icon;
                    const percentage =
                      totalRevenue > 0
                        ? (channel.revenue / totalRevenue) * 100
                        : 0;
                    return (
                      <div key={channel.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <IconComponent className="h-4 w-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-900">
                              {channel.name}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-bold text-gray-900">
                              {percentage.toFixed(1)}%
                            </span>
                            <p className="text-xs text-gray-500">
                              {formatCurrency(channel.revenue)}
                            </p>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Топ метрики */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Ключевые показатели
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Рост продаж
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">+18%</p>
                    <p className="text-xs text-green-600">за последний месяц</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Конверсия
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">12.4%</p>
                    <p className="text-xs text-blue-600">+2.1% к прошлому</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium text-gray-700">
                        AOV
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(8750)}
                    </p>
                    <p className="text-xs text-green-600">+5.2% к прошлому</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Занятость
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">87%</p>
                    <p className="text-xs text-blue-600">отличный показатель</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

}

export default AdminChannels;
