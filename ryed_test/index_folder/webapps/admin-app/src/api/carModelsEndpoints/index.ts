import { AddCarModelDTO, CarModel } from '@/models/car-models';
import { adminApi } from '..';

export const carModelEndPoints = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getMakesCarDropdown: builder.query<string[], number>({
      query: (year) => ({
        url: `admin/car/dropdown/makes`,
        params: { year },
      }),
    }),
    getModelsCarDropdown: builder.query<
      string[],
      { make: string; year: number }
    >({
      query: ({ year, make }) => ({
        url: `admin/car/dropdown/models`,
        params: { year, make },
      }),
    }),
    getCarModels: builder.query<CarModel[], unknown>({
      query: () => ({
        url: 'admin/car',
        params: {},
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'CAR_MODELS', id } as const)),
              { type: 'CAR_MODELS', id: 'LIST' },
            ]
          : [{ type: 'CAR_MODELS', id: 'LIST' }],
    }),
    addCarModel: builder.mutation<unknown, AddCarModelDTO>({
      query: (data) => ({
        url: 'admin/car',
        method: 'POST',
        data,
      }),
      invalidatesTags: [{ type: 'CAR_MODELS', id: 'LIST' }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetMakesCarDropdownQuery,
  useLazyGetModelsCarDropdownQuery,
  useGetCarModelsQuery,
  useLazyGetCarModelsQuery,
  useAddCarModelMutation,
} = carModelEndPoints;
