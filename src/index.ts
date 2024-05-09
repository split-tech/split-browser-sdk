import client from "./browser-client-factory";
export { createInstance } from "./browser-client-factory";
export const { init, addReferral } = client;
export { SplitBrowserProvider, useSplitBrowser } from "./BrowserProvider";
export type { SplitProviderConfig } from "./BrowserProvider";
export type { SplitConfig } from "./browser-client";
