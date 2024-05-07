# Split SDK

On-chain based, Referral SDK for Web3 applications.

## Getting Started

This SDK enables on-chain referral rewarding directly within browser environments. Here’s how to set it up:

### Installation

Install the SDK using npm or yarn:

```bash
# Using npm
npm install @split-tech/browser-sdk

# Using yarn
yarn add @split-tech/browser-sdk
```

## Configuration

API Key
Obtain your API key from [Split Marketing](https://partner.split.marketing) to authenticate and use the SDK.

## Initialization

Integrate the API key with your application and initialize the SDK. Here's how you can do it in a **Next.js application**:

```javascript
// _app.tsx
import React, { useMemo } from "react";
import * as split from "@split-tech/browser-sdk";

split.init(process.env.NEXT_PUBLIC_SPLIT_API_KEY, { referralParam: "join" });

export function App({ Component, pageProps }) {
  const value = useMemo(() => ({ addReferral: split.addReferral }), []);
  return (
    <SplitContext.Provider value={value}>
      <Component {...pageProps} />
    </SplitContext.Provider>
  );
}
```

## Usage

When users connect their wallets or perform on-chain events through a URL containing a referral code, please ensure the code is included in the browser URL for accurate tracking. Execute the `addReferral` method to track both the referral code and the user’s wallet address, which initiates the reward process.

Referrals can verify and manage their codes and URLs at `http://split.marketing/[YOUR_PRODUCT_NAME]`, ensuring they have the necessary tools for visibility and success in your referral program.

**Next.js example** for handling wallet connections:

```javascript
// Home.tsx
// URL format: {YOUR_APP_URL}/?join={REFERRAL_CODE}
import React, { useContext } from "react";

export default function Home() {
  const { addReferral } = useContext(SplitContext);
  const handleConnectWallet = () => {
    const getWalletAddress = () => {
      // getting wallet address logics ...
    };
    addReferral(getWalletAddress());
  };

  return (
    <div>
      <button onClick={handleConnectWallet}>Connect Wallet</button>
    </div>
  );
}
```

## Methods

- `split.init(apiKey, config)`: Initializes the SDK with the API key and configuration.

```javascript
const config = {
  // Customize the query parameter name for the referral code
  referralParam: "join",
};
```

- `split.addReferral(referralAddress)`:
  Call this method when a user connects their wallet and performs on-chain events via a referral link, enabling the tracking of referral events.

## Error Messages

#### `SplitSDKError: Invalid API Key`

- **Description:** Occurs if the API key is incorrect, expired, or revoked.
- **Resolution:** Confirm the API key is correct. Manage your API keys via the Split Marketing dashboard.

#### `SplitSDKError: Invalid referral code`

- **Description:** Triggered when the referral code is invalid or nonexistent.
- **Resolution:** Ensure the referral code in the URL or data matches the one generated for your system.

#### `SplitSDKError: Failed to add referral data`

- **Description:** Happens when logging referral data fails due to incorrect or invalid wallet addresses.
- **Resolution:** Check that both the referrer and referee wallet addresses are correct and formatted properly. Ensure network and server connectivity.

## More Information

For more detailed documentation and advanced usage, please refer to the [Split SDK Documentation.](https://splits-organization.gitbook.io/split-sdk-docs)
