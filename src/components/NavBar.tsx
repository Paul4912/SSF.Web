import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import walletModal from "../utilities/WalletProviders";
import Button from '@material-ui/core/Button'


const NavBar: React.FC = () => {

    const [isLoggedIn, setLogin] = useState<boolean>(false);
    const [account, setAccount] = useState<string>("");


    async function connectWalletFromCache() {
        if (walletModal.cachedProvider) {
            const connection = await walletModal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            let accounts = await provider.listAccounts()
            if(accounts) {
                setLogin(true);
                setAccount(accounts[0]);
            }
        }
    }

    async function connectWallet() {
        clearWalletCache()
        const connection = await walletModal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        let accounts = await provider.listAccounts()
        if(accounts) {
            setLogin(true);
            setAccount(accounts[0]);
        }
    }

    function clearWalletCache() {
        walletModal.clearCachedProvider();
        setLogin(false);
        setAccount("");
    }

    useEffect(() => {
        connectWalletFromCache()
    }, [])

    const loggedInView = <div id="account">
        <p id="account-text">{account}</p>
        <Button className="account-button" size="medium" variant="contained" color="primary" onClick={() => { clearWalletCache(); }}>
            Disconnect
        </Button>
    </div>

    const loggedOutView = <div id="account">
        <Button className="account-button" size="medium" variant="contained" color="primary" onClick={() => { connectWallet(); }}>
            Connect Wallet
        </Button>
    </div>

    const content = isLoggedIn ? loggedInView : loggedOutView;

    return (
      <div className="NavBar">
          {content}
      </div>
    );
}

export default NavBar;