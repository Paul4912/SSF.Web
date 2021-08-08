import React, { useState } from 'react';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { useHistory } from "react-router-dom";
import { ethers } from 'ethers';
import NFT from '../../artifacts/contracts/NFT.sol/NFT.json';
import SSF from '../../artifacts/contracts/SSF.sol/StupidSexyFlanders.json';
import {
  nftaddress,
  ssfaddress
} from '../../config';
import walletModal from "../../utilities/WalletProviders";

const client = ipfsHttpClient({url: 'https://ipfs.infura.io:5001/api/v0'});

const CreateMeme: React.FC = () => {
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [formInput, updateFormInput] = useState({ name: '', description: '' });
    const history = useHistory();

    async function onChange(e: any) {
        const file = e.target.files[0];

        try {
          const added = await client.add(
            file,
            {
              progress: (prog) => console.log(`received: ${prog}`)
            }
          );
          const url = `https://ipfs.infura.io/ipfs/${added.path}`;
          setFileUrl(url);
        } catch (error) {
          console.log('Error uploading file: ', error)
        }  
    }

    async function createNFT() {
        const { name, description } = formInput;
        if (!name || !description || !fileUrl) return

        const nftData = JSON.stringify({
          name, description, image: fileUrl
        });
        
        try {
          await approveSSF();
          const addedResult = await client.add(nftData);
          const url = `https://ipfs.infura.io/ipfs/${addedResult.path}`;
          await executeCreateNFTContract(url);
        } catch (error) {
          console.log(error)
        }  
        history.push('/MyNFTs');
    }

    async function executeCreateNFTContract(url: string) {
        const connection = await walletModal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        
        let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
        let transaction = await contract.createToken(url);
        await transaction.wait();
    }

    async function approveSSF() {
      const connection = await walletModal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      
      let contract = new ethers.Contract(ssfaddress, SSF.abi, signer);
      let transaction = await contract.approve(nftaddress, ethers.utils.parseEther('1000000000000000'));
      await transaction.wait();
    }

    return (
        <div className='Create-Meme'>
            <input 
                placeholder="Asset Name"
                className="Asset-Name"
                onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
            />
            <textarea
                placeholder="Asset Description"
                className="Asset-Description"
                onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
            />
            <input
                type="file"
                name="Asset"
                className="Asset"
                onChange={onChange}
            />
            {
            fileUrl && (
                <img alt="Meme" className="Asset-Image" width="350" src={fileUrl} />
            )
            }
            <button onClick={createNFT} className="CreateNFT-Button">
                Create Digital Asset
            </button>
        </div>
    )
}

export default CreateMeme