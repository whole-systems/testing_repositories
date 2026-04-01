import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { polygonColors } from '../utils/polygonColors';
import {
  useCreateRegionMutation,
  useDeleteRegionMutation,
  useGetSupportedCountriesQuery,
  useUpdateRegionMutation,
  useGetAllRegionsQuery,
  useUpdateCountryCurrencyMutation,
  useGetCountryPricingQuery,
} from '@/api/regionsEndpoints';
import { Region, SupportedCountry } from '@/models/regions';
import { calculatePolygonArea } from '@/utils/calculatePolygonArea/calculatePolygonArea';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useGetDefaultCurrenciesQuery } from '@/api/configEndpoints/configEndpoints';
import { getCurrencyCodeFromCountry } from '../utils/getCurrencyCodeFromCountry';
import { polygon, simplify } from '@turf/turf';
import { OSMLocation } from '@/models/google';

const MAX_COORDINATES = 300;
export const useMapPrices = () => {
  const [currentPolygonPath, setCurrentPolygonPath] = useState<
    { lat: number; lng: number }[]
  >([]);
  const [createPolygon] = useCreateRegionMutation();
  const [deleteRegion] = useDeleteRegionMutation();
  const [updateRegion] = useUpdateRegionMutation();

  const location = useLocation();
  const navigate = useNavigate();

  const mapRef = useRef<google.maps.Map | null>(null);
  const selectedRegionRef = useRef<HTMLLIElement>(null);
  const hasInitialized = useRef(false);
  const polygonRefs = useRef<{ [key: string]: google.maps.Polygon }>({});
  const polylineRef = useRef<google.maps.Polyline | null>(null);
  const { data: supportedCountries } = useGetSupportedCountriesQuery();
  const [updateCountryCurrency] = useUpdateCountryCurrencyMutation();
  const [supportedRegions, setSupportedRegions] = useState<SupportedCountry[]>(
    []
  );
  const [allRegions, setAllRegions] = useState<Region[]>([]);
  const [activeCountryId, setActiveCountryIdState] = useState<
    string | undefined
  >(undefined);
  const [isDrawing, setIsDrawing] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [polygonName, setPolygonName] = useState('');

  const [selectedPolygon, setSelectedPolygon] = useState<Region | null>(null);
  const [selectedRegions, setSelectedRegions] = useState<Region[]>([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingPolygonId, setEditingPolygonId] = useState<string | null>(null);
  const [currentPolygonColor, setCurrentPolygonColor] = useState<string | null>(
    null
  );

  const [isGoogleSearchPopupOpen, setGoogleSearchPopupOpen] = useState(false);
  const [mapLocation, setMapLocationState] = useState({} as OSMLocation);
  const mapLocationRef = useRef<OSMLocation>({} as OSMLocation);
  const [regionName, setRegionName] = useState('');
  const [radius, setRadius] = useState(100);

  const setMapLocation = useCallback((location: OSMLocation) => {
    mapLocationRef.current = location;
    setMapLocationState(location);
  }, []);

  const [currentMousePosition, setCurrentMousePosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [countryCurrency, setCountryCurrency] = useState<string>('USD');

  const activeCountry = useMemo(
    () => supportedRegions.find((country) => country.id === activeCountryId),
    [supportedRegions, activeCountryId]
  );

  const [isShowConfirmCurrencyModal, setIsShowConfirmCurrencyModal] =
    useState(false);
  const [pendingCurrencyValue, setPendingCurrencyValue] = useState('');

  const { data: allRegionsData, refetch: refetchAllRegions } =
    useGetAllRegionsQuery(
      { countryCode: activeCountry?.countryCode || 'IL' },
      { skip: !activeCountry }
    );

  const { data: countryPricingData } = useGetCountryPricingQuery(
    activeCountryId || '',
    { skip: !activeCountryId }
  );
  const { data: defaultCurrencies } = useGetDefaultCurrenciesQuery({});
  const [currencyList, setCurrencyList] = useState<string[]>([]);

  useEffect(() => {
    const currencyCode = getCurrencyCodeFromCountry(activeCountry?.name ?? '');

    if (currencyCode) {
      if (currencyCode === 'USD') {
        setCurrencyList(['USD']);
      } else if (activeCountry?.countryCode === 'CH') {
        // For Switzerland, add EUR as an option since it's the default currency
        setCurrencyList([currencyCode, 'EUR', 'USD']);
      } else {
        setCurrencyList([currencyCode, 'USD']);
      }
    }
  }, [activeCountry, defaultCurrencies]);

  useEffect(() => {
    const currencyCode = getCurrencyCodeFromCountry(activeCountry?.name ?? '');
    const defaultCurrency =
      activeCountry?.countryCode === 'IL'
        ? 'USD'
        : activeCountry?.countryCode === 'CH'
        ? 'EUR'
        : currencyCode;
    if (countryPricingData) {
      setCountryCurrency(countryPricingData[0]?.currency || defaultCurrency);
    }
  }, [countryPricingData, activeCountry]);

  const updateCountryCurrencyHandler = useCallback(
    (currency: string) => {
      if (!activeCountryId) return;
      updateCountryCurrency({
        supportedCountryId: activeCountryId,
        data: { currency },
      });
      setCountryCurrency(currency);
    },
    [updateCountryCurrency, activeCountryId]
  );
  const handleOpenConfirmChangeCurrencyModal = useCallback(
    (currency: string) => {
      if (!activeCountryId) return;
      setIsShowConfirmCurrencyModal(true);
      setPendingCurrencyValue(currency);
    },
    [activeCountryId]
  );

  const handleConfirmChangeCurrency = useCallback(() => {
    updateCountryCurrencyHandler(pendingCurrencyValue);
    setIsShowConfirmCurrencyModal(false);
    setPendingCurrencyValue('');
  }, [pendingCurrencyValue, updateCountryCurrencyHandler]);

  const handleRejectChangeCurrency = useCallback(() => {
    setIsShowConfirmCurrencyModal(false);
    setPendingCurrencyValue('');
  }, []);

  useEffect(() => {
    if (allRegionsData) {
      setAllRegions(allRegionsData);
    }
  }, [allRegionsData]);

  useEffect(() => {
    if (supportedCountries) {
      setSupportedRegions(supportedCountries);

      const params = new URLSearchParams(location.search);
      const urlCountryId = params.get('countryId');

      if (
        urlCountryId &&
        supportedCountries.some((c) => c.id === urlCountryId)
      ) {
        setActiveCountryIdState(urlCountryId);
      } else {
        setActiveCountryIdState(supportedCountries[0].id);
      }
    }
  }, [location.search, supportedCountries]);

  const setActiveCountryId = (countryId: string) => {
    setActiveCountryIdState(countryId);

    const params = new URLSearchParams(location.search);
    params.set('countryId', countryId);

    navigate(
      {
        pathname: location.pathname,
        search: params.toString(),
      },
      { replace: true }
    );
  };

  // List of predefined colors
  const predefinedColors = useMemo(() => polygonColors, []);

  const existingRegionsPolygons = useMemo(() => {
    const regions = allRegionsData ?? allRegions;
    if (!regions || regions.length === 0) return [];

    const polygonsWithArea = regions.map((region) => {
      // Convert polygonLines to path (lat, lng)
      const path = region.polygonLines.map(([lng, lat]) => ({ lat, lng }));

      // Calculate area
      const area = calculatePolygonArea(path);

      return {
        ...region,
        path,
        area,
      };
    });

    // Sort polygons by area from largest to smallest
    polygonsWithArea.sort((a, b) => b.area - a.area);

    return polygonsWithArea;
  }, [allRegionsData, allRegions]);

  const fitMapToCountry = useCallback(() => {
    if (!mapRef.current) return;

    const country = supportedCountries?.find((c) => c.id === activeCountryId);

    if (!country || !country.centerLocation) return;

    const [lat, lng] = country.centerLocation;

    mapRef.current.setCenter({ lat, lng });
    mapRef.current.setZoom(8);
  }, [activeCountryId, supportedCountries, mapRef]);

  useEffect(() => {
    fitMapToCountry();
  }, [activeCountryId, fitMapToCountry]);

  // Handle left-click on the map to add a point to the current polygon
  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (!isDrawing) return;

    const latLng = event.latLng;
    if (latLng) {
      const point = { lat: latLng.lat(), lng: latLng.lng() };
      addPointToPolygon(point);
    }
  };

  // Handle right-click on the map to save the current polygon (additional save method)
  const handleMapRightClick = (event: google.maps.MapMouseEvent) => {
    if (!isDrawing) return;
    event.domEvent.preventDefault();

    if (!polygonName.trim()) {
      toast.error('Please enter a name for the polygon.');
      return;
    }

    finishPolygon();
  };

  // Handle mouse movement on the map to update the current mouse position
  const handleMapMouseMove = (event: google.maps.MapMouseEvent) => {
    if (!isDrawing) return;
    const latLng = event.latLng;
    if (latLng) {
      setCurrentMousePosition({ lat: latLng.lat(), lng: latLng.lng() });
    }
  };

  // Map center coordinates
  const center = useMemo(() => ({ lat: 32.0853, lng: 34.7818 }), []);

  // Add a point to the current polygon path
  const addPointToPolygon = (point: { lat: number; lng: number }) => {
    setCurrentPolygonPath((prevPath) => [...prevPath, point]);
  };

  // Finish drawing the polygon and save it
  const finishPolygon = () => {
    if (!activeCountryId) return;
    if (!polygonName.trim()) {
      toast.error('Please enter a name for the polygon.');
      return;
    }
    if (currentPolygonPath.length > 3) {
      const regions = allRegionsData ?? allRegions;
      const color = predefinedColors[regions.length % predefinedColors.length];

      // Lower the coordinates using simplifyPolygonCoordinates
      const coords = currentPolygonPath.map((point) => [point.lng, point.lat]);
      const simplified = simplifyPolygonCoordinates(coords, MAX_COORDINATES);

      const polygonData = {
        name: polygonName.trim(),
        polygonLines: simplified,
        polygonLinesColors: {
          stroke: color,
          fill: color,
          'fill-opacity': 0.5,
          'stroke-width': 2,
        },
      };

      if (isEditing && editingPolygonId) {
        updateRegion({ id: editingPolygonId, data: polygonData }).then(() => {
          refetchAllRegions();
        });
      } else {
        createPolygon({
          countryId: activeCountryId,
          data: polygonData,
        }).then(() => {
          refetchAllRegions();
        });
      }
    } else {
      toast.error('A polygon must have at least 4 points.');
      return;
    }
    setCurrentPolygonPath([]);
    setIsDrawing(false);
    setIsEditing(false);
    setEditingPolygonId(null);
    setCurrentMousePosition(null);
    setPolygonName('');
  };

  // Start drawing a new polygon
  const startDrawing = () => {
    setIsDrawing(true);
    setCurrentPolygonPath([]);
    setCurrentMousePosition(null);
    setPolygonName('');
  };

  const cancelDrawing = () => {
    setIsDrawing(false);
    setCurrentPolygonPath([]);
    setCurrentMousePosition(null);
    setPolygonName('');
  };

  // Update the polygon name
  const changePolygonName = (name: string) => {
    setPolygonName(name);
  };

  // Get the center of a polygon to position the InfoWindow
  const getPolygonCenter = (path: number[][]) => {
    const bounds = new google.maps.LatLngBounds();
    path.forEach((point) =>
      bounds.extend(new google.maps.LatLng(point[1], point[0]))
    );
    const center = bounds.getCenter();
    return { lat: center.lat(), lng: center.lng() };
  };

  // Handle mouse leaving the map area
  const handleMapMouseOut = () => {
    if (isDrawing) {
      setCurrentMousePosition(null);
    }
  };

  const deleteRegionHandler = useCallback(
    (id: string) => {
      deleteRegion({ id }).then(() => {
        refetchAllRegions();
      });
    },
    [deleteRegion, refetchAllRegions]
  );

  const handlePolygonEdit = (polygon: Region) => {
    const polygonInstance = polygonRefs.current[polygon.id];

    if (polygonInstance) {
      const path = polygonInstance.getPath();

      const newPolygonPath = path
        .getArray()
        .map((latLng: google.maps.LatLng) => ({
          lat: latLng.lat(),
          lng: latLng.lng(),
        }));

      // Update current polygon path
      setCurrentPolygonPath(newPolygonPath);
    }
  };

  const finishPolygonEditing = () => {
    if (!editingPolygonId || !currentPolygonPath.length) return;

    const regions = allRegionsData ?? allRegions;
    const color =
      currentPolygonColor ||
      predefinedColors[regions.length % predefinedColors.length];

    // Lower the coordinates using simplifyPolygonCoordinates
    const coords = currentPolygonPath.map((point) => [point.lng, point.lat]);
    const simplified = simplifyPolygonCoordinates(coords, MAX_COORDINATES);

    const polygonData = {
      name: polygonName.trim(),
      polygonLines: simplified,
      polygonLinesColors: {
        stroke: color,
        fill: color,
        'fill-opacity': 0.5,
        'stroke-width': 2,
      },
    };

    updateRegion({ id: editingPolygonId, data: polygonData })
      .then(() => {
        refetchAllRegions();
        setIsEditing(false);
        setEditingPolygonId(null);
        setCurrentPolygonPath([]);
        setPolygonName('');
        setCurrentPolygonColor(null);
        toast.success('Polygon updated successfully.');
      })
      .catch((error) => {
        toast.error('Error updating polygon.');
        console.error('Error updating polygon:', error);
      });
  };

  const startEditingPolygon = (polygon: Region) => {
    setIsDrawing(false);
    setIsEditing(true);
    setEditingPolygonId(polygon.id);
    setPolygonName(polygon.name);

    setCurrentPolygonPath(
      polygon.polygonLines.map(([lng, lat]) => ({ lat, lng }))
    );

    setSelectedPolygon(null);

    const color = polygon.polygonLinesColors.fill || null;
    setCurrentPolygonColor(color);
  };

  const onLoad = (mapInstance: google.maps.Map) => {
    mapRef.current = mapInstance;
  };

  const updateSelectedRegions = (polygon: Region, shiftKey: boolean) => {
    if (!isEditing) {
      setSelectedRegions((prev) => {
        let newSelectedRegions = [];
        if (shiftKey) {
          if (prev.some((region) => region.id === polygon.id)) {
            newSelectedRegions = prev.filter(
              (region) => region.id !== polygon.id
            );
          } else if (prev.length < 2) {
            newSelectedRegions = [...prev, polygon];
          } else {
            newSelectedRegions = [prev[0], polygon];
          }
        } else {
          newSelectedRegions = [polygon];
        }
        return newSelectedRegions;
      });
    }
  };

  const handlePolygonClick = (
    polygon: Region,
    event: google.maps.MapMouseEvent
  ) => {
    if (isDrawing || (isEditing && polygon.id !== editingPolygonId)) return;

    const domEvent = event.domEvent as MouseEvent;
    domEvent.stopPropagation();

    setSelectedPolygon(polygon);

    updateSelectedRegions(polygon, domEvent.getModifierState('Shift'));
  };

  const handleViewOnMap = (polygon: Region, shiftKey: boolean = false) => {
    setSelectedPolygon(polygon);
    const center = getPolygonCenter(polygon.polygonLines);
    mapRef.current?.panTo(center);

    updateSelectedRegions(polygon, shiftKey);
  };
  useEffect(() => {
    if (hasInitialized.current) {
      const params = new URLSearchParams(location.search);

      params.set('countryId', activeCountryId || '');

      params.delete('from');
      params.delete('to');

      if (selectedRegions[0]) {
        params.set('from', selectedRegions[0].id);
      }
      if (selectedRegions[1]) {
        params.set('to', selectedRegions[1].id);
      }

      navigate(
        {
          pathname: location.pathname,
          search: params.toString(),
        },
        { replace: true }
      );
    }
  }, [selectedRegions, activeCountryId]);

  useEffect(() => {
    const regions = allRegionsData ?? allRegions;
    if (regions.length === 0) {
      return;
    }

    const params = new URLSearchParams(location.search);
    const urlCountryId = params.get('countryId');

    if (urlCountryId && urlCountryId !== activeCountryId) {
      setActiveCountryIdState(urlCountryId);
      return;
    }

    const fromId = params.get('from');
    const toId = params.get('to');

    const fromRegion = regions.find((region) => region.id === fromId);
    const toRegion = regions.find((region) => region.id === toId);

    const newSelectedRegions: Region[] = [];

    if (fromRegion) {
      newSelectedRegions.push(fromRegion);
    }
    if (toRegion) {
      newSelectedRegions.push(toRegion);
    }

    const isSame =
      selectedRegions.length === newSelectedRegions.length &&
      selectedRegions.every(
        (region, index) => region.id === newSelectedRegions[index].id
      );

    if (!isSame) {
      setSelectedRegions(newSelectedRegions);
    }

    hasInitialized.current = true;
  }, [allRegionsData, allRegions, location.search, activeCountryId]);
  // Update selectedRegions with fresh data after allRegionsData updates
  useEffect(() => {
    if (selectedRegions.length === 0 || !allRegionsData) return;

    const regions = allRegionsData ?? allRegions;
    // Always limit to maximum 2 regions to prevent drawing extra connections on the map
    const regionsToUpdate = selectedRegions.slice(0, 2);
    const updatedSelectedRegions = regionsToUpdate
      .map((selectedRegion) => {
        const freshRegion = regions.find((r) => r.id === selectedRegion.id);
        return freshRegion || selectedRegion;
      })
      .filter((region) => region !== undefined)
      .slice(0, 2) as Region[]; // Ensure we never have more than 2

    // Only update if regions have actually changed
    const hasChanged =
      updatedSelectedRegions.length !== selectedRegions.length ||
      updatedSelectedRegions.some(
        (updatedRegion, index) =>
          updatedRegion.id !== selectedRegions[index]?.id ||
          JSON.stringify(updatedRegion.fromSupportedRegionsPricing) !==
            JSON.stringify(selectedRegions[index]?.fromSupportedRegionsPricing)
      );

    if (hasChanged) {
      setSelectedRegions(updatedSelectedRegions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allRegionsData, allRegions]);

  // Clean up polyline when selectedRegions change to prevent multiple lines
  useEffect(() => {
    // Remove previous polyline BEFORE new one is created
    // This prevents old lines from remaining on the map
    if (polylineRef.current) {
      polylineRef.current.setMap(null);
      polylineRef.current = null;
    }
  }, [selectedRegions]);

  useEffect(() => {
    if (selectedRegionRef.current) {
      selectedRegionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [selectedPolygon]);

  // Simplify logic for polygon coordinates
  const simplifyPolygonCoordinates = (
    coordinates: number[][],
    maxPoints: number = 500
  ): number[][] => {
    if (coordinates.length <= maxPoints) return coordinates;

    // Validate input coordinates
    if (coordinates.length < 3) {
      console.warn('Polygon has less than 3 coordinates, cannot simplify');
      return coordinates;
    }

    // Ensure coordinates are valid numbers
    const validCoords = coordinates.filter(
      (coord) =>
        coord.length === 2 &&
        typeof coord[0] === 'number' &&
        typeof coord[1] === 'number' &&
        !isNaN(coord[0]) &&
        !isNaN(coord[1])
    );

    if (validCoords.length < 3) {
      console.warn('Not enough valid coordinates in polygon');
      return coordinates;
    }

    let tolerance = 0.0001;
    let step = 0.0001; // Smaller step for better control
    let simplified: number[][][] = [validCoords];
    let lastCount = validCoords.length;

    // Try up to 20 iterations to get as close as possible to maxPoints
    for (let i = 0; i < 20; i++) {
      try {
        // Ensure tolerance is positive and reasonable
        const safeTolerance = Math.max(0.000001, Math.min(tolerance, 1));

        const turfPolygon = polygon([validCoords]);
        const result = simplify(turfPolygon, {
          tolerance: safeTolerance,
          highQuality: false,
          mutate: false,
        });

        if (result.geometry && result.geometry.coordinates) {
          simplified = result.geometry.coordinates as number[][][];
          const count = simplified[0]?.length || 0;

          if (count <= maxPoints && count > 0) {
            // If we just dropped below, try a bit less tolerance for more detail
            if (lastCount > maxPoints && count < maxPoints * 0.95) {
              tolerance = Math.max(0.000001, tolerance - step / 2);
              step /= 2;
              continue;
            }
            break;
          }

          if (count === 0) {
            console.warn('Simplification resulted in empty polygon, stopping');
            break;
          }

          lastCount = count;
          tolerance = Math.min(tolerance + step, 1); // Cap tolerance at 1
        } else {
          console.warn('Invalid simplify result');
          break;
        }
      } catch (error) {
        console.error('Error simplifying polygon:', error);
        console.error(
          `Tolerance: ${tolerance}, Step: ${step}, Iteration: ${i}`
        );
        // Fallback to last working simplification or original coordinates
        if (i === 0) {
          return coordinates; // Return original if first iteration fails
        }
        break;
      }
    }

    // Return simplified coordinates or fallback to original
    return simplified[0]?.length ? simplified[0] : coordinates;
  };

  const getPolygonHandler = useCallback(async () => {
    const currentMapLocation = mapLocationRef.current;
    if (!currentMapLocation || !currentMapLocation.bufferedPolygon || !radius) return;

    let parsedPolygon = currentMapLocation?.bufferedPolygon?.map((line) => ({
      lat: line[1],
      lng: line[0],
    }));
    //Lower the coordinates using simplifyPolygonCoordinates
    if (parsedPolygon && parsedPolygon.length > 0) {
      // Convert to [lng, lat] for turf
      const coords = parsedPolygon.map((p) => [p.lng, p.lat]);
      const simplified = simplifyPolygonCoordinates(coords, MAX_COORDINATES);
      parsedPolygon = simplified.map(([lng, lat]) => ({ lat, lng }));
    }
    setPolygonName(mapLocation.locationName);
    setCurrentPolygonPath(parsedPolygon || []);
    // Center map to the polygon bounds
    if (mapRef.current && parsedPolygon && parsedPolygon.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      parsedPolygon.forEach((point) => {
        bounds.extend(new google.maps.LatLng(point.lat, point.lng));
      });
      mapRef.current.fitBounds(bounds);
    }
  }, [regionName, mapLocation, radius]);

  return {
    data: {
      currentPolygonPath,
      isDrawing,
      center,
      selectedPolygon,
      currentMousePosition,
      polygonName,
      supportedRegions,
      supportedCountries,
      allRegions: allRegionsData ?? allRegions,
      activeCountryId,
      existingRegionsPolygons,
      openPopover,
      mapRef,
      onLoad,
      selectedRegions,
      isEditing,
      editingPolygonId,
      polygonRefs,
      polylineRef,
      selectedRegionRef,
      currencyList,
      countryCurrency,
      mapLocation,
      regionName,
      radius,
      isGoogleSearchPopupOpen,
      isShowConfirmCurrencyModal,
    },
    handlers: {
      handleMapClick,
      handleMapRightClick,
      handleMapMouseMove,
      handleMapMouseOut,
      startDrawing,
      finishPolygon,
      changePolygonName,
      getPolygonCenter,
      setSelectedPolygon,
      setActiveCountryId,
      deleteRegionHandler,
      setOpenPopover,
      startEditingPolygon,
      handlePolygonClick,
      handleViewOnMap,
      handlePolygonEdit,
      finishPolygonEditing,
      setSelectedRegions,
      cancelDrawing,
      updateCountryCurrencyHandler,
      getPolygonHandler,
      setMapLocation,
      setRegionName,
      setRadius,
      setGoogleSearchPopupOpen,
      handleConfirmChangeCurrency,
      handleRejectChangeCurrency,
      handleOpenConfirmChangeCurrencyModal,
      refetchAllRegions,
    },
  };
};
