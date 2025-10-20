'use client';

import { AlertCircleIcon, Github } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/use-auth';
import { useForm } from '@/hooks/use-form';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Auth = () => {
  const router = useRouter();

  const { login, register } = useAuth();

  // UX state
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Form
  const form = useForm({
    defaultValues: {} as {
      name?: string;
      email: string;
      password: string;
      confirmPassword?: string;
    },
    onSubmit: async ({ value }) => {
      if (mode === 'login') {
        setFormError(null);
        setIsLoading(true);

        // Call Better Auth email sign-in
        // Docs: authClient.signIn.email({ email, password, ... })
        await login.email(
          {
            email: value.email,
            password: value.password,
            rememberMe: true, // keep session after browser close (default true)
            callbackURL: '/',
          },
          {
            onError: (ctx) => {
              // Capture a more precise error message from the server
              setFormError(ctx.error.message || 'Failed to sign in.');
              setIsLoading(false);
            },
            onSuccess: () => {
              toast.success('Account created! ');
              setIsLoading(false);
              router.push('/');
            },
          },
        );

        return;
      } else {
        if (value.password !== value.confirmPassword) {
          toast.error("Password doesn't match");
          setFormError('Passwords do not match.');
          return;
        }

        setIsLoading(true);

        // Call Better Auth email sign-up
        // Docs: authClient.signUp.email({ email, password, name, ... })
        await register.email(
          {
            email: value.email,
            password: value.password,
            name: value.name as string,
            // If server has email verification, you may add callbackURL here
            callbackURL: '/',
          },
          {
            onError: (ctx) => {
              setFormError(ctx.error.message || 'Failed to create account.');
              setIsLoading(false);
            },
            onSuccess: () => {
              toast.success('Account created! ');
              setIsLoading(false);
              router.push('/');
            },
          },
        );
      }
    },
  });

  // Social provider login (GitHub/Google/Facebook)
  const handleSocialAuth = async (
    provider: 'github' | 'google' | 'facebook',
  ) => {
    setFormError(null);
    setIsLoading(true);

    try {
      await login.social({
        provider,
        callbackURL: '/',
      });
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setFormError('Social sign-in failed.');
    }
  };

  return (
    <div className="mx-auto w-full max-w-md h-screen flex items-center justify-center">
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-col items-center justify-center">
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs
            defaultValue={mode}
            onValueChange={(v) => setMode(v as 'login' | 'register')}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                className="cursor-pointer"
                value="login"
                onClick={() => setMode('login')}
              >
                Login
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="register">
                Register
              </TabsTrigger>
            </TabsList>

            {/* Global error */}
            {formError && (
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>Ops! An error ocurred</AlertTitle>
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}

            {/* LOGIN */}
            <TabsContent value="login" className="space-y-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit(e);
                }}
                className="space-y-4"
              >
                <form.AppField
                  name="email"
                  children={(field) => (
                    <field.InputField
                      label="Email"
                      placeholder="email@opaca.com"
                      type="email"
                    />
                  )}
                />
                <form.AppField
                  name="password"
                  children={(field) => (
                    <field.InputField
                      label="Password"
                      placeholder="**********"
                      type="password"
                    />
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-cms-border/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleSocialAuth('google')}
                  disabled={isLoading}
                  className="w-full"
                >
                  {/* Google icon */}
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => handleSocialAuth('facebook')}
                  disabled={isLoading}
                  className="w-full"
                >
                  {/* Facebook icon */}
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => handleSocialAuth('github')}
                  disabled={isLoading}
                  className="w-full"
                >
                  <Github className="w-5 h-5" aria-hidden="true" />
                </Button>
              </div>
            </TabsContent>

            {/* REGISTER */}
            <TabsContent value="register" className="space-y-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit(e);
                }}
                className="space-y-4"
              >
                <form.AppField
                  name="name"
                  children={(field) => (
                    <field.InputField
                      label="Full Name"
                      placeholder="Mr. Opaca"
                    />
                  )}
                />

                <form.AppField
                  name="email"
                  children={(field) => (
                    <field.InputField
                      label="Email"
                      placeholder="email@opaca.com"
                      type="email"
                    />
                  )}
                />
                <form.AppField
                  name="password"
                  children={(field) => (
                    <field.InputField
                      label="Password"
                      placeholder="**********"
                      type="password"
                    />
                  )}
                />

                <form.AppField
                  name="confirmPassword"
                  children={(field) => (
                    <field.InputField
                      label="Confirm Password"
                      placeholder="**********"
                      type="password"
                    />
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-cms-border/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or register with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleSocialAuth('google')}
                  disabled={isLoading}
                  className="w-full"
                >
                  {/* Google icon (same as above) */}
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => handleSocialAuth('facebook')}
                  disabled={isLoading}
                  className="w-full"
                >
                  {/* Facebook icon (same as above) */}
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => handleSocialAuth('github')}
                  disabled={isLoading}
                  className="w-full"
                >
                  <Github className="w-5 h-5" aria-hidden="true" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
