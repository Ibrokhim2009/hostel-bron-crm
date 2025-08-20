import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Star,
  Building,
  UserCheck,
  Globe,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Bed,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  Eye
} from 'lucide-react';

const AdminDashboard = () => {
  const recentBookings = [
    { 
      id: 1, 
      guest: 'Александр Петров', 
      room: 'Grand Palace Hotel • Номер 102', 
      status: 'Заселен', 
      amount: '₽60 000', 
      date: '20.06.2024',
      checkIn: '21.06.2024',
      nights: 3,
      type: 'VIP'
    },
    { 
      id: 2, 
      guest: 'John Smith', 
      room: 'Grand Palace Hotel • Номер 201', 
      status: 'Подтвержден', 
      amount: '₽90 000', 
      date: '21.06.2024',
      checkIn: '22.06.2024',
      nights: 2,
      type: 'VIP'
    },
    { 
      id: 3, 
      guest: 'Елена Козлова', 
      room: 'Boutique Riverside • Номер R01', 
      status: 'Подтвержден', 
      amount: '₽19 000', 
      date: '22.06.2024',
      checkIn: '24.06.2024',
      nights: 1,
      type: 'Стандарт'
    },
  ];

  const channelPerformance = [
    { 
      name: 'Прямые продажи', 
      bookings: 45, 
      revenue: '₽120 000', 
      percentage: 45, 
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    { 
      name: 'Booking.com', 
      bookings: 30, 
      revenue: '₽340 000', 
      percentage: 30, 
      color: 'bg-emerald-500',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    },
    { 
      name: 'Expedia', 
      bookings: 25, 
      revenue: '₽560 000', 
      percentage: 25, 
      color: 'bg-amber-500',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600'
    },
  ];

  const upcomingTasks = [
    { id: 1, task: 'Уборка номера 102', time: '14:00', status: 'В процессе', priority: 'high' },
    { id: 2, task: 'Встреча гостей John Smith', time: '16:30', status: 'Запланировано', priority: 'medium' },
    { id: 3, task: 'Проверка номера R01', time: '18:00', status: 'Ожидает', priority: 'low' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Заселен': return 'bg-emerald-100 text-emerald-800';
      case 'Подтвержден': return 'bg-blue-100 text-blue-800';
      case 'Ожидает': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-rose-100 text-rose-800';
      case 'medium': return 'bg-amber-100 text-amber-800';
      case 'low': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Обзор системы</h1>
          <p className="text-slate-600">Ключевые показатели и статистика</p>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-2">Всего отелей</p>
                  <p className="text-3xl font-bold text-slate-900">3</p>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="h-4 w-4 text-emerald-500 mr-1" />
                    <span className="text-sm text-emerald-600">+2% к прошлому месяцу</span>
                  </div>
                </div>
                <div className="h-14 w-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Building className="h-7 w-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-2">Загруженность</p>
                  <p className="text-3xl font-bold text-slate-900">25%</p>
                  <p className="text-sm text-slate-500 mt-2">2 из 8 номеров</p>
                </div>
                <div className="h-14 w-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Bed className="h-7 w-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-2">Общий доход</p>
                  <p className="text-3xl font-bold text-slate-900">₽190 000</p>
                  <p className="text-sm text-slate-500 mt-2">Средний чек ₽47 500</p>
                </div>
                <div className="h-14 w-14 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                  <DollarSign className="h-7 w-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-2">VIP гости</p>
                  <p className="text-3xl font-bold text-slate-900">2</p>
                  <p className="text-sm text-slate-500 mt-2">из 4 гостей</p>
                </div>
                <div className="h-14 w-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Star className="h-7 w-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-md bg-white hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-2">Задачи уборки</p>
                  <p className="text-2xl font-bold text-slate-900">2</p>
                  <p className="text-sm text-slate-500 mt-1">В работе: 1</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-white hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-2">Персонал</p>
                  <p className="text-2xl font-bold text-slate-900">3</p>
                  <p className="text-sm text-slate-500 mt-1">Доступно из 4</p>
                </div>
                <div className="h-12 w-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-white hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-2">Каналы продаж</p>
                  <p className="text-2xl font-bold text-slate-900">3</p>
                  <p className="text-sm text-slate-500 mt-1">из 3 подключены</p>
                </div>
                <div className="h-12 w-12 bg-violet-100 rounded-xl flex items-center justify-center">
                  <Globe className="h-6 w-6 text-violet-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-white hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-2">Комиссии</p>
                  <p className="text-2xl font-bold text-slate-900">₽22 200</p>
                  <div className="flex items-center mt-1">
                    <ArrowDownRight className="h-4 w-4 text-rose-500 mr-1" />
                    <span className="text-sm text-rose-500">11%</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Channel Performance */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-slate-900">Производительность каналов</CardTitle>
              <p className="text-slate-500 text-sm">Доходы по каналам продаж</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {channelPerformance.map((channel, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${channel.color}`}></div>
                      <span className="text-sm text-slate-700 font-medium">{channel.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-900">{channel.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${channel.color}`}
                      style={{ width: `${channel.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{channel.bookings} бронирований</span>
                    <span className="font-semibold text-slate-700">{channel.revenue}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-slate-900">Предстоящие задачи</CardTitle>
              <p className="text-slate-500 text-sm">Сегодняшние и завтрашние задачи</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-slate-900">{task.task}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-500">{task.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={`${getPriorityColor(task.priority)} border-0`}>
                      {task.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Active Bookings */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-slate-900">Активные бронирования</CardTitle>
            <p className="text-slate-500 text-sm">Текущие и предстоящие заезды</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">{booking.guest.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{booking.guest}</p>
                      <p className="text-sm text-slate-500 flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{booking.room}</span>
                      </p>
                      <p className="text-sm text-slate-500 flex items-center space-x-1 mt-1">
                        <Calendar className="h-4 w-4" />
                        <span>Заезд: {booking.checkIn} • {booking.nights} ночи</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-bold text-slate-900">{booking.amount}</p>
                      <p className="text-sm text-slate-500">{booking.type}</p>
                    </div>
                    <Badge className={`${getStatusColor(booking.status)} border-0 px-3 py-1`}>
                      {booking.status}
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;