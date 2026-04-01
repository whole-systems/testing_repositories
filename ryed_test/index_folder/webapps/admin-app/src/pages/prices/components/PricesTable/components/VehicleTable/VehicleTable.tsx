import { Input } from '@/components/ui/Input/Input';
import { Region } from '@/models/regions';
import { VehicleType, getVehicleTypeDisplayName } from '@/models/vehicle/vehicle';
import { FC } from 'react';

interface Props {
  vehicles: VehicleType[];
  fromRegion: Region;
  toRegion: Region;
  priceInputs: Record<string, number | ''>;
  countryCurrency: string;
  handlePriceChange: (
    fromRegionId: string,
    toRegionId: string,
    vehicleType: VehicleType,
    price: number
  ) => void;
}

export const VehicleTable: FC<Props> = ({
  vehicles,
  fromRegion,
  toRegion,
  priceInputs,
  handlePriceChange,
  countryCurrency,
}) => {
  return (
    <table className="table-auto w-full">
      <thead className="sticky top-0 z-10 mb-2 bg-[#020817]">
        <tr>
          <th className="px-2 py-2">Vehicle Type</th>
          <th className="px-2 py-2">Price</th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((vehicleType) => {
          const fromToVehicleKey = `${fromRegion.id}_${toRegion.id}_${vehicleType}`;
          return (
            <tr key={vehicleType}>
              <td className="border px-2 py-1">
                <span className="flex justify-between">
                  {getVehicleTypeDisplayName(vehicleType)}
                  <span className="text-sm text-gray-500">
                    {countryCurrency}
                  </span>
                </span>
              </td>
              <td className="border px-2 py-1">
                <Input
                  type="number"
                  value={priceInputs[fromToVehicleKey] ?? ''}
                  placeholder="0"
                  onChange={(e) =>
                    handlePriceChange(
                      fromRegion.id,
                      toRegion.id,
                      vehicleType,
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
  );
};
