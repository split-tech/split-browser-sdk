import client from "./browser-client-factory";
export { createInstance } from "./browser-client-factory";
export const { init, addReferral } = client;
export { SplitBrowserProvider, useSplitBrowser } from "./BrowserProvider";
