import { useGetDispatcherQuery, useResetPasswordMutation } from '@/api/dispatchersEndpoints';

export const useDispatchers = () => {
  const { data: dispatchersData, isLoading: dispatchersIsLoading } =
    useGetDispatcherQuery('');
    const [resetPassword ,{isSuccess,isError}] = useResetPasswordMutation()
  console.log(dispatchersData);
  return {
    data: { dispatchersData, dispatchersIsLoading },
    handlers: {resetPassword},
    isSuccess,
    isError
  };
};
