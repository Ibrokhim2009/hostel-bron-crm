import React, { useState } from "react";
import { Plus, Star, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function AdminHotels() {
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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newHotel, setNewHotel] = useState({
    name: "",
    stars: 5,
    location: "",
    phone: "",
    email: "",
    description: "",
    rooms: "",
    occupancy: 0,
  });

  const handleAddHotel = () => {
    if (
      newHotel.name &&
      newHotel.location &&
      newHotel.phone &&
      newHotel.email
    ) {
      const hotel = {
        id: hotels.length + 1,
        ...newHotel,
        rooms: parseInt(newHotel.rooms) || 0,
      };
      setHotels([...hotels, hotel]);
      setNewHotel({
        name: "",
        stars: 5,
        location: "",
        phone: "",
        email: "",
        description: "",
        rooms: "",
        occupancy: 0,
      });
      setIsDialogOpen(false);
    }
  };

  const handleInputChange = (field, value) => {
    setNewHotel((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const HotelCard = ({ hotel }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6 flex flex-col justify-between h-full">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {hotel.name}
          </h3>
          <div className="flex items-center mb-3">
            {[...Array(hotel.stars)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-sm">{hotel.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Phone className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-sm">{hotel.phone}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Mail className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-sm">{hotel.email}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-6">{hotel.description}</p>

        <div className="flex justify-between items-center text-sm text-gray-600 mt-auto pt-4 border-t border-gray-100">
          <span>{hotel.rooms} номеров</span>
          <span>Загруженность: {hotel.occupancy}%</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Управление отелями
            </h1>
            <p className="text-gray-600">Список всех отелей в системе</p>
          </div>
          <Button className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Добавить отель
          </Button>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminHotels;
