import React, { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  Users,
  Globe,
  CreditCard,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

function AdminGuests() {
  const [guests, setGuests] = useState([
    {
      id: 1,
      name: "Александр Петров",
      email: "a.petrov@email.com",
      phone: "+7 (903) 123-45-67",
      address: "ул. Тверская, 10, Москва",
      country: "Россия",
      totalBookings: 5,
      totalSpent: 960000,
      registrationDate: "01.06.2024",
      lastVisit: "15.07.2024",
      status: "vip",
      guestType: "Постоянный",
      loyalty: "Золотой",
      notes: "Предпочитает номера с видом на город",
    },
    {
      id: 2,
      name: "Мария Иванова",
      email: "m.ivanova@company.ru",
      phone: "+7 (916) 987-65-43",
      address: "пр. Невский, 25, Санкт-Петербург",
      country: "Россия",
      totalBookings: 3,
      totalSpent: 321000,
      registrationDate: "05.05.2024",
      lastVisit: "12.06.2024",
      status: "regular",
      guestType: "Потрачено",
      loyalty: "Серебряный",
      notes: "Аллергия на орехи",
    },
    {
      id: 3,
      name: "John Smith",
      email: "j.smith@international.com",
      phone: "+1 (555) 123-4567",
      address: "New York, USA",
      country: "США",
      totalBookings: 2,
      totalSpent: 590000,
      registrationDate: "10.06.2024",
      lastVisit: "01.07.2024",
      status: "vip",
      guestType: "Потрачено",
      loyalty: "Золотой",
      notes: "Бизнес-путешественник, предпочитает ранний check-in",
    },
    {
      id: 4,
      name: "Елена Козлова",
      email: "e.kozlova@gmail.com",
      phone: "+7 (925) 555-12-34",
      address: "ул. Арбат, 15, Москва",
      country: "Россия",
      totalBookings: 1,
      totalSpent: 119000,
      registrationDate: "15.06.2024",
      lastVisit: "20.06.2024",
      status: "new",
      guestType: "Потрачено",
      loyalty: "Стандарт",
      notes: "Первое посещение, интересуется спа-услугами",
    },
    {
      id: 5,
      name: "Anna Schmidt",
      email: "a.schmidt@berlin.de",
      phone: "+49 30 12345678",
      address: "Berlin, Germany",
      country: "Германия",
      totalBookings: 4,
      totalSpent: 680000,
      registrationDate: "20.04.2024",
      lastVisit: "05.07.2024",
      status: "vip",
      guestType: "Постоянный",
      loyalty: "Золотой",
      notes: "Путешествует с семьей, нужна детская кроватка",
    },
    {
      id: 6,
      name: "David Johnson",
      email: "d.johnson@corp.com",
      phone: "+1 (555) 987-6543",
      address: "Los Angeles, USA",
      country: "США",
      totalBookings: 7,
      totalSpent: 1250000,
      registrationDate: "10.03.2024",
      lastVisit: "18.07.2024",
      status: "vip",
      guestType: "Постоянный",
      loyalty: "Платиновый",
      notes: "Корпоративный клиент, часто бронирует для деловых встреч",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");
  const [loyaltyFilter, setLoyaltyFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newGuest, setNewGuest] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    status: "new",
    guestType: "Потрачено",
    loyalty: "Стандарт",
    notes: "",
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "vip":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "regular":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "new":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "vip":
        return "VIP";
      case "regular":
        return "Постоянный";
      case "new":
        return "Новый";
      default:
        return status;
    }
  };

  const getLoyaltyColor = (loyalty) => {
    switch (loyalty) {
      case "Платиновый":
        return "bg-gray-800 text-white";
      case "Золотой":
        return "bg-yellow-500 text-white";
      case "Серебряный":
        return "bg-gray-400 text-white";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const filteredGuests = guests.filter((guest) => {
    const matchesSearch =
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.phone.includes(searchTerm);
    const matchesStatus =
      statusFilter === "all" || guest.status === statusFilter;
    const matchesCountry =
      countryFilter === "all" || guest.country === countryFilter;
    const matchesLoyalty =
      loyaltyFilter === "all" || guest.loyalty === loyaltyFilter;
    return matchesSearch && matchesStatus && matchesCountry && matchesLoyalty;
  });

  const handleAddGuest = () => {
    if (newGuest.name && newGuest.email && newGuest.phone) {
      const guest = {
        ...newGuest,
        id: Date.now(),
        totalBookings: 0,
        totalSpent: 0,
        registrationDate: new Date().toLocaleDateString("ru-RU"),
        lastVisit: "-",
      };
      setGuests([...guests, guest]);
      setNewGuest({
        name: "",
        email: "",
        phone: "",
        address: "",
        country: "",
        status: "new",
        guestType: "Потрачено",
        loyalty: "Стандарт",
        notes: "",
      });
      setIsAddModalOpen(false);
    }
  };

  const uniqueCountries = [...new Set(guests.map((guest) => guest.country))];
  const uniqueLoyalty = [...new Set(guests.map((guest) => guest.loyalty))];

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            База гостей
          </h1>
          <p className="text-gray-600 mt-1">Все зарегистрированные гости</p>
        </div>

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Добавить гостя
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Добавить нового гостя</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="guestName">Имя и фамилия</Label>
                <Input
                  id="guestName"
                  value={newGuest.name}
                  onChange={(e) =>
                    setNewGuest((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Иван Иванов"
                />
              </div>

              <div>
                <Label htmlFor="guestEmail">Email</Label>
                <Input
                  id="guestEmail"
                  type="email"
                  value={newGuest.email}
                  onChange={(e) =>
                    setNewGuest((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="ivan@example.com"
                />
              </div>

              <div>
                <Label htmlFor="guestPhone">Телефон</Label>
                <Input
                  id="guestPhone"
                  value={newGuest.phone}
                  onChange={(e) =>
                    setNewGuest((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="+7 (999) 123-45-67"
                />
              </div>

              <div>
                <Label htmlFor="guestAddress">Адрес</Label>
                <Input
                  id="guestAddress"
                  value={newGuest.address}
                  onChange={(e) =>
                    setNewGuest((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  placeholder="г. Москва, ул. Примерная, 1"
                />
              </div>

              <div>
                <Label htmlFor="guestCountry">Страна</Label>
                <Input
                  id="guestCountry"
                  value={newGuest.country}
                  onChange={(e) =>
                    setNewGuest((prev) => ({
                      ...prev,
                      country: e.target.value,
                    }))
                  }
                  placeholder="Россия"
                />
              </div>

              <div>
                <Label htmlFor="guestStatus">Статус</Label>
                <Select
                  value={newGuest.status}
                  onValueChange={(value) =>
                    setNewGuest((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите статус" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">Новый</SelectItem>
                    <SelectItem value="regular">Постоянный</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="guestLoyalty">Программа лояльности</Label>
                <Select
                  value={newGuest.loyalty}
                  onValueChange={(value) =>
                    setNewGuest((prev) => ({ ...prev, loyalty: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите уровень" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Стандарт">Стандарт</SelectItem>
                    <SelectItem value="Серебряный">Серебряный</SelectItem>
                    <SelectItem value="Золотой">Золотой</SelectItem>
                    <SelectItem value="Платиновый">Платиновый</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="guestNotes">Заметки</Label>
                <Textarea
                  id="guestNotes"
                  value={newGuest.notes}
                  onChange={(e) =>
                    setNewGuest((prev) => ({ ...prev, notes: e.target.value }))
                  }
                  placeholder="Особенности и предпочтения гостя..."
                  rows={3}
                />
              </div>

              <Button onClick={handleAddGuest} className="w-full">
                Добавить гостя
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Поиск по имени, email или телефону..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все статусы</SelectItem>
            <SelectItem value="vip">VIP</SelectItem>
            <SelectItem value="regular">Постоянный</SelectItem>
            <SelectItem value="new">Новый</SelectItem>
          </SelectContent>
        </Select>

        <Select value={countryFilter} onValueChange={setCountryFilter}>
          <SelectTrigger className="w-full md:w-48">
            <Globe className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Страна" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все страны</SelectItem>
            {uniqueCountries.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={loyaltyFilter} onValueChange={setLoyaltyFilter}>
          <SelectTrigger className="w-full md:w-48">
            <Star className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Лояльность" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все уровни</SelectItem>
            {uniqueLoyalty.map((loyalty) => (
              <SelectItem key={loyalty} value={loyalty}>
                {loyalty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Всего гостей</p>
                <p className="text-2xl font-bold">{guests.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">VIP гости</p>
                <p className="text-2xl font-bold">
                  {guests.filter((g) => g.status === "vip").length}
                </p>
              </div>
              <Crown className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Общая выручка</p>
                <p className="text-2xl font-bold">
                  ₽
                  {guests
                    .reduce((sum, g) => sum + g.totalSpent, 0)
                    .toLocaleString()}
                </p>
              </div>
              <CreditCard className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Новые гости</p>
                <p className="text-2xl font-bold">
                  {guests.filter((g) => g.status === "new").length}
                </p>
              </div>
              <Plus className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Guests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredGuests.map((guest) => (
          <Card
            key={guest.id}
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    {guest.name}
                    {guest.status === "vip" && (
                      <Crown className="h-4 w-4 text-purple-600" />
                    )}
                  </CardTitle>
                  <p className="text-sm text-gray-600">{guest.country}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <Badge className={`${getStatusColor(guest.status)} text-xs`}>
                    {getStatusText(guest.status)}
                  </Badge>
                  <Badge
                    className={`${getLoyaltyColor(guest.loyalty)} text-xs`}
                  >
                    {guest.loyalty}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="truncate">{guest.email}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{guest.phone}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="truncate">{guest.address}</span>
                </div>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Бронирований:
                  </span>
                  <span className="text-sm font-semibold">
                    {guest.totalBookings}
                  </span>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {guest.guestType}:
                  </span>
                  <span className="text-sm font-semibold">
                    ₽{guest.totalSpent.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="border-t pt-3">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>Регистрация: {guest.registrationDate}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Последний визит: {guest.lastVisit}</span>
                </div>
              </div>

              {guest.notes && (
                <div className="border-t pt-3">
                  <p className="text-xs text-gray-600 italic">{guest.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGuests.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Гости не найдены</p>
          <p className="text-gray-400 text-sm">
            Попробуйте изменить параметры поиска
          </p>
        </div>
      )}
    </div>
  );
}

export default AdminGuests;
