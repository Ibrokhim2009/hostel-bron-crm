import React, { useState } from "react";
import { Plus, Star, Eye, Edit, Trash2, X, Phone, Mail, MapPin, Building, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

function AdminHotels() {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const [hotels, setHotels] = useState([
    {
      id: 1,
      name: "Grand Palace Hotel",
      stars: 5,
      location: "123 Luxury Avenue, Moscow",
      phone: "+7 (495) 123-45-67",
      email: "info@grandpalace.ru",
      description: "Роскошный отель в центре Москвы с видом на Кремль",
      rooms: 150,
      occupancy: 25,
    },
    {
      id: 2,
      name: "Business Center Hotel",
      stars: 4,
      location: "456 Corporate Street, Moscow",
      phone: "+7 (495) 987-65-43",
      email: "reservation@businesscenter.ru",
      description: "Современный бизнес-отель для деловых путешественников",
      rooms: 80,
      occupancy: 50,
    },
    {
      id: 3,
      name: "Boutique Riverside",
      stars: 4,
      location: "789 River View St, Petersburg",
      phone: "+7 (812) 555-12-34",
      email: "hello@boutique-riverside.ru",
      description: "Уютный бутик-отель на берегу Невы",
      rooms: 45,
      occupancy: 0,
    },
  ]);

  const handleView = (hotel) => {
    setSelectedHotel(hotel);
    setIsViewOpen(true);
  };

  const getOccupancyColor = (occupancy) => {
    if (occupancy === 0) return "destructive";
    if (occupancy < 30) return "secondary";
    if (occupancy < 70) return "default";
    return "default";
  };

  const getOccupancyStatus = (occupancy) => {
    if (occupancy === 0) return "Свободен";
    if (occupancy < 30) return "Низкая";
    if (occupancy < 70) return "Средняя";
    return "Высокая";
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Управление отелями
            </h1>
            <p className="text-gray-600">
              Управляйте всеми отелями в системе
            </p>
          </div>
          <Button className="gap-2 shadow-sm">
            <Plus className="w-4 h-4" />
            Добавить отель
          </Button>
        </div>

        {/* Hotels Table */}
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Список отелей</h2>
          </div>
          
          {/* Desktop Table */}
          <div className="hidden lg:block p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Отель</TableHead>
                  <TableHead className="font-semibold">Рейтинг</TableHead>
                  <TableHead className="font-semibold">Локация</TableHead>
                  <TableHead className="font-semibold">Контакты</TableHead>
                  <TableHead className="font-semibold">Загруженность</TableHead>
                  <TableHead className="font-semibold w-[120px]">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hotels.map((hotel) => (
                  <TableRow key={hotel.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-semibold text-gray-900">{hotel.name}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Building className="w-3 h-3" />
                          {hotel.rooms} номеров
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {[...Array(hotel.stars)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-start gap-1 text-sm max-w-[200px]">
                        <MapPin className="w-3 h-3 mt-0.5 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600 truncate">{hotel.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Phone className="w-3 h-3 text-gray-400" />
                          <span className="truncate">{hotel.phone}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <span className="truncate">{hotel.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant={getOccupancyColor(hotel.occupancy)}>
                          {getOccupancyStatus(hotel.occupancy)}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {hotel.occupancy}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(hotel)}
                          className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
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
                  <TableHead className="font-semibold">Отель</TableHead>
                  <TableHead className="font-semibold">Контакты</TableHead>
                  <TableHead className="font-semibold">Статус</TableHead>
                  <TableHead className="font-semibold w-[120px]">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hotels.map((hotel) => (
                  <TableRow key={hotel.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-semibold text-gray-900">{hotel.name}</div>
                        <div className="flex items-center gap-1">
                          {[...Array(hotel.stars)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <Building className="w-3 h-3" />
                          {hotel.rooms} номеров
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Phone className="w-3 h-3 text-gray-400" />
                          <span className="truncate">{hotel.phone}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600 truncate">
                          <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
                          <span className="truncate">{hotel.location}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge variant={getOccupancyColor(hotel.occupancy)}>
                          {getOccupancyStatus(hotel.occupancy)}
                        </Badge>
                        <div className="text-xs text-gray-500">
                          {hotel.occupancy}%
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(hotel)}
                          className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
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
                  <TableHead className="font-semibold">Отель</TableHead>
                  <TableHead className="font-semibold w-[80px]">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hotels.map((hotel) => (
                  <TableRow key={hotel.id}>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="font-semibold text-gray-900">{hotel.name}</div>
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(hotel.stars)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <div className="space-y-1 text-xs text-gray-600">
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-gray-400" />
                            <span>{hotel.phone}</span>
                          </div>
                          <div className="flex items-start gap-1">
                            <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{hotel.location}</span>
                          </div>
                          <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center gap-1">
                              <Building className="w-3 h-3 text-gray-400" />
                              <span>{hotel.rooms} номеров</span>
                            </div>
                            <Badge variant={getOccupancyColor(hotel.occupancy)} className="text-xs">
                              {hotel.occupancy}%
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(hotel)}
                          className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
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
      </div>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Информация об отеле</DialogTitle>
            <DialogDescription>
              Подробная информация о выбранном отеле
            </DialogDescription>
          </DialogHeader>
          
          {selectedHotel && (
            <div className="space-y-6">
              {/* Hotel Name & Rating */}
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-900">{selectedHotel.name}</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(selectedHotel.stars)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {selectedHotel.stars} звезд
                  </span>
                </div>
              </div>

              {/* Details Table */}
              <div className="bg-gray-50 rounded-lg p-4">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium p-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          Локация
                        </div>
                      </TableCell>
                      <TableCell className="p-3">{selectedHotel.location}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium p-3">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          Телефон
                        </div>
                      </TableCell>
                      <TableCell className="p-3">{selectedHotel.phone}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium p-3">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          Email
                        </div>
                      </TableCell>
                      <TableCell className="p-3">{selectedHotel.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium p-3">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-gray-400" />
                          Номера
                        </div>
                      </TableCell>
                      <TableCell className="p-3">{selectedHotel.rooms} номеров</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium p-3">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          Загруженность
                        </div>
                      </TableCell>
                      <TableCell className="p-3">
                        <div className="flex items-center gap-3">
                          <Badge variant={getOccupancyColor(selectedHotel.occupancy)}>
                            {getOccupancyStatus(selectedHotel.occupancy)}
                          </Badge>
                          <span className="font-semibold">{selectedHotel.occupancy}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${selectedHotel.occupancy}%` }}
                          ></div>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 flex items-center gap-2">
                  Описание
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg">
                  {selectedHotel.description}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AdminHotels;