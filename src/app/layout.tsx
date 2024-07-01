'use client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "./lib/store";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import '@emotion/react';
import '@emotion/styled';
import Navbar from './_navbartest/Navbar';
import Footer from './_footer/Footer';


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Omar Social</title>
      </head>
      <body className={inter.className}>
        <Provider store={store}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
            <Navbar />
              {children}
              <Footer/>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </Provider>
      </body>
    </html>
  );
}
