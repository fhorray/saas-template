'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2Icon, LockKeyholeIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  name: z.string({ message: 'Provide the restaurant name' }),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const SignInPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log('VALUES: ', data);

    setIsLoading(true);

    try {
      const res = await authClient.signUp.email(data, {
        onSuccess: () => {
          router.replace('/');
        },
      });

      if (res.error) {
        toast.error('Aconteceu um erro!', {
          description:
            res.error?.message === 'Password is too short'
              ? 'Escolha uma senha mais forte.'
              : 'Por favor, tente novamente.',
        });

        setIsLoading(false);

        return;
      }

      setIsLoading(false);

      toast.error('Success!', {
        description: 'You have successfully logged in.',
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-block p-3 rounded-full bg-primary/10">
              <LockKeyholeIcon className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Sign-up</h1>
            <p className="text-sm text-muted-foreground">
              Fill the form to create an account
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Name</Label>
              <Input
                id="name"
                type="name"
                {...register('name')}
                placeholder="Your Name"
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="*********"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Sign-up'
              )}
            </Button>
          </form>
          <div className="text-center text-sm">
            <p className="text-muted-foreground">
              Have an account?{' '}
              <a href="/sign-in" className="text-primary hover:underline">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
