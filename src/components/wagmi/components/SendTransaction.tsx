import { useEffect, useMemo, useState } from 'react';
import { parseEther } from 'viem';
import { useAccount, useBalance, useSendTransaction, useTransaction } from 'wagmi';

const InputClass = `border border-gray-300 rounded-md px-4 py-2 w-[200px]`;
const buttonClass = `bg-blue-500 w-[200px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`;
const disabledButtonClass = `bg-gray-500 w-[200px] hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-not-allowed`;
const SendTransaction = () => {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { data: hash, isPending, sendTransaction } = useSendTransaction();
  const [toAddress, setToAddress] = useState<`0x${string}`>();
  const [amount, setAmount] = useState('');
  const isSend = useMemo(()=>{
    if (balance && balance.value < parseEther(amount)) {
      return false;
    }
    return true;
  },[amount,balance])
  useEffect(() => { 
    if (balance && balance.value < parseEther(amount)) {
      console.log('您钱包的余额不足以支持该交易');
    }
  },[amount,balance])
  const handleSend = () => {
    if (!toAddress || !amount || isPending || !isSend) return;
    console.log("发送交易",{toAddress,amount});
    sendTransaction({ to: toAddress, value: parseEther(amount) });
  };
  return (
    <div className="flex flex-col gap-1">
      <input className={InputClass} type="text" placeholder="To Address" value={toAddress} onChange={e => setToAddress(e.target.value as `0x${string}`)} />
      <input className={InputClass} type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <button className={`${isSend? buttonClass : disabledButtonClass}`} onClick={handleSend} disabled={!isSend || isPending}>
        {isPending ? 'Pending...' : isSend? 'Send' : 'Insufficient balance'}
      </button>
      {hash && <div className="text-blue-500">Transaction Hash: {hash}</div>}
    </div>
  );
};
export default SendTransaction;
