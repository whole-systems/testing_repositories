import { createBrowserRouter } from 'react-router-dom';
import { SignIn } from '../pages/auth/SignIn/SignIn';
// import { Home } from '@/pages/home/Home';
import { Layout } from '@/components/layout/Layout';
import { Vehicles } from '@/pages/vehicles/Vehicles';
import { Vehicle } from '@/pages/vehicles/pages/Vehicle/Vehicle';
import { Drivers } from '@/pages/drivers/Drivers';
import { Driver } from '@/pages/drivers/pages/Driver/Driver';
import { Journeys } from '@/pages/journeys/Journeys';
import { Journey } from '@/pages/journeys/pages/Journey/Journey';
import { JourneysMetric } from '@/pages/journeys-metric/JourneysMetric';
import { CarModels } from '@/pages/car-models/CarModels';
import { NotFoundPage } from '@/pages/not-found-page/NotFoundPage';
import { Dispatchers } from '@/pages/dispatchers/Dispatchers';
import { TravelAgencies } from '@/pages/travel-agencies/TravelAgencies';
import { TravelAgency } from '@/pages/travel-agencies/pages/travel-agency/TravelAgency';
import { MapPrices } from '@/pages/prices/MapPrices';
import { JourneyServices } from '@/pages/journey-services/JourneyServices';
import { PriceRules } from '@/pages/price-rules/PriceRules';
import { PriceRule } from '@/pages/price-rules/pages/price-rule/PriceRule';
// import { TravelAgents } from '@/pages/travel-agents/TravelAgents';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <JourneysMetric /> },
      { path: '/prices', element: <MapPrices /> },
      { path: '/vehicles', element: <Vehicles /> },
      { path: '/vehicles/:vehicleId', element: <Vehicle /> },
      { path: '/drivers', element: <Drivers /> },
      { path: 'drivers/:driverId', element: <Driver /> },
      { path: '/journeys', element: <Journeys /> },
      { path: '/journeys/:journeyId', element: <Journey /> },
      { path: '/car-models', element: <CarModels /> },
      { path: '/dispatchers', element: <Dispatchers /> },
      { path: '/travel-agencies', element: <TravelAgencies /> },
      { path: '/travel-agencies/:agencyId', element: <TravelAgency /> },
      { path: '/journey-services', element: <JourneyServices /> },
      { path: '/price-rules', element: <PriceRules /> },
      { path: '/price-rules/:priceRuleId', element: <PriceRule  /> },
      { path: '/price-rules/batched/:priceRuleBatchId', element: <PriceRule isBatched /> },
      // { path: '/travel-agents', element: <TravelAgents /> },
      // { path: '/journeys-metric', element: <JourneysMetric /> },
    ],
    errorElement: <NotFoundPage />,
  },
  {
    path: '/auth',
    children: [
      {
        path: '/auth/sign-in',
        element: <SignIn />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);
