import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';

export function Account() {
  const { address, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  const formattedAddress = formatAddress(address);

  return (
    <div>
      <div>
        {ensAvatar ? (
          <img alt="ENS Avatar" src={ensAvatar} />
        ) : (
          <div />
        )}
        <div>
          {address && (
            <div>
              {ensName ? `${ensName} (${formattedAddress})` : formattedAddress}
            </div>
          )}
          <div>
            Connected to {connector?.name} Connector
          </div>
        </div>
      </div>
      <button onClick={() => disconnect()} type="button">
        Disconnect
      </button>
    </div>
  );
}

function formatAddress(address?: string) {
  if (!address) return null;
  return `${address.slice(0, 6)}…${address.slice(38, 42)}`;
}
