import React from 'react';
import { Calendar, MapPin, User, CreditCard, Plane, AlertTriangle, CheckCircle } from 'lucide-react';

export default function AdminBook() {
  const bookings = [
    {
      id: 1,
      name: "Александр Петров",
      email: "a.petrov@mail.com",
      status: "Гость в номере",
      hotel: "Grand Palace Hotel",
      room: "Номер 502 (Люкс)",
      dates: "20.06.2024 - 25.06.2024",
      nights: "5 ночей",
      cost: "₽50 000",
      costDetail: "₽10 000/ночь",
      channel: "Прямые продажи",
      channelIcon: User,
      vip: true,
      paid: true,
      paidDate: "19.06.2024",
      specialNote: "Особые пожелания: Поздний заезд после 22:00"
    },
    {
      id: 2,
      name: "Мария Иванова",
      email: "m.ivanova@company.ru",
      status: "Гость в номере",
      hotel: "Business Center Hotel",
      room: "Номер 1203 (Бизнес Делюкс)",
      dates: "18.06.2024 - 20.06.2024",
      nights: "2 ночи",
      cost: "₽21 000",
      costDetail: "₽10 500/ночь",
      channel: "Booking.com",
      channelIcon: CreditCard,
      vip: false,
      paid: true,
      paidDate: "17.06.2024",
      commission: "₽3 150"
    },
    {
      id: 3,
      name: "John Smith",
      email: "j.smith@international.com",
      status: "Гость в номере",
      hotel: "Grand Palace Hotel",
      room: "Номер 307 (Люкс)",
      dates: "25.06.2024 - 30.06.2024",
      nights: "5 ночей",
      cost: "₽90 000",
      costDetail: "₽18 000/ночь",
      channel: "Expedia",
      channelIcon: Plane,
      vip: true,
      paid: false,
      paidDate: "16.06.2024",
      commission: "₽18 200",
      specialNote: "Особые пожелания: Трансфер из аэропорта"
    },
    {
      id: 4,
      name: "Елена Козлова",
      email: "e.kozlova@gmail.com",
      status: "Гость в номере",
      hotel: "Business Riverside",
      room: "Номер 805 (Стандарт)",
      dates: "22.06.2024 - 24.06.2024",
      nights: "2 ночи",
      cost: "₽14 000",
      costDetail: "₽7 000/ночь",
      channel: "Яндекс.Путешествия",
      channelIcon: MapPin,
      vip: false,
      paid: false,
      paidDate: "21.06.2024"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 sm:py-6">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">
              Управление бронированиями
            </h1>
            <p className="text-sm text-gray-600">
              Все бронирования в системе
            </p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
            <span className="text-lg">+</span>
            <span>Создать бронирование</span>
          </button>
        </div>
      </div>

      {/* Bookings List */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200"
          >
            <div className="p-4 sm:p-6">
              {/* Header Row */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4 space-y-4 lg:space-y-0">
                {/* Guest Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                      <span>{booking.name}</span>
                      {booking.vip && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded">
                          VIP
                        </span>
                      )}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{booking.email}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <span className="font-medium">{booking.status}</span>
                  </div>
                </div>

                {/* Cost and Status */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 lg:space-x-8">
                  <div className="text-right mb-2 sm:mb-0">
                    <div className="text-lg sm:text-xl font-bold text-gray-900">
                      {booking.cost}
                    </div>
                    <div className="text-sm text-gray-600">
                      {booking.costDetail}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {booking.paid ? (
                      <div className="flex items-center space-x-1 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Заселен</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 text-blue-600">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-sm font-medium">Подтвержден</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
                    Отель и номер
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {booking.hotel}
                  </div>
                  <div className="text-sm text-gray-600">
                    {booking.room}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
                    Даты пребывания
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {booking.dates}
                  </div>
                  <div className="text-sm text-gray-600">
                    {booking.nights}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
                    Стоимость
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {booking.cost}
                  </div>
                  <div className="text-sm text-gray-600">
                    {booking.costDetail}
                  </div>
                </div>
              </div>

              {/* Channel and Payment Info */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-100 space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <booking.channelIcon className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-700">
                      Канал: <span className="font-medium text-blue-600">{booking.channel}</span>
                    </span>
                  </div>
                  {booking.commission && (
                    <div className="text-sm text-red-600">
                      Комиссия: {booking.commission}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  {booking.paid && (
                    <span>Создано: {booking.paidDate}</span>
                  )}
                </div>
              </div>

              {/* Special Notes */}
              {booking.specialNote && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-yellow-800">{booking.specialNote}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}