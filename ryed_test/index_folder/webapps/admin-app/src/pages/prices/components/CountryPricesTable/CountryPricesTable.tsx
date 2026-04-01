import { FC } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import { VehicleType, getVehicleTypeDisplayName } from '@/models/vehicle/vehicle';
import { useCountryPricesTable } from './hooks/useCountryPricesTable';
import { Card } from '@/components/ui/Card/Card';
import '../../scrollbar.css';

interface CountryPricesTableProps {
  countryId: string;
}

export const CountryPricesTable: FC<CountryPricesTableProps> = ({
  countryId,
}) => {
  const { data, handlers } = useCountryPricesTable(countryId);

  if (data.isLoading) {
    return <p>Loading country prices...</p>;
  }

  return (
    <Card className="p-2 max-h-[400px]">
      <div className="flex flex-row justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Country Prices</h3>
        <Button className="mt-2 h-fit" onClick={handlers.submitPrices}>
          Save Country Prices
        </Button>
      </div>
      <div className="overflow-y-auto max-h-[300px]" id="scrollbar">
        <table className="table-auto w-full">
          <thead className="sticky top-0 z-10 mb-2 bg-[#020817]">
            <tr>
              <th>Vehicle Type</th>
              <th>Price per Minute</th>
              <th>Price per Kilometer</th>
              <th>Base Price</th>
              <th>Half Day Price</th>
              <th>Full Day Price</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(VehicleType).map((vehicleType) => {
              const pricing = data.priceInputs[vehicleType];
              return (
                <tr key={vehicleType}>
                  <td className="border px-1">{getVehicleTypeDisplayName(vehicleType)}</td>
                  <td className="border p-1">
                    <Input
                      type="number"
                      value={pricing?.pricePerMinute ?? ''}
                      placeholder="0"
                      onChange={(e) =>
                        handlers.handlePriceChange(
                          vehicleType,
                          'pricePerMinute',
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-full"
                    />
                  </td>
                  <td className="border p-1">
                    <Input
                      type="number"
                      value={pricing?.pricePerKilometer ?? ''}
                      placeholder="0"
                      onChange={(e) =>
                        handlers.handlePriceChange(
                          vehicleType,
                          'pricePerKilometer',
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-full"
                    />
                  </td>
                  <td className="border p-1">
                    <Input
                      type="number"
                      value={pricing?.basePrice ?? ''}
                      placeholder="0"
                      onChange={(e) =>
                        handlers.handlePriceChange(
                          vehicleType,
                          'basePrice',
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-full"
                    />
                  </td>
                  <td className="border p-1">
                    <Input
                      type="number"
                      value={pricing?.halfDayPrice ?? ''}
                      placeholder="0"
                      onChange={(e) =>
                        handlers.handlePriceChange(
                          vehicleType,
                          'halfDayPrice',
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-full"
                    />
                  </td>
                  <td className="border p-1">
                    <Input
                      type="number"
                      value={pricing?.fullDayPrice ?? ''}
                      placeholder="0"
                      onChange={(e) =>
                        handlers.handlePriceChange(
                          vehicleType,
                          'fullDayPrice',
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-full"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
