import {
  MessagesSquare,
  ClipboardPlus,
  CalendarDays,
  ChevronsLeft,
  UserRound,
  BellRing,
  Settings,
  House,
} from 'lucide-react';

export const tabs = [
  {
    title: 'Home',
    icon: <House />,
  },
  {
    title: 'Events',
    icon: <CalendarDays />,
  },
  {
    title: 'Speakers',
    icon: <UserRound />,
  },
  {
    title: 'Reports',
    icon: <ClipboardPlus />,
  },
  {
    title: 'Notifications',
    icon: <BellRing />,
  },
  {
    title: 'Messages',
    icon: <MessagesSquare />,
  },
  {
    title: 'Settings',
    icon: <Settings />,
  },
  {
    title: 'Collapse',
    icon: <ChevronsLeft />,
  },
];
