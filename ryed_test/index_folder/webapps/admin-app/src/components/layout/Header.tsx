import React from 'react';
import { Button } from '../ui/Button/Button';
import { useHeader } from './hooks/useHeader';

import { useGetCurrentUserQuery } from '@/api/authEndpoints';
import { ProfilePreview } from '@/components/layout/components/ProfilePreview';
import {
  Car,
  CircleUserRound,
  Home,
  Menu,
  Route,
  CarTaxiFront,
  // Hotel,
  Plane,
  // ContactRound,
  BellDot,
  Bell,
  Banana,
  DollarSign,
} from 'lucide-react';
import { Separator } from '../ui/Separator/Separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '../ui/Sheet/Sheet';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover/Popover.tsx';
import { Notifications } from '@/components/layout/components/Notifications/Notifications.tsx';
import { Logout } from './components/Logout/Logout';

const menuData = [
  { name: 'Home', route: '/', icon: <Home size={20} /> },
  {
    name: 'Vehicles',
    route: '/vehicles',
    icon: <Car size={20} />,
  },
  {
    name: 'Drivers',
    route: '/drivers',
    icon: <CircleUserRound size={20} />,
  },
  {
    name: 'Journeys',
    route: '/journeys',
    icon: <Route size={20} />,
  },
  {
    name: 'Neto Prices',
    route: '/prices',
    icon: <Route size={20} />,
  },
  {
    name: 'Dispatchers',
    route: '/dispatchers',
    icon: <CarTaxiFront size={20} />,
  },
  // {
  //   name: 'Service Spots',
  //   route: '/service-spots',
  //   icon: <Hotel size={20} />,
  // },
  // {
  //   name: 'Travel Agents',
  //   route: '/travel-agents',
  //   icon: <ContactRound size={20} />,
  // },
  {
    name: 'Travel Agencies',
    route: '/travel-agencies',
    icon: <Plane size={20} />,
  },
  {
    name: 'Car Models',
    route: '/car-models',
    icon: <Car size={20} />,
  },
  {
    name: 'Journey Services',
    route: '/journey-services',
    icon: <Banana size={20} />,
  },
  {
    name: 'Price Rules',
    route: '/price-rules',
    icon: <DollarSign size={20} />,
  },
];

export const Header: React.FC = () => {
  const { handlers, data } = useHeader();
  const { data: user } = useGetCurrentUserQuery({});

  return (
    <header className="w-full">
      <div className="relative z-10 flex-shrink-0 h-16 shadow border-b-2">
        <div className="flex justify-between items-center px-4 sm:px-6 h-full relative">
          <div className="flex items-center">
            <Sheet
              open={data.isDrawerOpen}
              onOpenChange={handlers.toggleDrawer}
            >
              <SheetTrigger onClick={() => handlers.toggleDrawer(true)}>
                <Menu size={24} />
              </SheetTrigger>
              <SheetContent side={'left'} className="flex flex-col">
                <SheetHeader>
                  <div className="pb-2">
                    {user && (
                      <ProfilePreview
                        avatarSrc={user.image!}
                        email={user.email}
                        organizationName={user.companyName}
                      />
                    )}
                  </div>
                </SheetHeader>
                <Separator />
                <div className="flex pt-4 pb-2 flex-1 w-full">
                  <div className="flex w-full  justify-between flex-col">
                    <div>
                      {menuData.map((item, key) => (
                        <div key={key} className="mb-3">
                          <Button
                            className="w-full"
                            variant={'outline'}
                            onClick={() => handlers.goToPage(item.route)}
                          >
                            <span className="mr-2">{item.name}</span>{' '}
                            {item.icon}
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="flex w-full">
                      <Logout />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          {user?.companyName && (
            <h1 className="text-lg font-semibold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {user.companyName}
            </h1>
          )}
          {user && <p className="text-lg font-semibold">{`${user?.email}`}</p>}
          <div className="flex alight-center">
            {user && (
              <p className="text-lg font-semibold mr-3">{`${user?.email}`}</p>
            )}
            <Popover>
              <PopoverTrigger className="cursor-pointer">
                {data.notifyCount > 0 ? (
                  <BellDot className="pt-1" />
                ) : (
                  <Bell className="pt-1" />
                )}
              </PopoverTrigger>
              <PopoverContent className="w-auto max-w-96 mr-3 mt-3">
                <Notifications />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </header>
  );
};
