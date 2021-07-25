import Web3Modal from "web3modal"
import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
          rpc: {
            56: 'https://bsc-dataseed.binance.org/'
          },
          network: 'binance',
        }
    }
};

const walletModal = new Web3Modal({
  network: "binance",
  cacheProvider: true,
  providerOptions
});


export default walletModal