import { authClient } from "@/lib/auth/client";


export const useAuth = () => {
  const { data, isPending, } = authClient.useSession();

  const logout = (redirectTo: string = "/auth") => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = redirectTo;
        }
      }
    });
  }

  return {
    user: (data?.user || null),
    session: data?.session || null,
    logout,
    register: authClient.signUp,
    login: authClient.signIn,
    isPending: isPending,
  };
};