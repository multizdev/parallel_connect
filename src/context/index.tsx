"use client";

import React, { ReactElement, ReactNode } from "react";
import { config, projectId } from "@/config";

import { createWeb3Modal } from "@web3modal/wagmi/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { State, WagmiProvider } from "wagmi";

// Setup queryClient
/**
 * Represents a query client for making queries.
 *
 * @class
 * @name QueryClient
 */
const queryClient: QueryClient = new QueryClient();

if (!projectId) throw new Error("Project ID is not defined");

// Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

/**
 * Web3ModalProvider component accepts the following parameters:
 *
 * @param {ReactNode} children - The child components to be rendered inside the provider.
 * @param {State} [initialState] - The initial state for the provider.
 * @returns {ReactElement} - The rendered React element.
 */
export default function Web3ModalProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}): ReactElement {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
