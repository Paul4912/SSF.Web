import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import axios from 'axios';
import walletModal from "../../utilities/WalletProviders";
import { useHistory } from "react-router-dom";

import {
    nftmarketaddress, nftaddress
} from '../../config'

import Market from '../../artifacts/contracts/Marketplace.sol/NFTMarket.json';
import NFT from '../../artifacts/contracts/NFT.sol/NFT.json';

export type MarketItem = {
    name: string,
    description: string,
    image: string,
    tokenId: number,
    owner: string,
    seller: string,
    price: string,
    itemId: number
}

const NFTMarket: React.FC = () => {
    const [nfts, setNfts] = useState<MarketItem[]>([]);
    const [loadingState, setLoadingState] = useState('not-loaded');
    const history = useHistory();

    useEffect(() => {
        loadMarketItems()
    }, [])

    async function loadMarketItems() {
        const connection = await walletModal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
        const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider);
        const data: any = await marketContract.fetchMarketItems();

        const items: MarketItem[] = await Promise.all(data.map(async (i: any) => {
            const tokenUri = await tokenContract.tokenURI(i.tokenId);
            const meta = await axios.get(tokenUri);
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
            let item: MarketItem = {
              price: price,
              tokenId: i.tokenId.toNumber(),
              seller: i.seller,
              owner: i.owner,
              image: meta.data.image,
              name: meta.data.name,
              description: meta.data.description,
              itemId: i.itemId.toNumber()
            }
            return item
        }));

        setNfts(items);
        setLoadingState('loaded');
    }

    async function buyNft(nft: MarketItem) {
        const connection = await walletModal.connect();
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    
        const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')   
        const transaction = await contract.createMarketSale(nftaddress, nft.tokenId, {
          value: price
        })
        await transaction.wait()
        history.push('/MyNFTs');
    }

    if (loadingState === 'loaded' && !nfts.length) return (<h1 className="EmptyMarket">No items in marketplace</h1>)
    return (
        <div className='NFTMarket'>
            {
                nfts.map((nft, i) => (
                <div key={i} className="MarketItems">
                    <img src={nft.image} alt="nft" />
                    <div className="MarketItem-Text">
                        <p className="MarketItem-Name">{nft.name}</p>
                        <p className="MarketItem-Desc">{nft.description}</p>
                        <p className="MarketItem-Price">{nft.price} BNB</p>
                        <button className="MarketItem-Buy" onClick={() => buyNft(nft)}>Buy</button>
                    </div>
                </div>
                ))
            }
        </div>
    )
}

export default NFTMarket