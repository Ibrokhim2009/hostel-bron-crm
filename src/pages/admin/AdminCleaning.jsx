import React, { useState } from "react";
import {
  Clock,
  AlertCircle,
  CheckCircle,
  Users,
  UserPlus,
  Filter,
  Calendar,
  Timer,
  Trash2,
  Bed,
  Sparkles,
  Coffee,
  CheckSquare,
  Square,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

function AdminCleaning() {
  const [rooms, setRooms] = useState([
    {
      id: 101,
      hotel: "Grand Palace Hotel",
      cleaningDate: "20.05.2024, 11:00:00",
      status: "clean",
      type: "Стандарт",
      cleaner: null,
      priority: "normal",
      notes: "",
    },
    {
      id: 102,
      hotel: "Grand Palace Hotel",
      cleaningDate: "19.05.2024, 14:00:00",
      status: "dirty",
      type: "Делюкс",
      cleaner: null,
      priority: "high",
      notes: "Требует deep cleaning (60 мин)",
    },
    {
      id: 201,
      hotel: "Grand Palace Hotel",
      cleaningDate: "21.05.2024, 12:00:00",
      status: "maintenance",
      type: "Люкс",
      cleaner: null,
      priority: "normal",
      notes: "Задача: checkout_cleaning (60 мин)",
    },
    {
      id: 301,
      hotel: "Grand Palace Hotel",
      cleaningDate: "18.05.2024, 17:00:00",
      status: "out_of_order",
      type: "Президентский",
      cleaner: null,
      priority: "urgent",
      notes: "Задача: maintenance_cleaning (120 мин)",
    },
    {
      id: "B101",
      hotel: "Business Center Hotel",
      cleaningDate: "20.05.2024, 09:30:00",
      status: "clean",
      type: "Бизнес",
      cleaner: null,
      priority: "normal",
      notes: "",
    },
    {
      id: "B201",
      hotel: "Business Center Hotel",
      cleaningDate: "19.05.2024, 14:00:00",
      status: "maintenance",
      type: "Бизнес Делюкс",
      cleaner: null,
      priority: "normal",
      notes: "",
    },
    {
      id: "R01",
      hotel: "Boutique Riverside",
      cleaningDate: "20.05.2024, 08:00:00",
      status: "dirty",
      type: "Речной вид",
      cleaner: null,
      priority: "high",
      notes: "",
    },
  ]);

  const [activeTasks, setActiveTasks] = useState([
    {
      id: 1,
      roomId: 102,
      hotel: "Grand Palace Hotel",
      status: "pending",
      priority: "high",
      cleaner: "Анна Петрова",
      timeElapsed: 45,
      estimatedTime: 60,
      progress: 0,
      tasks: [
        { id: 1, name: "Заправить кровать", completed: false },
        { id: 2, name: "Пропылесосить ковер", completed: false },
        { id: 3, name: "Убрать ванную комнату", completed: false },
      ],
      notes: "Гость выехал в 11:00, требуется полная уборка",
    },
    {
      id: 2,
      roomId: 201,
      hotel: "Grand Palace Hotel",
      status: "in_progress",
      priority: "normal",
      cleaner: "Мария Сидорова",
      timeElapsed: 40,
      estimatedTime: 60,
      progress: 66,
      tasks: [
        { id: 1, name: "Заправить кровать", completed: true },
        { id: 2, name: "Пропылесосить ковер", completed: true },
        { id: 3, name: "Убрать ванную комнату", completed: false },
      ],
      notes: "Стандартная уборка после выезда",
    },
    {
      id: 3,
      roomId: 301,
      hotel: "Grand Palace Hotel",
      status: "urgent",
      priority: "urgent",
      cleaner: null,
      timeElapsed: 120,
      estimatedTime: 180,
      progress: 0,
      tasks: [
        { id: 1, name: "Заправить кровать", completed: false },
        { id: 2, name: "Пропылесосить ковер", completed: false },
        { id: 3, name: "Убрать ванную комнату", completed: false },
      ],
      notes: "Срочная уборка - гость прибывает через 2 часа",
    },
  ]);

  const [staff, setStaff] = useState([
    { id: 1, name: "Анна Петрова", status: "busy", currentRoom: 102 },
    { id: 2, name: "Мария Сидорова", status: "busy", currentRoom: 201 },
    { id: 3, name: "Елена Козлова", status: "available", currentRoom: null },
    { id: 4, name: "Ольга Николаева", status: "available", currentRoom: null },
  ]);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [newStaffName, setNewStaffName] = useState("");

  const getStatusColor = (status) => {
    switch (status) {
      case "clean":
        return "bg-green-100 text-green-800 border-green-200";
      case "dirty":
        return "bg-red-100 text-red-800 border-red-200";
      case "maintenance":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "out_of_order":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "clean":
        return "Чистый";
      case "dirty":
        return "Грязный";
      case "maintenance":
        return "Убирается";
      case "out_of_order":
        return "Не работает";
      default:
        return status;
    }
  };

  const getTaskStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTaskStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Ожидает";
      case "in_progress":
        return "Выполняется";
      case "urgent":
        return "Срочно";
      case "completed":
        return "Завершено";
      default:
        return status;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-orange-100 text-orange-800";
      case "urgent":
        return "bg-red-100 text-red-800";
      case "normal":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case "high":
        return "Высокий";
      case "urgent":
        return "Срочный";
      case "normal":
        return "Обычный";
      default:
        return priority;
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const handleTaskUpdate = (taskId, updates) => {
    setActiveTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, ...updates } : task))
    );
  };

  const handleSubtaskToggle = (taskId, subtaskId) => {
    setActiveTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const updatedTasks = task.tasks.map((subtask) =>
            subtask.id === subtaskId
              ? { ...subtask, completed: !subtask.completed }
              : subtask
          );
          const completedCount = updatedTasks.filter((t) => t.completed).length;
          const progress = Math.round(
            (completedCount / updatedTasks.length) * 100
          );
          return { ...task, tasks: updatedTasks, progress };
        }
        return task;
      })
    );
  };

  const handleAddStaff = () => {
    if (newStaffName.trim()) {
      setStaff((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: newStaffName,
          status: "available",
          currentRoom: null,
        },
      ]);
      setNewStaffName("");
      setIsStaffModalOpen(false);
    }
  };

  const assignStaff = (taskId, staffId) => {
    const staffMember = staff.find((s) => s.id === staffId);
    if (staffMember) {
      setActiveTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, cleaner: staffMember.name } : task
        )
      );
      setStaff((prev) =>
        prev.map((s) =>
          s.id === staffId
            ? {
                ...s,
                status: "busy",
                currentRoom: activeTasks.find((t) => t.id === taskId)?.roomId,
              }
            : s
        )
      );
    }
  };

  const stats = {
    requireCleaning: rooms.filter((r) => r.status === "dirty").length,
    inProgress: rooms.filter((r) => r.status === "maintenance").length,
    pending: activeTasks.filter((t) => t.status === "pending").length,
    staff:
      staff.filter((s) => s.status === "available").length + "/" + staff.length,
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Управление уборкой
        </h1>
        <p className="text-gray-600 mt-1">
          Контроль уборки номеров и управление персоналом
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Требуют уборки</p>
                <p className="text-2xl font-bold text-red-600">
                  {stats.requireCleaning}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">В процессе</p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.inProgress}
                </p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ожидают</p>
                <p className="text-2xl font-bold text-orange-600">
                  {stats.pending}
                </p>
              </div>
              <Timer className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Персонал</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.staff}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Room Status */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bed className="h-5 w-5" />
              Статус уборки номеров
            </CardTitle>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Задачи
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Номер {room.id}</span>
                    <Badge className={`${getStatusColor(room.status)} text-xs`}>
                      {getStatusText(room.status)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{room.hotel}</p>
                  <p className="text-xs text-gray-500">
                    {room.type} • {room.cleaningDate}
                  </p>
                  {room.notes && (
                    <p className="text-xs text-blue-600 mt-1">{room.notes}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={`${getPriorityColor(room.priority)} text-xs`}
                  >
                    {getPriorityText(room.priority)}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Active Tasks */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Активные задачи уборки
            </CardTitle>
            <Dialog open={isStaffModalOpen} onOpenChange={setIsStaffModalOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Персонал
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Управление персоналом</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Персонал уборки</Label>
                    {staff.map((person) => (
                      <div
                        key={person.id}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                      >
                        <div>
                          <span className="font-medium">{person.name}</span>
                          <p className="text-sm text-gray-600">
                            {person.status === "busy"
                              ? `Убирает номер ${person.currentRoom}`
                              : "Доступен"}
                          </p>
                        </div>
                        <Badge
                          className={
                            person.status === "busy"
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }
                        >
                          {person.status === "busy" ? "Занят" : "Свободен"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4">
                    <Label htmlFor="staffName">Добавить сотрудника</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        id="staffName"
                        value={newStaffName}
                        onChange={(e) => setNewStaffName(e.target.value)}
                        placeholder="Имя сотрудника"
                      />
                      <Button onClick={handleAddStaff}>Добавить</Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeTasks.map((task) => (
              <div
                key={task.id}
                className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => handleTaskClick(task)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Номер {task.roomId}</span>
                    <Badge
                      className={`${getTaskStatusColor(task.status)} text-xs`}
                    >
                      {getTaskStatusText(task.status)}
                    </Badge>
                    <Badge
                      className={`${getPriorityColor(task.priority)} text-xs`}
                    >
                      {getPriorityText(task.priority)}
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-500">
                    {task.timeElapsed} мин
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-2">{task.hotel}</p>
                <p className="text-sm text-gray-700 mb-2">
                  Исполнитель: {task.cleaner || "Не назначен"}
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Прогресс</span>
                    <span>{task.progress}%</span>
                  </div>
                  <Progress value={task.progress} className="h-2" />
                </div>

                <div className="mt-2 space-y-1">
                  <p className="text-xs text-gray-600">Чек-лист:</p>
                  {task.tasks.map((subtask) => (
                    <div
                      key={subtask.id}
                      className="flex items-center gap-2 text-xs"
                    >
                      {subtask.completed ? (
                        <CheckSquare className="h-3 w-3 text-green-600" />
                      ) : (
                        <Square className="h-3 w-3 text-gray-400" />
                      )}
                      <span
                        className={
                          subtask.completed
                            ? "line-through text-gray-500"
                            : "text-gray-700"
                        }
                      >
                        {subtask.name}
                      </span>
                    </div>
                  ))}
                </div>

                {task.notes && (
                  <p className="text-xs text-blue-600 mt-2 italic">
                    Примечание: {task.notes}
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <Dialog open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                Задача уборки - Номер {selectedTask.roomId}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge
                  className={`${getTaskStatusColor(
                    selectedTask.status
                  )} text-xs`}
                >
                  {getTaskStatusText(selectedTask.status)}
                </Badge>
                <Badge
                  className={`${getPriorityColor(
                    selectedTask.priority
                  )} text-xs`}
                >
                  {getPriorityText(selectedTask.priority)}
                </Badge>
              </div>

              <div>
                <Label>Исполнитель</Label>
                <Select
                  value={selectedTask.cleaner || ""}
                  onValueChange={(value) => {
                    const staffMember = staff.find((s) => s.name === value);
                    if (staffMember) {
                      assignStaff(selectedTask.id, staffMember.id);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите сотрудника" />
                  </SelectTrigger>
                  <SelectContent>
                    {staff
                      .filter((s) => s.status === "available")
                      .map((person) => (
                        <SelectItem key={person.id} value={person.name}>
                          {person.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Прогресс ({selectedTask.progress}%)</Label>
                <Progress value={selectedTask.progress} className="h-2 mt-2" />
              </div>

              <div>
                <Label>Чек-лист задач</Label>
                <div className="space-y-2 mt-2">
                  {selectedTask.tasks.map((subtask) => (
                    <div key={subtask.id} className="flex items-center gap-2">
                      <Checkbox
                        checked={subtask.completed}
                        onCheckedChange={() =>
                          handleSubtaskToggle(selectedTask.id, subtask.id)
                        }
                      />
                      <span
                        className={
                          subtask.completed
                            ? "line-through text-gray-500"
                            : "text-gray-700"
                        }
                      >
                        {subtask.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Примечания</Label>
                <Textarea
                  value={selectedTask.notes}
                  onChange={(e) =>
                    handleTaskUpdate(selectedTask.id, { notes: e.target.value })
                  }
                  placeholder="Добавить примечание..."
                  rows={3}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default AdminCleaning;
