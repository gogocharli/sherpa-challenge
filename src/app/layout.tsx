import type { Metadata } from 'next';
import '../styles/global.css';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Trip Details',
  description: 'Trip Details',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
      <Toaster />
    </html>
  );
}
