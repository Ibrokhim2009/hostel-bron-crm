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
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
      price: 5000,
      capacity: 2,
      floor: 1,
      status: "available",
      amenities: ["WiFi", "ТВ", "Кондиционер"],
      description: "Уютный номер с современной мебелью",
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
      description: "Просторный номер класса делюкс",
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
      description: "Роскошный номер с панорамным видом",
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
      description: "Президентский номер с эксклюзивными удобствами",
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
      description: "Номер для деловых путешественников",
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
      description: "Улучшенный бизнес-номер",
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
      description: "Номер с потрясающим видом на реку",
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
      description: "Номер с панорамными окнами",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

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
        return "default";
      case "occupied":
        return "destructive";
      case "maintenance":
        return "secondary";
      default:
        return "secondary";
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

  const handleSelectRoom = (roomId) => {
    setSelectedRooms(prev =>
      prev.includes(roomId)
        ? prev.filter(id => id !== roomId)
        : [...prev, roomId]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRooms([]);
    } else {
      setSelectedRooms(filteredRooms.map(room => room.id));
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteSelected = () => {
    setRooms(prev => prev.filter(room => !selectedRooms.includes(room.id)));
    setSelectedRooms([]);
    setSelectAll(false);
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case "WiFi":
        return <Wifi className="h-3 w-3" />;
      case "ТВ":
        return <Tv className="h-3 w-3" />;
      case "Кондиционер":
        return <Snowflake className="h-3 w-3" />;
      case "Рабочий стол":
        return <Coffee className="h-3 w-3" />;
      case "Вид на реку":
      case "Панорамные окна":
        return <Eye className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const uniqueTypes = [...new Set(rooms.map((room) => room.type))];

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Управление номерами
            </h1>
            <p className="text-gray-600">
              Управляйте всеми номерами во всех отелях
            </p>
          </div>
          <div className="flex gap-2">
            {selectedRooms.length > 0 && (
              <Button
                variant="destructive"
                onClick={handleDeleteSelected}
                className="gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Удалить ({selectedRooms.length})
              </Button>
            )}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 shadow-sm">
                  <Plus className="w-4 h-4" />
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
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border shadow-sm p-4">
          <div className="flex flex-col md:flex-row gap-4">
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
        </div>

        {/* Rooms Table */}
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Список номеров</h2>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectAll}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="font-semibold">Номер</TableHead>
                  <TableHead className="font-semibold">Тип</TableHead>
                  <TableHead className="font-semibold">Отель</TableHead>
                  <TableHead className="font-semibold">Цена</TableHead>
                  <TableHead className="font-semibold">Характеристики</TableHead>
                  <TableHead className="font-semibold">Статус</TableHead>
                  <TableHead className="font-semibold">Удобства</TableHead>
                  <TableHead className="font-semibold w-[120px]">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedRooms.includes(room.id)}
                        onCheckedChange={() => handleSelectRoom(room.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-gray-900">
                        #{room.id}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-blue-600">{room.type}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-600">{room.category}</span>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-semibold text-gray-900">
                          ₽{room.price.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">за ночь</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Users className="w-3 h-3" />
                          {room.capacity} чел.
                        </div>
                        <div className="text-gray-500">{room.floor} этаж</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(room.status)}>
                        {getStatusText(room.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-[150px]">
                        {room.amenities.slice(0, 3).map((amenity, index) => (
                          <div
                            key={index}
                            className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded gap-1"
                          >
                            {getAmenityIcon(amenity)}
                            <span className="truncate">{amenity}</span>
                          </div>
                        ))}
                        {room.amenities.length > 3 && (
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            +{room.amenities.length - 3}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setRooms(prev => prev.filter(r => r.id !== room.id))}
                          className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
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

          {/* Tablet Table */}
          <div className="hidden md:block lg:hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectAll}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="font-semibold">Номер</TableHead>
                  <TableHead className="font-semibold">Детали</TableHead>
                  <TableHead className="font-semibold">Статус</TableHead>
                  <TableHead className="font-semibold w-[100px]">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedRooms.includes(room.id)}
                        onCheckedChange={() => handleSelectRoom(room.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-semibold text-gray-900">#{room.id}</div>
                        <div className="text-sm font-medium text-blue-600">{room.type}</div>
                        <div className="text-xs text-gray-500">{room.category}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="font-semibold">₽{room.price.toLocaleString()}</div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-3 h-3" />
                          {room.capacity} чел. • {room.floor} этаж
                        </div>
                        <div className="flex gap-1 flex-wrap">
                          {room.amenities.slice(0, 2).map((amenity, index) => (
                            <span key={index} className="text-xs bg-gray-100 px-1 py-0.5 rounded">
                              {amenity}
                            </span>
                          ))}
                          {room.amenities.length > 2 && (
                            <span className="text-xs bg-gray-100 px-1 py-0.5 rounded">
                              +{room.amenities.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(room.status)}>
                        {getStatusText(room.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setRooms(prev => prev.filter(r => r.id !== room.id))}
                          className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
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

          {/* Mobile Table */}
          <div className="md:hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectAll}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="font-semibold">Номер</TableHead>
                  <TableHead className="font-semibold w-[80px]">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedRooms.includes(room.id)}
                        onCheckedChange={() => handleSelectRoom(room.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-semibold text-gray-900">#{room.id}</div>
                          <Badge variant={getStatusColor(room.status)} className="text-xs">
                            {getStatusText(room.status)}
                          </Badge>
                        </div>
                        <div className="text-sm font-medium text-blue-600">{room.type}</div>
                        <div className="text-xs text-gray-500 truncate">{room.category}</div>
                        <div className="space-y-1">
                          <div className="font-semibold">₽{room.price.toLocaleString()}</div>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Users className="w-3 h-3" />
                            {room.capacity} чел. • {room.floor} этаж
                          </div>
                          <div className="flex gap-1 flex-wrap">
                            {room.amenities.slice(0, 2).map((amenity, index) => (
                              <span key={index} className="text-xs bg-gray-100 px-1 py-0.5 rounded">
                                {amenity}
                              </span>
                            ))}
                            {room.amenities.length > 2 && (
                              <span className="text-xs bg-gray-100 px-1 py-0.5 rounded">
                                +{room.amenities.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setRooms(prev => prev.filter(r => r.id !== room.id))}
                          className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
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
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Номера не найдены</p>
            <p className="text-gray-400">Попробуйте изменить параметры поиска или фильтры</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminRoom;