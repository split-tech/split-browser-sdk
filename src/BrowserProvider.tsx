import React, { createContext, useContext, useEffect, PropsWithChildren, useRef, useState } from "react";
import client from "./browser-client-factory";
import { debounce } from "lodash";
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
  const browserClient = useRef(client).current;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isError, setIsError] = useState(false);

  const debouncedInit = useRef(
    debounce(async (apiKey: string, config?: SplitProviderConfig) => {
      await browserClient.init(apiKey, config);
    }, 500),
  ).current;

  useEffect(() => {
    debouncedInit(apiKey, config);

    return () => {
      debouncedInit.cancel(); // 컴포넌트 언마운트 시 디바운스 취소
    };
  }, [apiKey, config, debouncedInit]);

  const handleAddReferral = async () => {
    if (!browserClient || isWalletConnected) return;
    if ((window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({ method: "eth_accounts" });
        if (accounts.length === 0) {
          return;
        }
        await browserClient.addReferral(accounts[0]);

        setIsWalletConnected(true); // 지갑이 연결되면 상태 업데이트
      } catch (error) {
        console.error(ErrorMessage.MSG_ADD_REFERRAL_DATA_FAILED);

        setIsError(true);
      }
    }
  };

  useEffect(() => {
    if (!isWalletConnected && !isError) {
      const interval = config?.refetchInterval || 10000;
      intervalRef.current = setInterval(handleAddReferral, interval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isWalletConnected, config?.refetchInterval, intervalRef]);

  useEffect(() => {
    if ((isWalletConnected || isError) && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [isWalletConnected, isError, intervalRef]);

  return <SplitBrowserContext.Provider value={browserClient}>{children}</SplitBrowserContext.Provider>;
};

export const useSplitBrowser = () => useContext(SplitBrowserContext);
