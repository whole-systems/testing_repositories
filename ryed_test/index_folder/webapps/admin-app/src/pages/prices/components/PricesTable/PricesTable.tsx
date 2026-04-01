import { FC, useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { VehicleType } from '@/models/vehicle/vehicle';
import { usePricesTable } from './hooks/usePricesTable';
import { Region } from '@/models/regions';
import '../../scrollbar.css';
import { Card } from '@/components/ui/Card/Card';
import { VehicleTable } from './components/VehicleTable/VehicleTable';
import { Combobox } from '@/components/ui/Combobox/Combobox';

interface PricesTableProps {
  allRegions: Region[];
  selectedRegions: Region[];
  setSelectedRegions: (regions: Region[]) => void;
  countryCurrency: string;
  refetchAllRegions?: () => void;
}

export const PricesTable: FC<PricesTableProps> = ({
  allRegions,
  selectedRegions,
  setSelectedRegions,
  countryCurrency,
  refetchAllRegions,
}) => {
  const { data, handlers } = usePricesTable(
    allRegions,
    selectedRegions,
    countryCurrency,
    refetchAllRegions
  );

  const [comboboxOpen, setComboboxOpen] = useState(false);

  const comboboxOptions = useMemo(() => {
    return data.regionPairs.map(({ fromRegion, toRegion }) => {
      const tabValue = `${fromRegion.id}_${toRegion.id}`;
      const label = fromRegion.id === toRegion.id ? 'Internal' : toRegion.name;
      return {
        value: tabValue,
        label,
      };
    });
  }, [data.regionPairs]);

  if (selectedRegions.length === 0) {
    return <p>Please select a region to set prices.</p>;
  }

  const handleSelectChange = (tabValue: string) => {
    handlers.setActiveTab(tabValue);
    const [fromRegionId, toRegionId] = tabValue.split('_');
    const fromRegionMatch = allRegions.find(
      (region) => region.id === fromRegionId
    );
    const toRegionMatch = allRegions.find((region) => region.id === toRegionId);
    if (fromRegionMatch && toRegionMatch) {
      // Only update selectedRegions if they don't already match the selected pair
      const currentMatches =
        selectedRegions.length === 2 &&
        selectedRegions[0].id === fromRegionMatch.id &&
        selectedRegions[1].id === toRegionMatch.id;

      if (!currentMatches) {
        setSelectedRegions([fromRegionMatch, toRegionMatch]);
      }
    }
  };

  return (
    <Card>
      <div
        className="flex space-x-2 overflow-x-auto bg-gray-800 rounded-md"
        id="scrollbar"
      >
        <span className="text-white font-bold whitespace-nowrap flex items-center ml-2">
          {data.regionPairs[0].fromRegion.name} :
        </span>
        <div className="flex-1 lg:max-w-[700px]">
          <Combobox
            open={comboboxOpen}
            setOpen={setComboboxOpen}
            value={data.activeTab || ''}
            setValue={handleSelectChange}
            options={comboboxOptions}
            selectText="Select region pair"
            searchPlaceHolder="Search regions..."
            notFoundText="No regions found"
            className="hover:bg-gray-700"
          />
        </div>
        {/* {data.regionPairs.map(({ fromRegion, toRegion }) => {
          const tabValue = `${fromRegion.id}_${toRegion.id}`;
          return (
            <TooltipProvider key={tabValue}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    key={tabValue}
                    onClick={() => {
                      handlers.setActiveTab(tabValue);
                      const fromRegionMatch = allRegions.find(
                        (region) => region.id === fromRegion.id
                      );
                      const toRegionMatch = allRegions.find(
                        (region) => region.id === toRegion.id
                      );
                      if (fromRegionMatch && toRegionMatch) {
                        setSelectedRegions([fromRegionMatch, toRegionMatch]);
                      }
                    }}
                    className={`px-3 py-1 ${
                      data.activeTab === tabValue
                        ? 'bg-[#020817] text-white rounded-md m-1'
                        : 'bg-[#02081755] text-white rounded-md m-1'
                    } max-w-[200px]`}
                  >
                    {fromRegion.id === toRegion.id ? (
                      <p
                        className="whitespace-nowrap text-ellipsis line-clamp-1"
                        style={{ fontSize: '0.8rem', color: '#94a3b8' }}
                      >{`Internal`}</p>
                    ) : (
                      <div className="flex items-center">
                        {/* <p
                          className="whitespace-nowrap text-ellipsis line-clamp-1"
                          style={{ fontSize: '0.8rem', color: '#94a3b8' }}
                        >
                          {fromRegion.name}
                        </p>
                        <MoveHorizontal
                          size={16}
                          className="mx-2"
                          color="#94a3b8"
                        /> 
                        <p
                          style={{ fontSize: '0.8rem', color: '#94a3b8' }}
                          className="whitespace-nowrap font-semibold text-ellipsis line-clamp-1"
                        >
                          {toRegion.name}
                        </p>
                      </div>
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {fromRegion.id === toRegion.id ? (
                    <p
                      className=""
                      style={{ fontSize: '1rem' }}
                    >{`${fromRegion.name} (Internal)`}</p>
                  ) : (
                    <div className="flex items-center">
                      {/* <p className="" style={{ fontSize: '1rem' }}>
                        {fromRegion.name}
                      </p>
                      <MoveHorizontal
                        size={16}
                        className="mx-2"
                        color="#94a3b8"
                      /> 
                      <p style={{ fontSize: '1rem' }} className="">
                        {toRegion.name}
                      </p>
                    </div>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })} */}
      </div>
      {data.regionPairs.map(({ fromRegion, toRegion }) => {
        const tabValue = `${fromRegion.id}_${toRegion.id}`;
        const vehicleTypes = Object.values(VehicleType);

        return (
          data.activeTab === tabValue && (
            <div
              key={tabValue}
              className="max-h-[400px] overflow-auto my-2"
              id="scrollbar"
            >
              <div className="flex gap-4">
                <div className="flex-1">
                  <VehicleTable
                    vehicles={vehicleTypes.slice(
                      0,
                      Math.ceil(vehicleTypes.length / 2)
                    )}
                    fromRegion={fromRegion}
                    toRegion={toRegion}
                    priceInputs={data.priceInputs}
                    handlePriceChange={handlers.handlePriceChange}
                    countryCurrency={countryCurrency}
                  />
                </div>
                <div className="flex-1 relative">
                  <div className="flex justify-end absolute top-[-8px] right-2">
                    <Button
                      className="mt-2 h-fit z-20"
                      onClick={() =>
                        handlers.submitPrices(fromRegion.id, toRegion.id)
                      }
                    >
                      Save Prices
                    </Button>
                  </div>
                  <VehicleTable
                    vehicles={vehicleTypes.slice(
                      Math.ceil(vehicleTypes.length / 2)
                    )}
                    fromRegion={fromRegion}
                    toRegion={toRegion}
                    priceInputs={data.priceInputs}
                    handlePriceChange={handlers.handlePriceChange}
                    countryCurrency={countryCurrency}
                  />
                </div>
              </div>
            </div>
          )
        );
      })}
    </Card>
  );
};
