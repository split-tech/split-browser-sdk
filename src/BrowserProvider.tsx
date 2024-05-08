import React, { createContext, useContext, useEffect, PropsWithChildren, useRef } from "react";
import client from "./browser-client-factory";
export { createInstance } from "./browser-client-factory";
export const { init, addReferral } = client;
import { SplitConfig } from "./browser-client";
import { ErrorMessage } from "./constants";

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
      if (!browserClient) return;
      if ((window as any).ethereum) {
        try {
          // 사용자의 이더리움 계정에 접근 요청
          const accounts = await (window as any).ethereum.request({ method: "eth_accounts" });
          if (accounts.length === 0) {
            return;
          }
          await browserClient.addReferral(accounts[0]);
        } catch (error) {
          // TODO: Side effect 확인
          console.error(ErrorMessage.MSG_ADD_REFERRAL_DATA_FAILED);
        }
      }
    };

    const interval = config?.interval || 10000;
    intervalRef.current = setInterval(handleAddReferral, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [browserClient, config?.interval]);

  return <SplitBrowserContext.Provider value={browserClient}>{children}</SplitBrowserContext.Provider>;
};

export const useSplitBrowser = () => useContext(SplitBrowserContext);
