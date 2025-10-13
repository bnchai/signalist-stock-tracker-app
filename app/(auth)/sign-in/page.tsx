'use client';

import InputField from '@/components/forms/InputField';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-full flex flex-col justify-center">
      <h1 className="form-title">Log In Your Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          name="email"
          label="Email"
          placeholder="Enter your email"
          register={register}
          error={errors.email}
          validation={{
            required: 'Email is required',
            pattern: {
              value: /^\w+@\w+\.\w+$/,
              message: 'Email address is required',
            },
          }}
        />
        <InputField
          name="password"
          label="Password"
          placeholder="Enter a strong password"
          type="password"
          register={register}
          error={errors.password}
          validation={{ required: 'Password is required', minLength: 8 }}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting ? 'Signing In' : 'Sign In'}
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?
            <Link
              href="/sign-up"
              className="ml-2 font-medium text-yellow-500 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
