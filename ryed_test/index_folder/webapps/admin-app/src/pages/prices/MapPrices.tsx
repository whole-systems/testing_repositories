// components/MapPrices.tsx

import { mapOptions } from '@/common/mapStyles';
import { Button } from '@/components/ui/Button/Button';
import {
  GoogleMap,
  Polygon,
  InfoWindow,
  Polyline,
  OverlayView,
} from '@react-google-maps/api';
import { FC, useMemo } from 'react';
import { useMapPrices } from './hooks/useMapPrices';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select/Select';
import { Input } from '@/components/ui/Input/Input';
import { PricesTable } from './components/PricesTable/PricesTable';
import { Pencil } from 'lucide-react';
import './scrollbar.css';
import { DeletePopover } from './components/DeletePopover/DeletePopover';
import { CountryPricesTable } from './components/CountryPricesTable/CountryPricesTable';
import { Card } from '@/components/ui/Card/Card';
import { OSMPlaceAutocomplete } from '@/components/OSMPlaceAutocomplete/OSMPlaceAutocomplete';
import React from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@ryed/ui';

export const MapPrices: FC = () => {
  const { data, handlers } = useMapPrices();

  const polylinePath = useMemo(() => {
    if (data.selectedRegions.length === 2) {
      return [
        handlers.getPolygonCenter(data.selectedRegions[0].polygonLines),
        handlers.getPolygonCenter(data.selectedRegions[1].polygonLines),
      ];
    }
    return null;
  }, [data.selectedRegions, handlers]);

  const mapOptionsWithCursor = {
    ...mapOptions,
    clickableIcons: false,
    draggableCursor: data.isDrawing ? 'crosshair' : undefined,
  };
  return (
    <div className="flex flex-col h-[100%] w-[96vw] mt-4 ml-2">
      <div className="flex flex-1 min-h-0">
        <div className="flex-1">
          <GoogleMap
            mapContainerStyle={{
              height: '97%',
            }}
            center={data.center}
            zoom={10}
            onLoad={data.onLoad}
            options={mapOptionsWithCursor}
            onClick={handlers.handleMapClick}
            onRightClick={handlers.handleMapRightClick}
            onMouseMove={handlers.handleMapMouseMove}
            onMouseOut={handlers.handleMapMouseOut}
          >
            {data.existingRegionsPolygons.map((polygon) => {
              const isEditingPolygon =
                data.isEditing && data.editingPolygonId === polygon.id;
              const isPolygonClickable =
                !data.isDrawing && (!data.isEditing || isEditingPolygon);

              return (
                <React.Fragment key={polygon.id}>
                  <Polygon
                    key={polygon.id}
                    paths={
                      isEditingPolygon ? data.currentPolygonPath : polygon.path
                    }
                    options={{
                      fillColor: data.selectedRegions.some(
                        (r) => r.id === polygon.id
                      )
                        ? 'blue'
                        : polygon.polygonLinesColors.fill,
                      fillOpacity: isEditingPolygon
                        ? polygon.polygonLinesColors['fill-opacity']
                        : data.isEditing
                        ? 0.2
                        : polygon.polygonLinesColors['fill-opacity'],
                      strokeOpacity: data.selectedRegions.some(
                        (r) => r.id === polygon.id
                      )
                        ? 2
                        : 0,
                      strokeWeight: data.selectedRegions.some(
                        (r) => r.id === polygon.id
                      )
                        ? 3
                        : 0,
                      clickable: isPolygonClickable,
                      editable: isEditingPolygon,
                      draggable: isEditingPolygon,
                      strokeColor:
                        isEditingPolygon ||
                        data.selectedRegions.some((r) => r.id === polygon.id)
                          ? 'red'
                          : polygon.polygonLinesColors.stroke,
                    }}
                    onClick={(event) => {
                      if (isPolygonClickable) {
                        handlers.handlePolygonClick(polygon, event);
                      }
                    }}
                    onMouseUp={() => {
                      if (isEditingPolygon) {
                        handlers.handlePolygonEdit(polygon);
                      }
                    }}
                    onDragEnd={() => {
                      if (isEditingPolygon) {
                        handlers.handlePolygonEdit(polygon);
                      }
                    }}
                    onLoad={(polygonInstance) => {
                      data.polygonRefs.current[polygon.id] = polygonInstance;
                    }}
                    onUnmount={() => {
                      delete data.polygonRefs.current[polygon.id];
                    }}
                  />

                  <OverlayView
                    position={handlers.getPolygonCenter(polygon.polygonLines)}
                    mapPaneName={OverlayView.FLOAT_PANE}
                  >
                    <div
                      style={{
                        display: 'inline-block',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        color: '#fff',
                        padding: '4px 8px',
                        borderRadius: 4,
                        transform: 'translate(-50%, -50%)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {polygon.name}
                    </div>
                  </OverlayView>
                </React.Fragment>
              );
            })}

            {data.isDrawing && data.currentPolygonPath.length > 0 && (
              <Polygon
                paths={
                  data.currentMousePosition
                    ? [...data.currentPolygonPath, data.currentMousePosition]
                    : data.currentPolygonPath
                }
                options={{
                  fillColor: 'yellow',
                  fillOpacity: 0.2,
                  strokeColor: 'yellow',
                  strokeOpacity: 1,
                  strokeWeight: 2,
                  clickable: false,
                }}
              />
            )}

            {data.selectedRegions.length === 2 && polylinePath && (
              <Polyline
                key={`polyline_${data.selectedRegions[0].id}_${data.selectedRegions[1].id}`}
                path={polylinePath}
                options={{
                  strokeColor: '#FF0000',
                  strokeOpacity: 1.0,
                  strokeWeight: 2,
                }}
                onLoad={(polyline) => {
                  // Remove previous polyline if it exists
                  if (data.polylineRef.current) {
                    data.polylineRef.current.setMap(null);
                  }
                  // Store reference to new polyline
                  data.polylineRef.current = polyline;
                }}
                onUnmount={() => {
                  // Clear reference when polyline is unmounted
                  if (data.polylineRef.current) {
                    data.polylineRef.current.setMap(null);
                    data.polylineRef.current = null;
                  }
                }}
              />
            )}

            {!data.isEditing && data.selectedPolygon !== null && (
              <InfoWindow
                position={handlers.getPolygonCenter(
                  data.selectedPolygon.polygonLines
                )}
                onCloseClick={() => handlers.setSelectedPolygon(null)}
              >
                <div>
                  <h3 style={{ color: 'black' }}>
                    {
                      data.allRegions.find(
                        (p) => p.id === data.selectedPolygon?.id
                      )?.name
                    }
                  </h3>
                  <p style={{ color: 'black' }}>
                    ID: {data.selectedPolygon?.id}
                  </p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
        <div className="w-[800px] pl-4 flex flex-col min-h-0 mb-4">
          <Tabs defaultValue="edit" className="flex flex-col flex-1 min-h-0">
            <TabsList className="w-full shrink-0">
              <TabsTrigger value="edit" className="w-full">
                Regions
              </TabsTrigger>
              <TabsTrigger value="countryPrices" className="w-full">
                Country Prices
              </TabsTrigger>
            </TabsList>
            <TabsContent value="edit" className="flex-1 flex flex-col min-h-0">
              <div className="flex flex-col gap-2 min-h-0">
                <div className="flex flex-row gap-2 shrink-0">
                  <Select
                    onValueChange={(value) =>
                      handlers.setActiveCountryId(value)
                    }
                    value={data.activeCountryId || ''}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {data.supportedRegions.map((region) => (
                        <SelectItem key={region.id} value={region.id}>
                          {region.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    onValueChange={(currency) =>
                      handlers.handleOpenConfirmChangeCurrencyModal(currency)
                    }
                    value={data.countryCurrency}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {data.currencyList.map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Card className="p-4 shrink-0">
                  {!data.isEditing && (
                    <div className="flex gap-2">
                      <Button
                        className="flex-1"
                        onClick={() => {
                          if (data.isDrawing) {
                            handlers.finishPolygon();
                          } else {
                            handlers.startDrawing();
                          }
                        }}
                      >
                        {data.isDrawing ? 'Save Polygon' : 'Add New Polygon'}
                      </Button>
                      {data.isDrawing && (
                        <Button
                          variant={'destructive'}
                          className="flex-1"
                          onClick={() => {
                            handlers.cancelDrawing();
                            handlers.setGoogleSearchPopupOpen(false);
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  )}

                  {(data.isDrawing || data.isEditing) && (
                    <>
                      {data.isDrawing && (
                        <p className="my-2">
                          You can also right-click on the map to save the
                          polygon.
                        </p>
                      )}
                      <div className="flex items-center gap-2">
                        <Input
                          type="text"
                          placeholder="Polygon Name"
                          value={data.polygonName}
                          onChange={(e) =>
                            handlers.changePolygonName(e.target.value)
                          }
                          className="flex-1"
                        />
                        <Button
                          variant="secondary"
                          onClick={() =>
                            handlers.setGoogleSearchPopupOpen(true)
                          }
                          className="p-2"
                          aria-label="Search Location"
                        >
                          <span className="material-icons">Choose place</span>
                        </Button>
                      </div>
                    </>
                  )}
                </Card>
                {data.isEditing && (
                  <Button
                    onClick={handlers.finishPolygonEditing}
                    className="shrink-0"
                  >
                    Save Changes
                  </Button>
                )}
                <Card
                  className="min-h-0 flex-1 overflow-y-auto px-4 pb-4"
                  id="scrollbar"
                >
                  <h2 className="text-lg font-semibold sticky top-0 bg-background z-10">
                    Existing Regions
                  </h2>
                  <ul className="mt-2 space-y">
                    {data.existingRegionsPolygons.map((polygon) => (
                      <li
                        key={polygon.id}
                        ref={
                          data.selectedPolygon?.id === polygon.id
                            ? data.selectedRegionRef
                            : null
                        }
                        className={`flex items-center justify-between border-b pl-2 py-1 ${
                          data.selectedPolygon?.id === polygon.id
                            ? 'bg-[#1f2937]'
                            : ''
                        }`}
                      >
                        <span
                          className={`cursor-pointer ${
                            data.selectedPolygon?.id === polygon.id
                              ? 'font-bold'
                              : ''
                          }`}
                          onClick={(e) =>
                            handlers.handleViewOnMap(polygon, e.shiftKey)
                          }
                        >
                          {polygon.name}
                        </span>
                        <div className="mr-1">
                          <Button
                            size="sm"
                            className="mr-2"
                            onClick={() =>
                              handlers.startEditingPolygon(polygon)
                            }
                          >
                            <Pencil />
                          </Button>

                          <DeletePopover
                            open={data.openPopover}
                            setOpen={handlers.setOpenPopover}
                            deleteRegionHandler={handlers.deleteRegionHandler}
                            polygon={polygon}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="countryPrices">
              {data.activeCountryId && (
                <CountryPricesTable countryId={data.activeCountryId} />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <PricesTable
          allRegions={data.allRegions}
          selectedRegions={data.selectedRegions}
          setSelectedRegions={handlers.setSelectedRegions}
          countryCurrency={data.countryCurrency}
          refetchAllRegions={handlers.refetchAllRegions}
        />
      </div>
      {data.isGoogleSearchPopupOpen && data.supportedCountries && (
        <Card className="absolute z-50 bg-background shadow-md p-4 rounded-md top-[0] left-0 w-full">
          <OSMPlaceAutocomplete
            onChooseLocation={(location) => {
              console.log(location, 'location');
               handlers.setMapLocation(location);
            }}
            value={''}
            placeholder="Search location (OSM)"
            countryCode={
              data.supportedCountries.find(
                (country) => country.id === data.activeCountryId
              )?.countryCode
            }
            featureTypes={['city', 'district', 'airport']}
          />
          <div className="flex flex-row gap-2 items-center mt-2">
            <span className="text-sm color-[white]">Radius</span>
            <Input
              value={data.radius}
              onChange={(e) => handlers.setRadius(Number(e.target.value))}
            />
          </div>
          <Button
            variant="destructive"
            onClick={() => {
              handlers.setRegionName('');
              handlers.setRadius(100);
              handlers.setGoogleSearchPopupOpen(false);
            }}
            className="mt-2"
          >
            Close
          </Button>
          <Button
            variant="default"
            onClick={() => {
              handlers.getPolygonHandler();
            }}
            className="mt-2 ml-2"
          >
            Submit
          </Button>
        </Card>
      )}

      <AlertDialog open={data.isShowConfirmCurrencyModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Changing the currency will update prices based on the selected
              region.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handlers.handleRejectChangeCurrency}>
              Cancel
            </AlertDialogCancel>

            <Button
              variant={'default'}
              onClick={handlers.handleConfirmChangeCurrency}
            >
              Change Currency
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
