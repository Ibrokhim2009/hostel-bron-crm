import React, { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Wifi,
  Tv,
  Snowflake,
  Users,
  MapPin,
  Eye,
  UtensilsCrossed,
  Car,
  Waves,
  Dumbbell,
  Coffee,
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
import { Checkbox } from "@/components/ui/checkbox";

function AdminRoom() {
  const [rooms, setRooms] = useState([
    {
      id: 101,
      type: "Стандарт",
      category: "Grand Palace Hotel",
      price: 500,
      capacity: 2,
      floor: 1,
      status: "available",
      amenities: ["WiFi", "ТВ", "Кондиционер"],
      amenityCount: 1,
    },
    {
      id: 102,
      type: "Делюкс",
      category: "Grand Palace Hotel",
      price: 12000,
      capacity: 2,
      floor: 1,
      status: "occupied",
      amenities: ["WiFi", "ТВ", "Кондиционер"],
      amenityCount: 2,
    },
    {
      id: 201,
      type: "Люкс",
      category: "Grand Palace Hotel",
      price: 18000,
      capacity: 4,
      floor: 2,
      status: "available",
      amenities: ["WiFi", "ТВ", "Кондиционер"],
      amenityCount: 3,
    },
    {
      id: 301,
      type: "Президентский",
      category: "Grand Palace Hotel",
      price: 35000,
      capacity: 6,
      floor: 3,
      status: "maintenance",
      amenities: ["WiFi", "ТВ", "Кондиционер"],
      amenityCount: 5,
    },
    {
      id: "B101",
      type: "Бизнес",
      category: "Business Center Hotel",
      price: 7500,
      capacity: 1,
      floor: 1,
      status: "available",
      amenities: ["WiFi", "ТВ", "Рабочий стол"],
      amenityCount: 1,
    },
    {
      id: "B201",
      type: "Бизнес Плюс",
      category: "Business Center Hotel",
      price: 10500,
      capacity: 2,
      floor: 2,
      status: "occupied",
      amenities: ["WiFi", "ТВ", "Рабочий стол"],
      amenityCount: 2,
    },
    {
      id: "R01",
      type: "Речной вид",
      category: "Boutique Riverside",
      price: 9500,
      capacity: 2,
      floor: 1,
      status: "available",
      amenities: ["WiFi", "ТВ", "Вид на реку"],
      amenityCount: 1,
    },
    {
      id: "R02",
      type: "Панорамный",
      category: "Boutique Riverside",
      price: 14000,
      capacity: 3,
      floor: 2,
      status: "available",
      amenities: ["WiFi", "ТВ", "Панорамные окна"],
      amenityCount: 2,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({
    id: "",
    type: "",
    category: "",
    price: "",
    capacity: "",
    floor: "",
    status: "available",
    amenities: [],
    description: "",
  });

  const amenityOptions = [
    { id: "wifi", label: "WiFi", icon: Wifi },
    { id: "tv", label: "ТВ", icon: Tv },
    { id: "ac", label: "Кондиционер", icon: Snowflake },
    { id: "desk", label: "Рабочий стол", icon: Coffee },
    { id: "view", label: "Вид на реку", icon: Eye },
    { id: "restaurant", label: "Ресторан", icon: UtensilsCrossed },
    { id: "parking", label: "Парковка", icon: Car },
    { id: "pool", label: "Бассейн", icon: Waves },
    { id: "gym", label: "Спортзал", icon: Dumbbell },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200";
      case "occupied":
        return "bg-red-100 text-red-800 border-red-200";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "available":
        return "Доступен";
      case "occupied":
        return "Занят";
      case "maintenance":
        return "Обслуживание";
      default:
        return status;
    }
  };

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || room.status === statusFilter;
    const matchesType = typeFilter === "all" || room.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleAddRoom = () => {
    if (
      newRoom.id &&
      newRoom.type &&
      newRoom.category &&
      newRoom.price &&
      newRoom.capacity &&
      newRoom.floor
    ) {
      setRooms([
        ...rooms,
        {
          ...newRoom,
          id: newRoom.id,
          price: parseInt(newRoom.price),
          capacity: parseInt(newRoom.capacity),
          floor: parseInt(newRoom.floor),
          amenityCount: newRoom.amenities.length,
        },
      ]);
      setNewRoom({
        id: "",
        type: "",
        category: "",
        price: "",
        capacity: "",
        floor: "",
        status: "available",
        amenities: [],
        description: "",
      });
      setIsAddModalOpen(false);
    }
  };

  const handleAmenityChange = (amenityId, checked) => {
    if (checked) {
      setNewRoom((prev) => ({
        ...prev,
        amenities: [
          ...prev.amenities,
          amenityOptions.find((a) => a.id === amenityId)?.label || amenityId,
        ],
      }));
    } else {
      setNewRoom((prev) => ({
        ...prev,
        amenities: prev.amenities.filter(
          (a) =>
            a !==
            (amenityOptions.find((opt) => opt.id === amenityId)?.label ||
              amenityId)
        ),
      }));
    }
  };

  const uniqueTypes = [...new Set(rooms.map((room) => room.type))];

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Управление номерами
          </h1>
          <p className="text-gray-600 mt-1">Все номера во всех отелях</p>
        </div>

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Добавить номер
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Добавить новый номер</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="roomId">Номер</Label>
                <Input
                  id="roomId"
                  value={newRoom.id}
                  onChange={(e) =>
                    setNewRoom((prev) => ({ ...prev, id: e.target.value }))
                  }
                  placeholder="Например: 401"
                />
              </div>

              <div>
                <Label htmlFor="roomType">Тип номера</Label>
                <Input
                  id="roomType"
                  value={newRoom.type}
                  onChange={(e) =>
                    setNewRoom((prev) => ({ ...prev, type: e.target.value }))
                  }
                  placeholder="Например: Стандарт"
                />
              </div>

              <div>
                <Label htmlFor="roomCategory">Категория отеля</Label>
                <Input
                  id="roomCategory"
                  value={newRoom.category}
                  onChange={(e) =>
                    setNewRoom((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  placeholder="Например: Grand Palace Hotel"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="roomPrice">Цена (₽)</Label>
                  <Input
                    id="roomPrice"
                    type="number"
                    value={newRoom.price}
                    onChange={(e) =>
                      setNewRoom((prev) => ({ ...prev, price: e.target.value }))
                    }
                    placeholder="5000"
                  />
                </div>

                <div>
                  <Label htmlFor="roomCapacity">Вместимость</Label>
                  <Input
                    id="roomCapacity"
                    type="number"
                    value={newRoom.capacity}
                    onChange={(e) =>
                      setNewRoom((prev) => ({
                        ...prev,
                        capacity: e.target.value,
                      }))
                    }
                    placeholder="2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="roomFloor">Этаж</Label>
                <Input
                  id="roomFloor"
                  type="number"
                  value={newRoom.floor}
                  onChange={(e) =>
                    setNewRoom((prev) => ({ ...prev, floor: e.target.value }))
                  }
                  placeholder="1"
                />
              </div>

              <div>
                <Label htmlFor="roomStatus">Статус</Label>
                <Select
                  value={newRoom.status}
                  onValueChange={(value) =>
                    setNewRoom((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите статус" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Доступен</SelectItem>
                    <SelectItem value="occupied">Занят</SelectItem>
                    <SelectItem value="maintenance">Обслуживание</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Удобства</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {amenityOptions.map((amenity) => (
                    <div
                      key={amenity.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={amenity.id}
                        checked={newRoom.amenities.includes(amenity.label)}
                        onCheckedChange={(checked) =>
                          handleAmenityChange(amenity.id, checked)
                        }
                      />
                      <Label htmlFor={amenity.id} className="text-sm">
                        {amenity.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="roomDescription">Описание</Label>
                <Textarea
                  id="roomDescription"
                  value={newRoom.description}
                  onChange={(e) =>
                    setNewRoom((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Дополнительная информация о номере..."
                  rows={3}
                />
              </div>

              <Button onClick={handleAddRoom} className="w-full">
                Добавить номер
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
              placeholder="Поиск по номеру, типу или отелю..."
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
            <SelectItem value="available">Доступен</SelectItem>
            <SelectItem value="occupied">Занят</SelectItem>
            <SelectItem value="maintenance">Обслуживание</SelectItem>
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Тип номера" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все типы</SelectItem>
            {uniqueTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {filteredRooms.map((room) => (
          <Card
            key={room.id}
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg font-semibold">
                    Номер {room.id}
                  </CardTitle>
                  <p className="text-sm text-gray-600">{room.category}</p>
                </div>
                <Badge className={`${getStatusColor(room.status)} text-xs`}>
                  {getStatusText(room.status)}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-blue-600">
                  {room.type}
                </span>
                <span className="text-sm text-gray-500">{room.floor} этаж</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">
                  ₽{room.price.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500">за ночь</span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>Вместимость: {room.capacity} чел.</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-700">
                  Удобства:
                </span>
                <div className="flex flex-wrap gap-1">
                  {room.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded"
                    >
                      {amenity === "WiFi" && <Wifi className="h-3 w-3 mr-1" />}
                      {amenity === "ТВ" && <Tv className="h-3 w-3 mr-1" />}
                      {amenity === "Кондиционер" && (
                        <Snowflake className="h-3 w-3 mr-1" />
                      )}
                      {amenity === "Рабочий стол" && (
                        <Coffee className="h-3 w-3 mr-1" />
                      )}
                      {amenity === "Вид на реку" && (
                        <Eye className="h-3 w-3 mr-1" />
                      )}
                      {amenity === "Панорамные окна" && (
                        <Eye className="h-3 w-3 mr-1" />
                      )}
                      <span>{amenity}</span>
                    </div>
                  ))}
                  {room.amenityCount > room.amenities.length && (
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      +{room.amenityCount - room.amenities.length}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Номера не найдены</p>
          <p className="text-gray-400 text-sm">
            Попробуйте изменить параметры поиска
          </p>
        </div>
      )}
    </div>
  );
}

export default AdminRoom;
