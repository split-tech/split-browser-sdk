import { SplitBrowser } from "./browser-client";

export const createInstance = () => {
  const client = new SplitBrowser();
  return {
    init: client.init.bind(client),
    addReferral: client.addReferral.bind(client),
  };
};

export default createInstance();
