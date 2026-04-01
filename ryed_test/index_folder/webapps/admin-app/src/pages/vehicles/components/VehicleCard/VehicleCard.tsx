import { Button } from '@/components/ui/Button/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card/Card';
import { Vehicle } from '@/models/vehicle/vehicle';
import { ChevronRight } from 'lucide-react';

import { Link } from 'react-router-dom';

interface Props {
  data: Vehicle;
}

export const VehicleCard: React.FC<Props> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {data.make}: {data.model}
        </CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter className="justify-end">
        <Button asChild>
          <Link
            to={`/vehicles/${data.id}`}
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
