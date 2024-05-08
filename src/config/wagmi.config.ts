import { createConfig, http } from "wagmi";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";
import {
  blast, // Blast 메인넷
  blastSepolia, // Blast Sepolia 테스트넷
  mainnet, // Ethereum 메인넷
  goerli, // Ethereum Sepolia 테스트넷
  optimism, // Optimism 메인넷
  // optimismSepolia
  // optimismGoerli, // Optimism 테스트넷
  arbitrum, // Arbitrum 메인넷
  arbitrumGoerli, // Arbitrum 테스트넷
  avalanche, // Avalanche 메인넷
  avalancheFuji, // Avalanche 테스트넷
  bsc, // BNB 메인넷
  bscTestnet, // BNB 테스트넷
  klaytn, // Klaytn 메인넷
  klaytnBaobab, // Klaytn 테스트넷,
} from "wagmi/chains";

export const wagmiConfig = createConfig({
  chains: [
    blast,
    blastSepolia,
    mainnet,
    goerli,
    // optimism,
    // optimismGoerli,
    arbitrum,
    arbitrumGoerli,
    avalanche,
    avalancheFuji,
    bsc,
    bscTestnet,
    klaytn,
    klaytnBaobab,
  ],
  ssr: true,
  connectors: [
    injected({ target: "metaMask" }),
    coinbaseWallet({ appName: "Split" }),
    walletConnect({ projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "" }),
  ],
  transports: {
    [blast.id]: http(process.env.NEXT_PUBLIC_BLAST_MAINNET_RPC_URL || ""),
    [blastSepolia.id]: http(process.env.NEXT_PUBLIC_BLAST_SEPOLIA_TESTNET_RPC_URL || ""),
    [mainnet.id]: http(process.env.NEXT_PUBLIC_ETHEREUM_MAINNET_RPC_URL || ""),
    [goerli.id]: http(process.env.NEXT_PUBLIC_GOERLI_RPC_URL || ""),
    [optimism.id]: http(process.env.NEXT_PUBLIC_OPTIMISM_RPC_URL || ""),
    // [optimismGoerli.id]: http(process.env.NEXT_PUBLIC_OPTIMISM_GOERLI_RPC_URL || ""),
    [arbitrum.id]: http(process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL || ""),
    [arbitrumGoerli.id]: http(process.env.NEXT_PUBLIC_ARBITRUM_GOERLI_RPC_URL || ""),
    [avalanche.id]: http(process.env.NEXT_PUBLIC_AVALANCHE_RPC_URL || ""),
    [avalancheFuji.id]: http(process.env.NEXT_PUBLIC_AVALANCHE_FUJI_RPC_URL || ""),
    [bsc.id]: http(process.env.NEXT_PUBLIC_BSC_RPC_URL || ""),
    [bscTestnet.id]: http(process.env.NEXT_PUBLIC_BSC_TESTNET_RPC_URL || ""),
    [klaytn.id]: http(process.env.NEXT_PUBLIC_KLAYTN_RPC_URL || ""),
    [klaytnBaobab.id]: http(process.env.NEXT_PUBLIC_KLAYTN_BAOBAB_RPC_URL || ""),
  },
});
