import { SplitBrowser } from './browser-client';

export const createInstance = () => {
  const client = new SplitBrowser();
  return {
    init: client.init.bind(client),
    sendEvent: client.sendEvent.bind(client),
  };
};

export default createInstance();
