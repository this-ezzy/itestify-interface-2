
"use client";
import { client } from "@/app/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

export default function QueryProvider({ children }: { readonly children: React.ReactNode }) {
    return (
        <QueryClientProvider client={client.get()}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
