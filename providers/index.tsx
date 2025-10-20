'use client';

import type { DehydratedState } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import React from 'react';
import { Toaster } from 'sonner';
import { QueryProvider } from './query-provider';

const Providers = ({
  children,
  dehydratedState,
}: {
  children: React.ReactNode;
  dehydratedState?: DehydratedState;
}) => {
  return (
    <QueryProvider state={dehydratedState}>
      <NuqsAdapter>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </NuqsAdapter>
    </QueryProvider>
  );
};

export default Providers;
