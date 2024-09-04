import { http, createConfig, cookieStorage,
  createStorage } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { holesky } from './chains'
import { injected,coinbaseWallet,walletConnect,metaMask } from "wagmi/connectors"
import {defaultWallet} from './connectors'

export const getConfig = ()=>{
  return createConfig({
    chains: [mainnet, sepolia,holesky],
    ssr:true,
    connectors:[defaultWallet,injected(),coinbaseWallet()],
    storage: createStorage({
      storage: cookieStorage,
    }),
    transports: {
      [holesky.id]: http(),
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
  })
}