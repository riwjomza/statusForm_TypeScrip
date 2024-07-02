'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/features/shadcn/components/ui/input';
import { Button } from '@/features/shadcn/components/ui/button';
import { useUser } from '@/app/context/UserContext';

type LoginFormInputs = {
  Username: string;
  Password: string;
};

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const { setUser } = useUser(); // Get setUser from context

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await fetch('http://10.50.10.5:8000/Service_a.svc/rest/Login_hana', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.Status === 'Pass') {
        console.log('Login successful:', result);

        // Set user data in context
        setUser({
          E_FName: result.E_FName,
          E_Name: result.E_Name,
          EN_No: result.EN_No,
        });

        const userPath = result.FPosuse === 'PROGRAMMERs' ? 'admin/leaves/YES' : 'leaves/NO';
        router.push(`/${userPath},${result.EN_No}`);
      } else {
        throw new Error(result.Message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Incorrect EN or Password, Please try again.');
    }
  };

  return (
    <>
      <h2 className="border-b border-dotted text-center text-3xl font-bold text-gray-900">
        Document Request Status Form
      </h2>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-gray-300 p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          {errorMessage && (
            <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 mb-2">
                Employee Number (EN)
              </label>
              <Input
                id="username"
                type="text"
                {...register('Username', { required: 'Username is required' })}
                className="w-full p-2 border rounded"
              />
              {errors.Username && (
                <p className="text-red-600 mt-1">{errors.Username.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                {...register('Password', { required: 'Password is required' })}
                className="w-full p-2 border rounded"
              />
              {errors.Password && (
                <p className="text-red-600 mt-1">{errors.Password.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full py-2 mt-4" disabled={Object.keys(errors).length > 0}>
              Login
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
