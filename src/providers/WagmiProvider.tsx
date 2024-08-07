"use client"
import {ReactNode, useState} from "react";
import { type State, WagmiProvider } from 'wagmi'
import {getConfig} from "@/wagmi"

interface WalletProviderProps {
  children: ReactNode;
  initialState: State | undefined,
}

export const WalletProvider = ({ children,initialState }: WalletProviderProps) => {{
  const [config] = useState(() => getConfig())
  return (
  <WagmiProvider config={config} initialState={initialState}>
    {children}
  </WagmiProvider>
)}};

