import { Button } from '@/components/ui/Button/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card/Card';
import { TDriver } from '@/models/driver';
import { ChevronRight } from 'lucide-react';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  driver: TDriver;
}

export const DriverCard: FC<Props> = ({ driver }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{driver.fullName}</CardTitle>
        <CardDescription>{driver.phoneNumber}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter className="justify-between">
        <div>Status: {driver.status}</div>
        <Button>
          <Link
            to={`/drivers/${driver.id}`}
            className="flex justify-between items-center"
          >
            <span>GO TO</span>
            <ChevronRight size={20} />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
