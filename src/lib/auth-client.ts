import { createAuthClient } from "better-auth/react";
import { redirect } from "next/navigation";

export const authClient = createAuthClient();

/**
 * Function do sign out the current logged user.
 * @param path Specify a path where the user will be redirected after sign-out
 */
export const logout = (path?: string) => {
  authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        redirect(path ?? "/sign-in");
      },
    },
  });
};
