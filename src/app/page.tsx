import Wagmi from '@/components/wagmi';
BigInt.prototype.toJSON = function () {
  return this.toString();
};
export default function App() {
  return (
    <main>
      <Wagmi />
    </main>
  );
}
