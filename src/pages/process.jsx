


import img from "../imgs/img";
import { useState, useEffect } from "react";

function Process() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imgurl, setImgUrl] = useState(null);
    const [ocrvalue, setocrvalue] = useState("");
    const [processing, setProcessing] = useState(false);
    const [myJsonData, setMyJsonData] = useState(null);
    const [switchtype,setswitchtype] = useState("text");
    const [modifydata,setmodifydata] = useState("");
    const [currentkey,setcurrentkey] = useState("");

    // Function to convert raw text to JSON-like structure
    const textToJSON = (text) => {
        const lines = text.split('\n');
        const json = {};

        lines.forEach(line => {
            if (line.includes(':')) {
                const [key,value] = line.split(':');
                const trimmedKey = key.trim();
                json[trimmedKey] = ``;
            }
        });
        // const lines = text.split('\n');
        // const json = {};
        // let currentKey = '';

        // lines.forEach(line => {
        //     // Split each line into key and value parts
        //     const [key, value] = line.split(':');

        //     // Trim whitespace from key and value
        //     const trimmedKey = key.trim();
        //     const trimmedValue = value ? value.trim() : '';

        //     // If the key is not empty, update currentKey
        //     if (trimmedKey !== '') {
        //         currentKey = trimmedKey;
        //         json[currentKey] = trimmedValue;
        //     } else {
        //         // If the key is empty, append the value to the current key
        //         json[currentKey] += ' ' + trimmedValue;
        //     }
        // });

        return json;
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file.name);
            setImgUrl(URL.createObjectURL(file));
        }
    };

    const sendFiles = async (e) => {
        e.preventDefault();
        setProcessing(true);
        try {
            const formData = new FormData();
            const myFiles = document.getElementById('myFiles').files;

            for (let i = 0; i < myFiles.length; i++) {
                const file = myFiles[i];
                formData.append(file.name, file);
            }

            const response = await fetch('http://localhost:3500/veryfi', {
                method: 'POST',
                body: formData
            });

            const json = await response.json();
            setocrvalue(json);
            setProcessing(false);
        } catch (err) {
            console.log(err);
            setProcessing(false);
        }
    };

    useEffect(() => {
        if (ocrvalue) {
            const jsonData = textToJSON(ocrvalue);
            setMyJsonData(jsonData);
            console.log(`jsonData: ${JSON.stringify(myJsonData)}`);
        }
    }, [ocrvalue]);
    const modifyfunction = (e) =>{
        e.preventDefault();
        if(!modifydata){
            console.log(`no modifydata is found`)
        }else{
            const originaldata = {...myJsonData}
            const valueToMove = originaldata[currentkey];

            // Create a new object to store the updated key order
            const newOrder = {};
        
            // Iterate through the keys of the original data
            Object.keys(originaldata).forEach((key) => {
                // If the current key matches the key being modified, replace it with the new key and value
                if (key === currentkey) {
                    newOrder[modifydata] = valueToMove;
                } else {
                    // Otherwise, keep the original key-value pair
                    newOrder[key] = originaldata[key];
                }
            });
        
            // Update the state with the new object
            setMyJsonData(newOrder);
            setmodifydata("");
            setcurrentkey("");
        }
    }

    return (
        <div className=" bg-gray-900 font-mono">
            <div className='md:m-auto flex flex-col flex-wrap text-wrap pb-24 border-4' style={{maxWidth:"1450px"}} >
                <div className="flex justify-center flex-wrap w-auto h-auto">
                    <div className="flex flex-col items-center mt-9">
                        <h1 className=" md:text-5xl text-2xl text-white">See Your self</h1>
                        <h1 className="break-words text-center mt-2 text-white md:text-lg text-sm" style={{maxWidth : "52rem"}}>Choose from invoices,account & credit card statements, trade register excerpts, payroll statements,identification document and convice yourself.</h1>
                    </div>
                </div>
                <div className="flex gap-10 mt-12 flex-wrap justify-center border-2 border-yellow-200">
                    {
                        imgurl ? (
                            <div className="flex flex-col items-center">
                                <img className="object-contain h-fit md:max-w-28" src={imgurl} alt="" />
                                <h1 className="text-3xl text-yellow-400 mt-3">{selectedFile}</h1>
                            </div>
                        ):(
                            <>
                                <div className="flex justify-center items-center md:max-w-28 overflow-auto text-green-500 border-4 text-4xl p-4 h-28" style={{ whiteSpace: 'pre-wrap' }}>
                                    Your file input
                                </div>                            
                            </>
                        )
                    }
                    {
                        ocrvalue ? (
                            <>
                                <pre className="md:max-w-28 overflow-auto border-none text-green-500  max-h-34 border-4">
                                    {ocrvalue}
                                </pre>
                            </>
                        ):(
                            <>
                                <div className="flex flex-col justify-center items-center md:max-w-28 overflow-auto text-green-500 border-4 text-4xl p-4 h-28" style={{ whiteSpace: 'pre-wrap' }}>
                                    <div>YOUR RESULT</div>
                                    <div>(RAW TEXT)</div>
                                </div>
                            </>
                        )
                    }
                    <div className="flex flex-col items-center">
                    <label htmlFor="myFiles" className="hover:cursor-pointer border-dashed border-4 border-yellow-400 flex flex-col justify-center items-center w-auto md:p-6 p-10">
                        <input 
                            type="file" 
                            id="myFiles" 
                            accept="*/*" 
                            multiple 
                            className="hidden"
                            onChange={handleFileUpload}
                        />
                        <>
                            <img className="mt-7 md:max-h-15 md:h-auto h-32" src={img.fileupload} alt="" />
                            <h1 className="text-3xl text-yellow-400 mt-3">Click here</h1>
                            <h1 className="text-2xl mt-3 text-white mb-7">PDF, TIFF, JPEG & PNG</h1>
                        </>                            
                    </label>
                        <select className=" mt-2 p-2 text-md border-none rounded-md hover:cursor-pointer">
                            <option value="select">Select OCR services</option>
                            <option value="">Verify(recommend)</option>
                            <option value="">Google lens</option>
                            <option value="">Google vision</option>
                        </select>
                        <button className={!processing ? "text-white mt-4 text-md p-2 rounded-md w-52 bg-yellow-400 hover:bg-yellow-200" : "text-white mt-6 text-md p-2 rounded-md w-52 bg-yellow-500 opacity-50 cursor-not-allowed"} disabled={processing} onClick={sendFiles}> {processing ? "PROCESSING....." : "START OCR"}</button>
                    </div>
                </div>
                <div className="flex justify-center items-center p-10 flex-wrap border-4 border-blue-400 text-white">
                    <div className= {switchtype !== "json" ? "border-4 border-gray-300 p-10 flex flex-col items-center gap-4 rounded-lg" : "border-4 border-green-500 p-10 flex flex-col items-center gap-4 rounded-lg"}>
                        <h1 className="mb-2 text-3xl text-yellow-400">Defaul Template</h1>

                        <div className="flex border-2">
                            <div className="border-2 p-5 text-center hover:cursor-pointer hover:bg-green-600" onClick={()=> setswitchtype("json")}> .JSON </div>
                            <div className="border-2 p-5 text-center hover:cursor-pointer hover:bg-gray-300" onClick={() => setswitchtype("text")}> Text </div>
                        </div>
                        
                        {
                            switchtype == "json" && myJsonData!=undefined ? (
                                <div className="text-green-500">
                                    <pre>{JSON.stringify(myJsonData, null,3)}</pre>
                                </div>
                            ): switchtype == "text" && myJsonData !=undefined ? (
                                <div className="text-gray-300">
                                    {
                                        modifydata ? (
                                            <>
                                                <form onSubmit={modifyfunction} className="mb-6">
                                                    <h1>Modify</h1>
                                                    <input type="text" value={modifydata} onChange={(e) => setmodifydata(e.target.value)} className="text-red-600 mr-2" />
                                                    <button type="submit">CHANGE</button>
                                                </form>
                                            </>
                                        ):(
                                            <>
                                                <div className="text-center mb-4 text-wrap">Click any field you want to modify in this template</div>
                                            </>
                                        )
                                    }
                                    {
                                        Object.entries(myJsonData).map(([key, value]) => (
                                            <div key={key} className=" hover:cursor-pointer border-2 p-2" onClick={() => {setmodifydata(key);setcurrentkey(key)}}>
                                                {key} : {value}
                                            </div>
                                        ))
                                    }
                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Process;