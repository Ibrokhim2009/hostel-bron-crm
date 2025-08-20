import { CalendarCheck, DoorOpen, Globe, Hotel, LayoutDashboard, OctagonAlert, Users } from "lucide-react";








export const adminSidebar = [
    {title: 'Аналитика', icon: <LayoutDashboard />, path: '/'},
    {title: 'Отели', icon: <Hotel />, path: '/hotels'},
    {title: 'Номера', icon: <DoorOpen />, path: '/rooms'},
    {title: 'Гости', icon: <Users />, path: '/guests'},
    {title: 'Бранирование', icon: <CalendarCheck />, path: '/book'},
    {title: 'Уборка', icon: <OctagonAlert />, path: '/cleaning'},
    {title: 'Каналы', icon: <Globe />, path: '/channels'},
]






