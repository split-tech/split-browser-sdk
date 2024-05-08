import React, { createContext, useContext, useEffect, PropsWithChildren, useRef } from "react";
import client from "./browser-client-factory";
export { createInstance } from "./browser-client-factory";
export const { init, addReferral } = client;
import { WagmiProvider, useAccount } from "wagmi";
import { SplitConfig } from "./browser-client";
import { wagmiConfig } from "./config/wagmi.config";

type SplitBrowserContextProps = typeof client;

const SplitBrowserContext = createContext<SplitBrowserContextProps>(undefined as unknown as SplitBrowserContextProps);

export const SplitBrowserProvider = ({
  children,
  apiKey,
  config,
}: PropsWithChildren<{
  apiKey: string;
  config?: SplitConfig;
}>) => {
  const { address } = useAccount();
  const browserClient = useRef(client)?.current;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const initSplitBrowser = async () => {
      await browserClient.init(apiKey, config);
    };

    initSplitBrowser();
  }, [apiKey, config]);

  useEffect(() => {
    const handleAddReferral = async () => {
      if (browserClient && address) {
        await browserClient?.addReferral(address);
      }
    };

    // Set the interval with the provided value or default to 10000 milliseconds
    const interval = config?.interval || 10000;
    intervalRef.current = setInterval(handleAddReferral, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [browserClient, address, config?.interval]);

  return (
    <SplitBrowserContext.Provider value={browserClient}>
      <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
    </SplitBrowserContext.Provider>
  );
};

export const useSplitBrowser = () => useContext(SplitBrowserContext);
