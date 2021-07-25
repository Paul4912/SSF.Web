import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import axios from 'axios';
import walletModal from "../../utilities/WalletProviders";
import { BigNumber } from '@ethersproject/bignumber'

import {
    nftmarketaddress, nftaddress
} from '../../config'

import Market from '../../artifacts/contracts/Marketplace.sol/NFTMarket.json';
import NFT from '../../artifacts/contracts/Marketplace.sol/NFT.json';

type NFTData = {
  name: string,
  description: string,
  image: string
}

const MyNFTs: React.FC = () => {

  const [nfts, setNfts] = useState<NFTData[]>([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  
  useEffect(() => {
    loadNFTs()
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
        image: nftMetadata?.data?.image
      }
      setNfts(nfts => [...nfts, nftData]);
    });
    setLoadingState('loaded') 
  }

  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No assets owned</h1>)
  return (
      <div className='MyNFTs'>
          {
            nfts.map((nft, i) => (
              <div key={i} className="MyNFT">
                <img src={nft.image} className="rounded" />
                <div className="NFT-Caption">
                  <p className="NFT-Name">Name: {nft.name}</p>
                  <p className="NFT-Description">Description: {nft.description}</p>
                </div>
              </div>
            ))
          }
      </div>
  )
}

export default MyNFTs