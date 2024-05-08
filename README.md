# Split SDK

On-chain based, Referral SDK for Web3 applications.

### Setup

```bash
# Using npm
npm install @split-tech/browser-sdk

# Using yarn
yarn add @split-tech/browser-sdk
```

### API Key

Get your API key from [Split Partner App](https://partner.split.marketing).

### Usage

```javascript
// _app.tsx
import React from "react";
import { SplitBrowserProvider } from "@split-tech/browser-sdk";

export default function App({ Component, pageProps: { sessions, ...pageProps } }: AppProps) {
  return (
    <SplitBrowserProvider apiKey={YOUR_API_KEY} config={{ referralParams: "referredBy", interval: 10000 }}>
      <Component {...pageProps} />
    </SplitBrowserProvider>
  );
}
```

### Error Messages

- `SplitSDKError: Invalid API Key`
- `SplitSDKError: Invalid referral code`
- `SplitSDKError: Failed to add referral data`.

### More Information

For more detailed documentation visit here [Split SDK Documentation.](https://s-organization-294.gitbook.io/split)
