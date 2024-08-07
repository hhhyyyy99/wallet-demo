import { http, createConfig, cookieStorage,
  createStorage } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected,coinbaseWallet,walletConnect,metaMask } from "wagmi/connectors"

export const getConfig = ()=>{
  return createConfig({
    chains: [mainnet, sepolia],
    ssr:true,
    connectors:[injected(),coinbaseWallet()],
    storage: createStorage({
      storage: cookieStorage,
    }),
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
  })
}