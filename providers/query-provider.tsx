'use client';

import {
  QueryClient,
  QueryClientProvider,
  type DehydratedState,
} from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import * as React from 'react';

const ReactQueryDevtools = dynamic(
  () =>
    import('@tanstack/react-query-devtools').then((m) => m.ReactQueryDevtools),
  { ssr: false, loading: () => null },
);

export function QueryProvider({
  children,
}: {
  children: React.ReactNode;
  state?: DehydratedState;
}) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV !== 'production' ? (
        <ReactQueryDevtools initialIsOpen={false} position="right" />
      ) : null}
    </QueryClientProvider>
  );
}
