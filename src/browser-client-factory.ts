import { SplitBrowser } from "./browser-client";
import { SplitBrowserProvider, useSplitBrowser } from "./browser-client-provider";

export const createInstance = () => {
  const client = new SplitBrowser();
  return {
    init: client.init.bind(client),
    addReferral: client.addReferral.bind(client),
    SplitBrowserProvider: SplitBrowserProvider,
    useSplitBrowser: useSplitBrowser,
  };
};

export default createInstance();
