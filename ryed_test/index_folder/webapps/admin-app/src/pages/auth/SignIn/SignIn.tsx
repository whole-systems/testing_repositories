import { AxiosBaseQueryError } from '@/api/utils/axiosBaseQuery';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import React from 'react';
import { useSignIn } from './hooks/useSignIn';

export const SignIn: React.FC = () => {
  const { data, handles } = useSignIn();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold my-8">Ryed Admin</h1>
      <div className="border rounded-md p-6 max-w-md w-full mb-32">
        <h2 className="text-2xl text-center font-semibold mb-4">Sign In</h2>
        <form>
          <div className="mb-6">
            <div className="mb-1">
              <Input
                type="email"
                placeholder="Email"
                name="email"
                // autoComplete="username"
                value={data.formik.values.email}
                onChange={data.formik.handleChange}
              />
            </div>
            {data.formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {data.formik.errors.email}
              </p>
            )}
          </div>

          <div>
            <div className="mb-1">
              <Input
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                value={data.formik.values.password}
                onChange={data.formik.handleChange}
              />
            </div>
            {data.formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {data.formik.errors.password}
              </p>
            )}
          </div>
          {data.error && (data.error as AxiosBaseQueryError).status === 404 ? (
            <p className="text-red-500 text-sm mt-1 text-center">
              Invalid username or password.
            </p>
          ) : (
            data.error && (
              <p className="text-red-500 text-sm mt-1 text-center">
                Something wen't wrong.
              </p>
            )
          )}
          <Button
            onClick={handles.handleSubmit}
            disabled={!!Object.keys(data.formik.errors).length || data.loading}
            type="button"
            className="w-full mt-10"
          >
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
};
