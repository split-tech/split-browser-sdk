import React, { createContext, useContext, useEffect, PropsWithChildren, useRef, useState } from "react";
import client from "./browser-client-factory";
export { createInstance } from "./browser-client-factory";
export const { init, addReferral } = client;
import { SplitConfig } from "./browser-client";
import { ErrorMessage } from "./constants";

export interface SplitProviderConfig extends SplitConfig {
  refetchInterval?: number;
}

export type SplitBrowserContextProps = typeof client;

const SplitBrowserContext = createContext<SplitBrowserContextProps>(undefined as unknown as SplitBrowserContextProps);

export const SplitBrowserProvider = ({
  children,
  apiKey,
  config,
}: PropsWithChildren<{
  apiKey: string;
  config?: SplitProviderConfig;
}>) => {
  const browserClient = useRef(client)?.current;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [retryLimitReached, setRetryLimitReached] = useState(false);

  useEffect(() => {
    const initSplitBrowser = async () => {
      await browserClient.init(apiKey, config);
    };

    initSplitBrowser();
  }, [apiKey, config]);

  useEffect(() => {
    const handleAddReferral = async () => {
      if (!browserClient) return;
      if ((window as any).ethereum && !retryLimitReached) {
        try {
          const accounts = await (window as any).ethereum.request({ method: "eth_accounts" });
          if (accounts.length === 0) {
            return;
          }
          await browserClient.addReferral(accounts[0]);
          setRetryCount(0);
          setRetryLimitReached(false);
        } catch (error) {
          console.error(ErrorMessage.MSG_ADD_REFERRAL_DATA_FAILED);
          setRetryCount((prev) => prev + 1);

          // 최대 3 재시도
          if (retryCount < 3) {
            timeoutRef.current = setTimeout(handleAddReferral, 5000);
          } else {
            setRetryLimitReached(true);
          }
        }
      }
    };

    const interval = config?.refetchInterval || 10000;
    intervalRef.current = setInterval(handleAddReferral, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [config?.refetchInterval, retryCount]);

  return <SplitBrowserContext.Provider value={browserClient}>{children}</SplitBrowserContext.Provider>;
};

export const useSplitBrowser = () => useContext(SplitBrowserContext);
