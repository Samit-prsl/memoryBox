import web3 from '../../Web3/Web3'

export default function Home() {

    const contractInteraction = async () =>{
        const Contract = (await web3.contractInteraction("0x6B3B8C239A5B89dCA4474FBE94d42Ac93c992ff1")).Contract
        const walletAddress = (await web3.contractInteraction("0x6B3B8C239A5B89dCA4474FBE94d42Ac93c992ff1")).walletAddress
        console.log(Contract.methods);
        console.log(walletAddress);
    }

  return (
    <div className=" h-screen flex justify-center items-center bg-slate-800">
     <div className=' flex-col justify-center items-center'>
        <p className=" text-center font-mono text-purple-600 text-5xl my-3">This is Home page</p>
        <div className=' flex justify-center items-center'>
            <button className=' bg-green-700 hover:bg-green-950 px-5 py-3 text-black rounded-3xl' onClick={()=>{contractInteraction()}}>Interact</button>
        </div>
     </div>
    </div>
  )
}
