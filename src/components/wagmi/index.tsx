'use client';

import { useAccount, useBalance, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import SendTransaction from './components/SendTransaction';
const buttonClass = `bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`;
const Wagmi = () => {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { chains, switchChain } = useSwitchChain();
  const { data: balance } = useBalance({ address: account?.address });
  return (
    <div className="flex flex-col gap-4 p-5">
      <div>
        <h1 className="text-3xl font-bold">Account</h1>
        <div className="flex flex-col gap-2">
          <span>status: {account.status}</span>
          <span>addresses: {JSON.stringify(account.addresses)}</span>
          <span>chainName: {account.chain?.name}</span>
          <span>chainId: {account.chainId}</span>
          <span>balance: {balance?.formatted} {balance?.symbol}</span>
          <span>connector: {account.connector?.name}</span>
        </div>
        {account.status === 'connected' && (
          <button className={buttonClass} type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <SendTransaction/>

      <div>
        <h1 className="text-3xl font-bold">Switch Chain</h1>
        <div className="flex gap-2">
          {chains.map(chain => (
            <button className={buttonClass} key={chain.id} onClick={() => switchChain({ chainId: chain.id })}>
              {chain.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold">Connect</h1>
        <div className="flex gap-2">
          {connectors.map(connector => (
            <button className={`${buttonClass}`} key={connector.uid} onClick={() => connect({ connector })} type="button">
              {connector.name}
            </button>
          ))}
        </div>
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
    </div>
  );
};

export default Wagmi;
