import Web3Modal from "web3modal"
import WalletConnectProvider from "@walletconnect/ethereum-provider";

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
          rpc: {
            56: 'https://bsc-dataseed.binance.org/'
          },
          network: 'binance',
          chainId: 56
        }
    }
};

const walletModal = new Web3Modal({
  network: "binance",
  cacheProvider: true,
  providerOptions
});


export default walletModal