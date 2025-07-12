// components/ClientLayoutWrapper.tsx
"use client";

import { ReactNode } from "react";
import { QueryProvider } from "@/app/QueryProviders";
import { AuthProvider } from "@/contexts/AuthContext";
import { Providers } from "@/app/providers";
import { ModalGlobal } from "./organism/modal/global";

export default function ClientLayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <AuthProvider>
        <QueryProvider>
          <ModalGlobal />
          {children}
        </QueryProvider>
      </AuthProvider>
    </Providers>
  );
}
