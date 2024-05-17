import img from "../imgs/img";
import { useState, useEffect } from "react";

function Process() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imgurl, setImgUrl] = useState(null);
    const [ocrvalue, setocrvalue] = useState("");
    const [ocrjson, setocrjson] = useState("");
    const [processing, setProcessing] = useState(false);
    const [myJsonData, setMyJsonData] = useState(null);
    const [switchtype, setswitchtype] = useState("text");
    const [error, seterror] = useState("");
    const [inputservice, setinputservice] = useState("");
    const [convertprocess,setconvertprocess] = useState(false);
    const [showform,setshowform] = useState(false);
    const [deletefield,setdeletefield] = useState(false);
    const [addvalue,setaddvalue] = useState("");
    const [modifyfield , setmodifyfield] = useState(false);
    const [objectfield,setobjectfield] = useState({"name":"","id":""});
    const [modifyvalue,setmodifyvalue] = useState();
    const [originalvalue , setoriginalvalue] = useState();


    const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];

    const isFileExtensionAllowed = (filename) => {
        const fileExtension = filename.split('.').pop().toLowerCase();
        return allowedExtensions.includes(fileExtension);
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
        setocrvalue("");
        try {
            setProcessing(true);

            if (!inputservice) {
                throw new Error("Please select a service");
            }
            const formData = new FormData();
            const myFiles = document.getElementById('myFiles').files;

            for (let i = 0; i < myFiles.length; i++) {
                const file = myFiles[i];
                const isAllowed = isFileExtensionAllowed(file.name);
                if (!isAllowed) {
                    throw new Error("We only allow file PDF,TIFF,JPEG and PNG.");
                }
                formData.append('file', file);
            }
            if (myFiles.length <= 0) {
                throw new Error("Please select a file");
            }
            const response = await fetch(`https://fastapi-r12h.onrender.com/text-extraction?service=${inputservice}`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Network response was not ok at sending file');
            }

            const json = await response.json();
            setocrvalue(json);
            setProcessing(false);
            seterror("");
            setswitchtype("text");
        } catch (err) {
            setProcessing(false);
            seterror(err.message);
        }
    };
    const addfunction = (e) => {
        e.preventDefault();
        const original = { ...objectfield };
        if (addvalue) {
            const newField = { [addvalue]: "" };
            const updatedObject = {...newField,...original};
            setobjectfield(updatedObject);
        }
        setaddvalue("");
    }
    const deletefunction = (mykey) =>{
        if(deletefield){
            const original = {...objectfield};
            delete original[mykey];
            setobjectfield(original);
        }
    }
    const modifyfunction = (e) =>{
        e.preventDefault();
        const original = {...objectfield};
        const newobject = {}
        for(const key in original){
            if(key === originalvalue){
                newobject[modifyvalue] = "";
            }else{
                newobject[key] = "";
            }
        }
        setobjectfield(newobject);
    }

    return (
        <div className="bg-gray-900 font-mono">
            <div className='md:m-auto flex flex-col flex-wrap text-wrap pb-24' style={{ maxWidth: "1450px" }}>
                <div className="flex justify-center flex-wrap w-auto h-auto">
                    <div className="flex flex-col items-center mt-9">
                        <h1 className="md:text-5xl text-2xl text-white">See Yourself</h1>
                        <h1 className="break-words text-center mt-2 text-white md:text-lg text-sm" style={{ maxWidth: "52rem" }}>Choose from invoices, account & credit card statements, trade register excerpts, payroll statements, identification document and convince yourself.</h1>
                    </div>
                </div>
                <div className="flex gap-10 mt-12 flex-wrap justify-center border-2 border-yellow-200">
                    {
                        imgurl ? (
                            <div className="flex flex-col items-center">
                                <img className="object-contain h-fit md:max-w-28" src={imgurl} alt="" />
                                <h1 className="text-3xl text-yellow-400 mt-3">{selectedFile}</h1>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center md:max-w-28 overflow-auto text-green-500 border-2 text-4xl p-4 h-28" style={{ whiteSpace: 'pre-wrap' }}>
                                Your file input
                            </div>
                        )
                    }
                    {
                        ocrvalue ? (
                            <div className="md:max-w-28 overflow-auto border-none text-green-500 max-h-34 border-4">
                                {ocrvalue.raw_text}
                            </div>
                        ) : (
                            processing ? (
                                <>
                                    <div className="flex flex-col items-center md:max-w-28 overflow-auto text-blue-400 border-4 text-lg p-4 h-28 text-wrap bg-gray-900 gap-0">
                                        <div className="product-loading2">
                                            <div className="mb-2">This could take a while, please wait...</div>
                                            <div className="tiktok-spinner">
                                                <div className="ball red"></div>
                                                <div className="ball blue"></div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                
                            ) : (
                                <div className="flex flex-col justify-center items-center md:max-w-28 overflow-auto text-green-500 border-2 text-4xl p-4 h-28" style={{ whiteSpace: 'pre-wrap' }}>
                                    <div>YOUR RESULT</div>
                                </div>
                            )
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
                        <select className="mt-2 p-2 text-md border-none rounded-md hover:cursor-pointer" onChange={(e) => setinputservice(e.target.value)}>
                            <option value="">Select OCR services</option>
                            <option value="Veryfi">Veryfi (recommend)</option>
                            <option value="Google lens">Google lens</option>
                            <option value="Google vision">Google vision</option>
                        </select>
                        <button className={!processing ? "text-white mt-4 text-md p-2 rounded-md w-52 bg-yellow-400 hover:bg-yellow-200" : "text-white mt-6 text-md p-2 rounded-md w-52 bg-yellow-500 opacity-50 cursor-not-allowed"} disabled={processing} onClick={sendFiles}> {processing ? "PROCESSING....." : "START OCR"}</button>
                        {
                            error ? (
                                <div className="text-red-700 mt-2 text-xl">{error}</div>
                            ) : null
                        }
                    </div>
                </div>
                <div className="flex justify-center items-center p-10 flex-wrap border-4 border-blue-400 text-white">
                    <div className={switchtype !== "json" ? "border-4 border-gray-300 p-10 flex flex-col items-center gap-4 rounded-lg" : "border-4 border-green-500 p-10 flex flex-col items-center gap-4 rounded-lg"}>
                        <h1 className="mb-2 text-3xl text-yellow-400">Config Template for collecting info</h1>
                        <div className="flex border-2">
                            <div className="border-2 p-5 text-center hover:cursor-pointer hover:bg-green-600" onClick={() => setswitchtype("json")}> .JSON </div>
                            <div className="border-2 p-5 text-center hover:cursor-pointer hover:bg-gray-300" onClick={() => setswitchtype("text")}> Text </div>
                        </div>
                        {
                            convertprocess ? (
                                <>
                                    <div className="flex flex-col items-center w-fit overflow-auto text-blue-400 text-lg p-4 h-fit text-wrap bg-gray-900 gap-0">
                                        <div className="product-loading2">
                                            <div>CONVERTING......</div>
                                            <div className="tiktok-spinner">
                                                <div className="ball red opacity-100"></div>
                                                <div className="ball blue opacity-100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) :(
                                <>
                                    {
                                        switchtype === "json" && ocrvalue ? (
                                            <>
                                            
                                            </>
                                        ) : switchtype === "text" ? (
                                            <div className="text-gray-300 flex flex-col gap-4">
                                                <div className="overflow-auto flex gap-5 justify-center">
                                                    <div className="border-2 p-3 rounded-xl hover:cursor-pointer hover:bg-blue-600" onClick={() => {setdeletefield(false);setmodifyfield(false); setshowform(prevshowform => !prevshowform)}}>ADD FIELD</div>
                                                    <div className="border-2 p-3 rounded-xl hover:cursor-pointer hover:bg-red-600" onClick={() => {setshowform(false);setmodifyfield(false); setdeletefield(prev => !prev)}}>DELETE FIELD</div>
                                                    <div className="border-2 p-3 rounded-xl hover:cursor-pointer hover:bg-yellow-600" onClick={() => {setshowform(false);setdeletefield(false); setmodifyfield(prev => !prev)}}>MODIFY</div>
                                                </div>
                                                {
                                                    showform ? (
                                                        <form className="mb-6 text-blue-600" onSubmit={addfunction}>
                                                            <h1>ADD FIELD</h1>
                                                            <input type="text" value={addvalue} onChange={(e) => setaddvalue(e.target.value)} className="p-2"/>
                                                            <button type="submit" className="ml-3">ADD</button>
                                                        </form>
                                                    ) : deletefield ? (
                                                        <>
                                                            <h1 className=" text-red-600">Choose a field u want to delete (toggle the button to stop) </h1>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <h1 className=" text-yellow-600">Choose a field u want to modify (toggle the button to stop) </h1>
                                                            {
                                                                modifyvalue ? (
                                                                    <form className="mb-6 text-yellow-600" onSubmit={modifyfunction}>
                                                                        <h1>Modify for {originalvalue}</h1>
                                                                        <input type="text" value={modifyvalue} onChange={(e) => setmodifyvalue(e.target.value)} className="p-2"/>
                                                                        <button type="submit" className="ml-3">Change</button>
                                                                    </form>
                                                                ):(
                                                                    <>
                                                                    </>
                                                                )
                                                            }
                                                        </>
                                                    )
                                                }
                                                <div className="flex flex-col gap-5">
                                                    <div>
                                                        {  
                                                                Object.entries(objectfield).map(([key, value]) => (
                                                                    <div key={key} className={deletefield ? "hover:cursor-pointer hover:bg-red-600 border-2 p-2": modifyfield ? "hover:cursor-pointer hover:bg-yellow-600 border-2 p-2" : "border-2 p-2"} onClick={() => {deletefunction(key);setmodifyvalue(key);setoriginalvalue(key)}}>
                                                                        {key} : {value}
                                                                    </div>
                                                                ))
                                                                // <>
                                                                //     <div>convert to text template</div>
                                                                // </>
                                                        }
                                                    </div>
                                                    <button className="border-2 p-2 hover:bg-green-600 text-2xl rounded-xl">COLLECT</button>
                                                </div>
                                            </div>
                                        ) : null
                                    }
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Process;
