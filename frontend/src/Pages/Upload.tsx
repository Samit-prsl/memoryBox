import { useState } from "react";

export default function Upload() {


    const [selectedFile, setSelectedFile]: any = useState();
    const [cid, setCid]: any = useState();
    const [name,Setname] : any = useState("")
    const [description,Setdescription] : any = useState("")
    const changeHandler = (event: any) => {
      setSelectedFile(event.target.files[0]);
    };

    const NameChangeHandler = (e:any) =>{
        Setname(e.target.value)
    }

    const DescriptionHandler = (e:any) =>{
        Setdescription(e.target.value)
    }
  
    const handleSubmission = async () => {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        const metadata = JSON.stringify({
          name: name ,
        });
        formData.append("pinataMetadata", metadata);
  
        const options = JSON.stringify({
          cidVersion: 0,
        });
        formData.append("pinataOptions", options);
  
        const res = await fetch(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
            },
            body: formData,
          }
        );
        const resData = await res.json();
        setCid(resData.IpfsHash);
        console.log(resData);
      } catch (error) {
        console.log(error);
      }
    };

    const metaData = {
        "Description" : description,
        "imageURL" : `${import.meta.env.VITE_GATEWAY_URL}/ipfs/${cid}`,
        "Author" : name
    }

    //console.log(metaData.imageURL);
    

   const submitMetadata = async() =>{
            try {
                const Pinning = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS',{
                  method : "POST",
                  headers : {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
                  },
                  body : JSON.stringify(metaData),
                })
                const PinningData = await Pinning.json()
                console.log(PinningData.IpfsHash);  
            } catch (error) {
                console.log(error)
            }
   }

  return (
    <div>
        <label className="form-label">Choose File</label>
        <input type="file" onChange={changeHandler} />
        <input type="text" onChange={NameChangeHandler} className=" bg-green-300 text-slate-600" placeholder="Enter Name" />
        <input type="text" onChange={DescriptionHandler} className=" bg-green-300 text-slate-600" placeholder=" Enter Description" />
        <button onClick={handleSubmission}>Submit</button>
        <button onClick={submitMetadata}>Submit Metadata</button>
        
      )
    </div>
  )
}
