"use client";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import Header from './components/Header';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux'
import store from './store'

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  display: "swap",
});

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoCondensed.className}`}
      >
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <Header />
            {children}
            <ReactQueryDevtools />
          </Provider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
