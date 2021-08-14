import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import walletModal from "../../utilities/WalletProviders";
import { BigNumber } from '@ethersproject/bignumber';
import Modal from '@material-ui/core/Modal';
import { MarketItem } from '../NFTMarket/NFTMarket'


import {
    nftmarketaddress, nftaddress
} from '../../config'

import Market from '../../artifacts/contracts/Marketplace.sol/NFTMarket.json';
import NFT from '../../artifacts/contracts/NFT.sol/NFT.json';

type NFTData = {
  name: string,
  description: string,
  image: string,
  tokenId: number
}

const MyNFTs: React.FC = () => {

  const history = useHistory();

  const [nfts, setNfts] = useState<NFTData[]>([])
  const [listedNFTs, setlistedNFTs] = useState<MarketItem[]>([])

  const [loadingState, setLoadingState] = useState('not-loaded')

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = (tokenId: number) => {
    updateTokenId(tokenId);
    setOpen(true);
  }
  const [inputPrice, updateInputPrice] = useState<string>("")
  const [tokenId, updateTokenId] = useState<number>(0)
  
  useEffect(() => {

    async function loadAllOwnedNFTs() {
      await loadNFTs();
      await loadListedNFTs();
      setLoadingState('loaded');
    }

    loadAllOwnedNFTs()
  }, [])

  async function loadNFTs() {
    const connection = await walletModal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, signer)

    const data: BigNumber[] = await tokenContract.fetchMyNFTs();
    data?.forEach(async x => {
      let tokenUri = await tokenContract.tokenURI(x.toNumber().toString())
      let nftMetadata = await axios.get(tokenUri)
      let nftData: NFTData = {
        name: nftMetadata?.data?.name,
        description: nftMetadata?.data?.description,
        image: nftMetadata?.data?.image,
        tokenId: x.toNumber()
      }
      setNfts(nfts => [...nfts, nftData]);
    });
  }

  async function loadListedNFTs() {
    const connection = await walletModal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, signer)
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    
    const data: any[] = await marketContract.fetchItemsListed();
    data?.forEach(async x => {
      let tokenUri = await tokenContract.tokenURI(x.tokenId.toNumber().toString())
      let nftMetadata = await axios.get(tokenUri)
      let marketItem: MarketItem = {
        name: nftMetadata?.data?.name,
        description: nftMetadata?.data?.description,
        image: nftMetadata?.data?.image,
        tokenId: x.tokenId.toNumber(),
        owner: x.owner,
        seller: x.seller,
        price: ethers.utils.formatEther(x.price),
        itemId: x.itemId.toNumber()
      }
      setlistedNFTs(listedNFTs => [...listedNFTs, marketItem]);
    });
  }

  async function listToMarket(tokenId: number, price: number) {
    const connection = await walletModal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner()
    let contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)

    let listingPrice = await contract.getListingPrice()
    const priceInWei: BigNumber = ethers.utils.parseUnits(price.toString(), 'ether');

    let transaction = await contract.createMarketItem(nftaddress, tokenId, priceInWei, { value: listingPrice })
    await transaction.wait()
    history.push('/Market');
  }

  async function unlistFromMarket(itemId: number) {
    const connection = await walletModal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner()
    let contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)

    let transaction = await contract.unlistMarketItem(nftaddress, itemId);
    await transaction.wait()
    history.push('/MyNFTs');
  }

  if (loadingState === 'loaded' && !nfts.length && !listedNFTs.length) return (<h1 className="py-10 px-20 text-3xl">No assets owned</h1>)
  return (
      <div className='MyNFTs'>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="InputModal">
            <h2 id="simple-modal-title">List Item For Sale</h2>
            <input
              placeholder="Asset Price in Bnb"
              className="mt-2 border rounded p-4"
              onChange={e => updateInputPrice(e.target.value)}
            />
            <button onClick={() => listToMarket(tokenId, parseFloat(inputPrice))} className="ListNFT-Button">
                Submit
            </button>
          </div>
        </Modal>
        <h1>NFT's in my wallet</h1>
          {
            nfts?.map((nft: NFTData, i: number) => (
              <div key={i} className="MyNFT">
                <img src={nft.image} className="rounded" alt="NFT" />
                <div className="NFT-Caption">
                  <p className="NFT-Name">Name: {nft.name}</p>
                  <p className="NFT-Description">Description: {nft.description}</p>
                  <button onClick={() => handleOpen(nft.tokenId)} className="ListNFT-Button">
                      List to Market
                  </button>
                </div>
              </div>
            ))
          }
        <h1>NFT's I've Listed on Market</h1>
          {
            listedNFTs?.map((nft: MarketItem, i: number) => (
              <div key={i} className="MyNFT">
                <img src={nft.image} className="rounded" alt="NFT" />
                <div className="NFT-Caption">
                  <p className="NFT-Name">Name: {nft.name}</p>
                  <p className="NFT-Description">Description: {nft.description}</p>
                  <p className="NFT-Price">Price: {nft.price} BNB</p>
                  <button onClick={() => unlistFromMarket(nft.itemId) }className="UnlistNFT-Button">
                      Unlist from Market
                  </button>
                </div>
              </div>
            ))
          }
      </div>
  )
}

export default MyNFTs