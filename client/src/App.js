import React, { useEffect, useState } from 'react'
import CryptoCoders from "./contracts/CryptoCoders.json"
import getWeb3 from './getWeb3'

const App = () => {
  const [contract, setContract] = useState(null)
  const [account, setAccount] = useState("");
  const [coders, setCoders] = useState([])
  const [mintText, setMintText] = useState("");

  
  const mint = () => {
    contract.methods.mint(mintText).send({ from: account }, (error)=>{
      console.log("it worked")
      if(!error){
        setCoders([...coders, mintText])
        setMintText("");
      }
    });
  }

  const loadNFTS = async (contract) => {
    const totalSupply = await contract.methods.totalSupply().call();
    console.log(totalSupply);
    console.log("trying again");
    let results = [];
    for(let i = 0; i < totalSupply; i++){
      let coder = await contract.methods.names(i).call();
      results.push(coder)
    }
    setCoders(results);
  }

  const loadWeb3Account = async (web3) =>{
    const accounts = await web3.eth.getAccounts();
    if(accounts){
      setAccount(accounts[0]);
    }
  }


  const loadWeb3Contract = async (web3) => {
    const networkId = await web3.eth.net.getId();
    const networkData = CryptoCoders.networks[networkId];
    if(networkData){
      const abi = CryptoCoders.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      setContract(contract);
      return contract;
    }
  }

  useEffect(async ()=>{
    const web3 = await getWeb3();
    await loadWeb3Account(web3)
    let contract = await loadWeb3Contract(web3);
    await loadNFTS(contract)
  }, [])

  return (
    <div>
      <nav className='bg-gray-50 px-5 py-3'>
        <div className='flex justify-between items-center'>
          <h1 className='text-gray-800 text-lg font-semibold' href="#">Crypto Coders</h1>
          <p>{account}</p>
        </div>
      </nav>
      <div className='h-full'>
        <div className='flex flex-col items-center justify-center pt-10'>
            <img className='mb-4' src="https://avatars.dicebear.com/api/pixel-art/pelumi.svg" width="72" />
            <h1 className='font-bold text-2xl mb-2'>Crypto Coders</h1>
            <div className='max-w-xs'>
              <p className='text-center'>These are some of the most highly motivated coders in the world! We are here to learn coding and apply it to the betterment of humanity. We are inventors, innovators, and creators</p>
            </div>
            <div className='pt-4 flex flex-col space-y-2'>
              <input
                type="text"
                value={mintText}
                onChange={(e) => setMintText(e.target.value)}
                placeholder='e.g. Etse'
                className='border-2 rounded-lg px-3 py-1 focus:outline-none focus:border-red-400'
               />
               <button onClick={mint} className='border text-white bg-red-400 rounded-lg px-3 py-1'>mint</button>
            </div>
        </div>
        <div className='flex justify-center items-center pt-6'>
            {coders.map((coder, key) => <div key={key} className='flex flex-col'>
              <img width="120" src={`https://avatars.dicebear.com/api/pixel-art/${coder}.svg`} />
              <span className='text-center'>{coder}</span>
              </div>)}
        
      </div>
    </div>
    </div>
  )
}

export default App

