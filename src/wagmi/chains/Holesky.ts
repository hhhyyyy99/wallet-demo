import { defineChain } from "viem"

export const holesky = /*#__PURE__*/ defineChain({
  id: 17000,
  name: 'Ethereum Holesky',
  nativeCurrency: {
    decimals: 18,
    name: 'Holesky',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['https://rpc.holesky.ethpandaops.io'] },
  },
  blockExplorers: {
    default: {
      name: 'Holesky',
      url: 'https://holesky.beaconcha.in',
    },
  },
})
