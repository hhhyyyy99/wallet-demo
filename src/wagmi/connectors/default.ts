import {injected} from "wagmi/connectors";

export const defaultWallet = injected({
  target: {
    id: 'default',
    name: 'Default Wallet',
    icon:"",
    provider: (window) => window?.ethereum
  },
});