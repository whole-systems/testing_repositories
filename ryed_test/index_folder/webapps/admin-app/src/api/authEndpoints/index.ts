import { AdminDTO, AuthResponse, User } from '@/models/auth/Auth';
import { adminApi } from '..';
import {
  LOCAL_STORAGE_ACCESS_KEY,
  LOCAL_STORAGE_USER_ENTITY,
} from '@/utils/shared/consts';

export const authEndPoints = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<User, { email: string; password: string }>({
      query: (arg) => {
        return {
          url: 'admin/auth/login',
          method: 'post',
          body: arg,
          data: arg,
        };
      },
      transformResponse: (baseQueryReturnValue: AuthResponse) => {
        const { accessToken, user } = baseQueryReturnValue;
        localStorage.setItem(LOCAL_STORAGE_ACCESS_KEY, accessToken);
        return user;
      },
    }),
    getCurrentUser: builder.query({
      query: () => ({ url: 'admin/auth/self' }),
      transformResponse: (userResponse: User) => {
        const user = {
          logoUrl: userResponse.logoUrl,
          // firstName: userResponse.firstName,
          // lastName: userResponse.lastName,
          email: userResponse.email,
        };

        localStorage.setItem(LOCAL_STORAGE_USER_ENTITY, JSON.stringify(user));
        const userImages = userResponse.image
          ? JSON.parse(userResponse.image)
          : [];

        userResponse.image = userImages.at(0);

        return userResponse;
      },
    }),
    updateCurrentUser: builder.mutation<unknown, AdminDTO>({
      query: ({ id, ...data }) => ({
        method: 'PUT',
        url: `admin/admin/${id}`,
        data,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useSignInMutation,
  useLazyGetCurrentUserQuery,
  useGetCurrentUserQuery,
  useUpdateCurrentUserMutation,
} = authEndPoints;
