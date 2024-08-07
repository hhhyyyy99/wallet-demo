import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactQueryProvider } from '@/providers/QueryClientProvider';
import { WalletProvider } from '@/providers/WagmiProvider';
import { headers } from 'next/headers'
import { cookieToInitialState } from 'wagmi'
import { getConfig } from '@/wagmi'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WalletDemo',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    getConfig(),
    headers().get('cookie')
  )
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider initialState={initialState}>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
