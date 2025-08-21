import React, { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Mail,
  Phone,
  MapPin,
  Star,
  Users,
  Globe,
  CreditCard,
  Crown,
  Edit,
  Trash2,
  Eye,
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
  DialogFooter,
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedGuests, setSelectedGuests] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [editGuest, setEditGuest] = useState(null);
  const [viewGuest, setViewGuest] = useState(null);
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
    const matchesStatus = statusFilter === "all" || guest.status === statusFilter;
    const matchesCountry =
      countryFilter === "all" || guest.country === countryFilter;
    const matchesLoyalty =
      loyaltyFilter === "all" || guest.loyalty === loyaltyFilter;
    return matchesSearch && matchesStatus && matchesCountry && matchesLoyalty;
  });

  const handleAddGuest = () => {
    if (!newGuest.name || !newGuest.email || !newGuest.phone) {
      toast.error("Ошибка", {
        description: "Пожалуйста, заполните обязательные поля: имя, email и телефон.",
      });
      return;
    }
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
    toast.success("Успех", {
      description: `Гость ${guest.name} успешно добавлен.`,
    });
  };

  const handleEditGuest = () => {
    if (!editGuest.name || !editGuest.email || !editGuest.phone) {
      toast.error("Ошибка", {
        description: "Пожалуйста, заполните обязательные поля: имя, email и телефон.",
      });
      return;
    }
    setGuests(guests.map((g) => (g.id === editGuest.id ? editGuest : g)));
    setIsEditModalOpen(false);
    setEditGuest(null);
    toast.success("Успех", {
      description: `Данные гостя ${editGuest.name} обновлены.`,
    });
  };

  const handleDeleteGuest = (id) => {
    const guest = guests.find((g) => g.id === id);
    setGuests(guests.filter((g) => g.id !== id));
    toast.success("Успех", {
      description: `Гость ${guest.name} удален.`,
    });
  };

  const handleDeleteSelected = () => {
    setGuests(guests.filter((g) => !selectedGuests.includes(g.id)));
    setSelectedGuests([]);
    setSelectAll(false);
    toast.success("Успех", {
      description: `Удалено ${selectedGuests.length} гостей.`,
    });
  };

  const handleSelectGuest = (id) => {
    setSelectedGuests((prev) =>
      prev.includes(id) ? prev.filter((guestId) => guestId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedGuests([]);
    } else {
      setSelectedGuests(filteredGuests.map((guest) => guest.id));
    }
    setSelectAll(!selectAll);
  };

  const openEditModal = (guest) => {
    setEditGuest({ ...guest });
    setIsEditModalOpen(true);
  };

  const openViewModal = (guest) => {
    setViewGuest(guest);
    setIsViewModalOpen(true);
  };

  const uniqueCountries = [...new Set(guests.map((guest) => guest.country))];
  const uniqueLoyalty = [...new Set(guests.map((guest) => guest.loyalty))];

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Управление гостями
            </h1>
            <p className="text-gray-600">
              Управляйте базой данных гостей и их предпочтениями
            </p>
          </div>
          <div className="flex gap-2">
            {selectedGuests.length > 0 && (
              <Button
                variant="destructive"
                onClick={handleDeleteSelected}
                className="gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Удалить ({selectedGuests.length})
              </Button>
            )}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 shadow-sm">
                  <Plus className="w-4 h-4" />
                  Добавить гостя
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-medium text-2xl text-gray-800">Добавить нового гостя</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="guestName">Имя и фамилия *</Label>
                    <Input
                      id="guestName"
                      value={newGuest.name}
                      onChange={(e) =>
                        setNewGuest((prev) => ({ ...prev, name: e.target.value }))
                      }
                      placeholder="Иван Иванов"
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="guestEmail">Email *</Label>
                    <Input
                      id="guestEmail"
                      type="email"
                      value={newGuest.email}
                      onChange={(e) =>
                        setNewGuest((prev) => ({ ...prev, email: e.target.value }))
                      }
                      placeholder="ivan@example.com"
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="guestPhone">Телефон *</Label>
                    <Input
                      id="guestPhone"
                      value={newGuest.phone}
                      onChange={(e) =>
                        setNewGuest((prev) => ({ ...prev, phone: e.target.value }))
                      }
                      placeholder="+7 (999) 123-45-67"
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="guestAddress">Адрес</Label>
                    <Input
                      id="guestAddress"
                      value={newGuest.address}
                      onChange={(e) =>
                        setNewGuest((prev) => ({ ...prev, address: e.target.value }))
                      }
                      placeholder="г. Москва, ул. Примерная, 1"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="guestCountry">Страна</Label>
                    <Input
                      id="guestCountry"
                      value={newGuest.country}
                      onChange={(e) =>
                        setNewGuest((prev) => ({ ...prev, country: e.target.value }))
                      }
                      placeholder="Россия"
                      className="w-full"
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
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Выберите статус" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">Новый</SelectItem>
                        <SelectItem value="regular">Постоянный</SelectItem>
                        <SelectItem value="vip">VIP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2 space-y-4">
                    <div>
                      <Label htmlFor="guestLoyalty">Программа лояльности</Label>
                      <Select
                        value={newGuest.loyalty}
                        onValueChange={(value) =>
                          setNewGuest((prev) => ({ ...prev, loyalty: value }))
                        }
                      >
                        <SelectTrigger className="w-full">
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
                        rows={4}
                        className="w-full resize-none min-h-[100px]"
                      />
                    </div>
                    <DialogFooter className="flex flex-col sm:flex-row gap-4">
                      <Button
                        variant="outline"
                        onClick={() => setIsAddModalOpen(false)}
                        className="w-full sm:w-auto"
                      >
                        Отмена
                      </Button>
                      <Button
                        onClick={handleAddGuest}
                        className="w-full sm:w-auto"
                      >
                        Добавить гостя
                      </Button>
                    </DialogFooter>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border shadow-sm p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Поиск по имени, email или телефону..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
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
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-sm">
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
          <Card className="shadow-sm">
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
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Общая выручка</p>
                  <p className="text-2xl font-bold">
                    ₽{guests.reduce((sum, g) => sum + g.totalSpent, 0).toLocaleString()}
                  </p>
                </div>
                <CreditCard className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
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

        {/* Guests Table */}
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-5 border-b flex gap-5 items-center">
            <Checkbox
              checked={selectAll}
              onCheckedChange={handleSelectAll}
              aria-label="Выбрать всех гостей"
            />
            <h2 className="text-xl font-semibold flex">Список гостей</h2>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <span className="sr-only">Выбрать</span>
                  </TableHead>
                  <TableHead>Имя</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Телефон</TableHead>
                  <TableHead>Адрес</TableHead>
                  <TableHead>Страна</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="w-32">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGuests.map((guest) => (
                  <TableRow key={guest.id}>
                    <TableCell>
                      <Checkbox
                       className="ml-3"
                        checked={selectedGuests.includes(guest.id)}
                        onCheckedChange={() => handleSelectGuest(guest.id)}
                        aria-label={`Выбрать ${guest.name}`}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {guest.name}
                        {guest.status === "vip" && (
                          <Crown className="h-4 w-4 text-purple-600" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{guest.email}</TableCell>
                    <TableCell>{guest.phone}</TableCell>
                    <TableCell className="truncate max-w-xs">{guest.address}</TableCell>
                    <TableCell>{guest.country}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(guest.status)} text-xs`}>
                        {getStatusText(guest.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openViewModal(guest)}
                          className="h-8 w-8 p-0 hover:bg-green-50 hover:text-green-600"
                          aria-label={`Просмотреть ${guest.name}`}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditModal(guest)}
                          className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                          aria-label={`Редактировать ${guest.name}`}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteGuest(guest.id)}
                          className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                          aria-label={`Удалить ${guest.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredGuests.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Гости не найдены</p>
              <p className="text-gray-400 text-sm">
                Попробуйте изменить параметры поиска или фильтры
              </p>
            </div>
          )}
        </div>

        {/* View Guest Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-medium text-2xl text-gray-800">Просмотр гостя</DialogTitle>
            </DialogHeader>
            {viewGuest && (
              <div className="grid grid-cols-3 gap-5">
                <div>
                  <Label>Имя и фамилия</Label>
                  <p className="text-sm text-gray-500 font-medium">{viewGuest.name}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="text-sm text-gray-500 font-medium">{viewGuest.email}</p>
                </div>
                <div>
                  <Label>Телефон</Label>
                  <p className="text-sm text-gray-500 font-medium">{viewGuest.phone}</p>
                </div>
                <div>
                  <Label>Адрес</Label>
                  <p className="text-sm text-gray-500 font-medium">{viewGuest.address || "-"}</p>
                </div>
                <div>
                  <Label>Страна</Label>
                  <p className="text-sm text-gray-500 font-medium">{viewGuest.country || "-"}</p>
                </div>
                <div>
                  <Label>Статус</Label>
                  <Badge className={`${getStatusColor(viewGuest.status)} text-xs mt-1`}>
                    {getStatusText(viewGuest.status)}
                  </Badge>
                </div>
                <div>
                  <Label>Программа лояльности</Label>
                  <Badge className={`${getLoyaltyColor(viewGuest.loyalty)} text-xs mt-1`}>
                    {viewGuest.loyalty}
                  </Badge>
                </div>
                <div>
                  <Label>Тип гостя</Label>
                  <p className="text-sm text-gray-500 font-medium">{viewGuest.guestType}</p>
                </div>
                <div>
                  <Label>Бронирований</Label>
                  <p className="text-sm text-gray-500 font-medium">{viewGuest.totalBookings}</p>
                </div>
                <div>
                  <Label>Потрачено</Label>
                  <p className="text-sm text-gray-500 font-medium">
                    ₽{viewGuest.totalSpent.toLocaleString()}
                  </p>
                </div>
                <div>
                  <Label>Дата регистрации</Label>
                  <p className="text-sm text-gray-500 font-medium">{viewGuest.registrationDate}</p>
                </div>
                <div>
                  <Label>Последний визит</Label>
                  <p className="text-sm text-gray-500 font-medium">{viewGuest.lastVisit}</p>
                </div>
                <div>
                  <Label>Заметки</Label>
                  <p className="text-sm text-gray-500 font-medium">{viewGuest.notes || "-"}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Guest Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-medium text-2xl text-gray-800">Редактировать гостя</DialogTitle>
            </DialogHeader>
            {editGuest && (
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="editGuestName">Имя и фамилия *</Label>
                  <Input
                    id="editGuestName"
                    value={editGuest.name}
                    onChange={(e) =>
                      setEditGuest((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Иван Иванов"
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="editGuestEmail">Email *</Label>
                  <Input
                    id="editGuestEmail"
                    type="email"
                    value={editGuest.email}
                    onChange={(e) =>
                      setEditGuest((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="ivan@example.com"
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="editGuestPhone">Телефон *</Label>
                  <Input
                    id="editGuestPhone"
                    value={editGuest.phone}
                    onChange={(e) =>
                      setEditGuest((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    placeholder="+7 (999) 123-45-67"
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="editGuestAddress">Адрес</Label>
                  <Input
                    id="editGuestAddress"
                    value={editGuest.address}
                    onChange={(e) =>
                      setEditGuest((prev) => ({ ...prev, address: e.target.value }))
                    }
                    placeholder="г. Москва, ул. Примерная, 1"
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="editGuestCountry">Страна</Label>
                  <Input
                    id="editGuestCountry"
                    value={editGuest.country}
                    onChange={(e) =>
                      setEditGuest((prev) => ({ ...prev, country: e.target.value }))
                    }
                    placeholder="Россия"
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="editGuestStatus">Статус</Label>
                  <Select
                    value={editGuest.status}
                    onValueChange={(value) =>
                      setEditGuest((prev) => ({ ...prev, status: value }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Выберите статус" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Новый</SelectItem>
                      <SelectItem value="regular">Постоянный</SelectItem>
                      <SelectItem value="vip">VIP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-4">
                  <div>
                    <Label htmlFor="editGuestLoyalty">Программа лояльности</Label>
                    <Select
                      value={editGuest.loyalty}
                      onValueChange={(value) =>
                        setEditGuest((prev) => ({ ...prev, loyalty: value }))
                      }
                    >
                      <SelectTrigger className="w-full">
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
                    <Label htmlFor="editGuestNotes">Заметки</Label>
                    <Textarea
                      id="editGuestNotes"
                      value={editGuest.notes}
                      onChange={(e) =>
                        setEditGuest((prev) => ({ ...prev, notes: e.target.value }))
                      }
                      placeholder="Особенности и предпочтения гостя..."
                      rows={4}
                      className="w-full resize-none min-h-[100px]"
                    />
                  </div>
                  <DialogFooter className="flex flex-col sm:flex-row gap-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditModalOpen(false)}
                      className="w-full sm:w-auto"
                    >
                      Отмена
                    </Button>
                    <Button
                      onClick={handleEditGuest}
                      className="w-full sm:w-auto"
                    >
                      Сохранить
                    </Button>
                  </DialogFooter>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default AdminGuests;