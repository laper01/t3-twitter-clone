import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import { api } from "appt3/utils/api";

import "appt3/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const MyApp: AppType = ({ Component, pageProps }) => {
  return (

    <main className={`font-sans ${inter.variable}`}>
      <ClerkProvider {...pageProps}>
        <Component {...pageProps} />
      </ClerkProvider>
    </main>

  );
};

export default api.withTRPC(MyApp);
