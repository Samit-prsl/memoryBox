import web3 from '../../Web3/Web3'

export default function Home() {

    const contractInteraction = async () =>{
        const Contract = (await web3.contractInteraction("0x545f518126BFFDFF5Baa2dF69828D0E04a4cB355")).Contract
        const walletAddress = (await web3.contractInteraction("0x545f518126BFFDFF5Baa2dF69828D0E04a4cB355")).walletAddress
        console.log(Contract.methods);
        console.log(walletAddress);
    }

    // const requestPayment = async ()=>{

    //     const walletAddress = (await web3.contractInteraction("0x545f518126BFFDFF5Baa2dF69828D0E04a4cB355")).walletAddress
    //     const Pay = await web3.requestTransaction(0.00004,'0x545f518126BFFDFF5Baa2dF69828D0E04a4cB355',walletAddress)
    //     console.log(Pay);   
    // }

    const Mint = async (to:string,uri:string)=>{
      const Contract = (await web3.contractInteraction("0x545f518126BFFDFF5Baa2dF69828D0E04a4cB355")).Contract
      const walletAddress = (await web3.contractInteraction("0x545f518126BFFDFF5Baa2dF69828D0E04a4cB355")).walletAddress
      const Supply = await Contract.methods.totalSupply().call()
      const requiredFunds:any = await Contract.methods.DynamicNftPricing(Supply).call()
      console.log(requiredFunds);
      
      const gas:any = await Contract.methods.safeMint(to, uri).estimateGas({ value: requiredFunds });
      // const Pay = await web3.requestTransaction(requiredFunds,'0x545f518126BFFDFF5Baa2dF69828D0E04a4cB355',walletAddress)
      // console.log(Pay);
      const Minting = (await Contract.methods.safeMint(to,uri).send({value:requiredFunds,gas:gas,from:walletAddress}))
      console.log(Minting);
      
    }
  return (
    <div className=" h-screen flex justify-center items-center bg-slate-800">
     <div className=' flex-col justify-center items-center'>
        <p className=" text-center font-mono text-purple-600 text-5xl my-3">This is Home page</p>
        <div className=' flex justify-center items-center gap-8'>
            <button className=' bg-green-700 hover:bg-green-950 px-5 py-3 text-black rounded-3xl' onClick={()=>{contractInteraction()}}>Interact</button>
            <button className=' bg-green-700 hover:bg-green-950 px-5 py-3 text-black rounded-3xl' onClick={()=>{Mint("0xAe9409008ff373dc1E96D37aD921a2A76F49A847","https://amethyst-absent-whale-734.mypinata.cloud/ipfs/QmQZjpxKRd4axdDvUcfWxi3pjEvhWH8Edmu6WD3uxDBx35")}}>Pay</button>
        </div>
     </div>
    </div>
  )
}
