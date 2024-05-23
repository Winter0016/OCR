import img from "../imgs/img";
import { useState,useRef, useEffect,useContext} from "react";
import Webcam from 'react-webcam';
import { Usercontext } from "../App";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import PencilIcon from "./PencilIcon";
import "react-image-crop/dist/ReactCrop.css";





function Process() {
    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState(null);
    const {imgurl , setImgUrl} = useContext(Usercontext)
    const [ocrvalue, setocrvalue] = useState("");
    const [ocrjson, setocrjson] = useState("");
    const [processing, setProcessing] = useState(false);
    // const [myJsonData, setMyJsonData] = useState(null);
    const [switchtype, setswitchtype] = useState("text");
    const [error, seterror] = useState("");
    const [inputservice, setinputservice] = useState("");
    const [convertprocess,setconvertprocess] = useState(false);
    const [showform,setshowform] = useState(false);
    const [deletefield,setdeletefield] = useState(false);
    const [addvalue,setaddvalue] = useState("");
    const [modifyfield , setmodifyfield] = useState(false);
    const [objectfield,setobjectfield] = useState({});
    const [modifyvalue,setmodifyvalue] = useState();
    const [originalvalue , setoriginalvalue] = useState();
    const [collectprocess,setcollectprocess] = useState(false);
    const [collecterror,setcollecterror] = useState("");
    const [croperror,setcroperror] = useState("");
    const [cameraEnabled, setCameraEnabled] = useState(false);
    const webcamRef = useRef(null);


    //camera
    //

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
    // useEffect(() =>{
    //     if(ocrvalue){
    //         console.log(`ocrvalue.raw_text la : ${JSON.stringify(ocrvalue.raw_text).replace(/"/g, '')}`);
    //         console.log(`ocrvalue.raw_text la : ${ocrvalue.raw_text}`);
    //     }
    // },[ocrvalue])
    // const isEmptyObject = (obj) => {
    //     return Object.keys(obj).length === 0 && obj.constructor === Object;
    // };

    const convertjson = async () => {
        try{
            setcollectprocess(true);
            if (Object.keys(objectfield).length === 0 && objectfield.constructor === Object) {
                throw new Error("You haven't config template yet.");
            }
            // const jsonObject = { "Tên của B": "", "lương": "" };

            // const formData = new FormData();
            // const jsonBlob = new Blob([JSON.stringify(objectfield)], { type: 'application/json' });
            // formData.append('file', jsonBlob, 'data.json');

            // const rawText = "LUẬT THÀNH CÔNG Căn cứ: - CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM Độc lập - Tư do - Hanh phúc HỢP ĐỒNG LAO ĐỘNG XÁC ĐỊNH THỜI HẠN (Số 2508 HĐLĐ) Bộ luật lao động 2019 & các Nghị định hướng dẫn Khả năng và nhu cầu của các bên Hôm nay, ngày 25 tháng 08 năm 2020, tại Công ty Cổ phần Dược phẩm Á Châu, chúng tôi gồm: Bên A : Người sử dụng lao động Công ty Mã số thuế Dia chi Điện thoại Đại diện : CÔNG TY CỔ PHẦN DƯỢC PHẨM Á CHÂU : 1934803729 : Số 188 Mai Dịch, Cầu Giấy, Hà Nội : 0247593788 : Bà Nguyễn Bảo Châu Chức vụ: Giám đốc Bên B: Người lao động Họ và tên : HOÀNG THỊ NGỌC LAN Sinh ngày : 10/09/1990 CMND số Địa chỉ Điện thoại Giới tỉnh: Nữ : 0204783678 – Ngày cấp: 20/2/2010–Nơi cấp: Công an thành phố Hà Nội : phường Dịch Vọng, quận Cầu Giấy, Hà Nội : 0857490394 Cùng thoả thuận ký kết hợp đồng lao động và cam kết làm đúng những điều khoản sau đây: Điều 1: Công việc, địa điểm làm việc và thời hạn của Hợp đồng - Công việc phải làm: Nhân viên Kế Toán - Địa điểm làm việc: Số 188 Mai Dịch, Cầu Giấy, Hà Nội - Loại hợp đồng: Hợp đồng lao động xác định thời hạn – Kỷ lần thứ nhất - Thời hạn hợp đồng: 01 năm - Từ ngày 5 tháng 03 năm 2021 đến ngày 5 tháng 03 năm 2022 Điều 2: Lương, phụ cấp, các khoản bổ sung khác Lương căn bản: 7.000.000 đồng /tháng Phụ cấp: 300.000ding thing LUẬT SƯ TƯ VẤN PHÁP LUẬT 24/7 GỌI 1900 633 710";
            // const template = {
            //     "tên của B": "",
            //     "lương": ""
            // };

            const encodedRawText = encodeURIComponent(ocrvalue.raw_text);
            const encodedTemplate = encodeURIComponent(JSON.stringify(objectfield));

            const response = await fetch(`https://fastapi-r12h.onrender.com/convert?raw_text=${encodedRawText}&template=${encodedTemplate}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });

            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.msg);
            }
            setocrjson(json);
            setcollectprocess(false);
            setcollecterror("");

        }catch(err){
            console.log(err.message);
            setcollecterror(err.message);
            setcollectprocess(false);
        }
    }
    useEffect(() => {
        if(ocrjson){
            // console.log(`raw_text : ${ocrvalue.raw_text}`)
            // console.log("OCRJSON :",ocrjson);
            // Remove the ```json and ``` from the string
            const cleanedJsonString = ocrjson.reply.replace(/```json\n|```/g, '');
            // console.log("cleanedjson :",cleanedJsonString)
            // Parse the cleaned JSON string into an object
            const parsedObject = JSON.parse(cleanedJsonString);

            // setMyJsonData(parsedObject);
            setobjectfield(parsedObject);
        }
    },[ocrjson])
    // useEffect(() => {
    //     if(objectfield){
    //         console.log(`objectfield : ${JSON.stringify(objectfield)}`);
    //     }
    // },[objectfield])
    // useEffect(() => {
    //     if(ocrvalue){
    //         console.log("ocrvalue :",ocrvalue.raw_text);
    //         // setMyJsonData(JSON.parse(ocrjson));
    //     }
    // },[ocrvalue])

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


    const updateinput = async (imgsrc) => {
        try {
            // console.log(`imgsrc : ${imgsrc}`)
            if(imgsrc == "data:,"){
                // console.log(`imgsrc is null`);
                throw new Error("You haven't cropped the image yet")
            }
            const response = await fetch(imgsrc);
            const blob = await response.blob();
            
            const file = new File([blob], 'cropped_image.jpeg', { type: 'image/jpeg' });
            
            const fileList = new DataTransfer();
            fileList.items.add(file);
            
            const myFilesInput = document.getElementById('myFiles');
            myFilesInput.files = fileList.files;
            
            const event = new Event('change', { bubbles: true });
            myFilesInput.dispatchEvent(event);
            setcroperror("");
        } catch (error) {
            // console.error('Error updating input:', error);
            setcroperror(error.message);
        }
    };
    


    const captureImage = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(`imageSrc : ${imageSrc}`)
        setCameraEnabled(false);

        const byteCharacters = atob(imageSrc.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        console.log(`bytearray : ${byteArray}`);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });

        const file = new File([blob], 'captured_image.jpeg', { type: 'image/jpeg' });
        const fileList = new DataTransfer();
        fileList.items.add(file);

        const myFilesInput = document.getElementById('myFiles');
        myFilesInput.files = fileList.files;

        // Manually trigger the change event to call handleFileUpload
        const event = new Event('change', { bubbles: true });
        myFilesInput.dispatchEvent(event);
    };

    const handleDownload = () => {
        const jsonString = JSON.stringify(objectfield, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'info.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const [modalOpen, setModalOpen] = useState(false);
        



    return (
        <div className="bg-gray-900 font-mono w-full h-full">
            <div className='md:m-auto flex flex-col flex-wrap text-wrap pb-24' style={{ maxWidth: "1450px" }}>
                <div className="flex justify-center flex-wrap w-auto h-auto">
                    <div className="flex flex-col items-center mt-9">
                        <h1 className="md:text-5xl text-2xl text-white">See Yourself</h1>
                        <h1 className="break-words text-center mt-2 text-white md:text-lg text-sm" style={{ maxWidth: "52rem" }}>Choose from invoices, account & credit card statements, trade register excerpts, payroll statements, identification document and convince yourself.</h1>
                    </div>
                </div>
                {modalOpen && (
                    <Modal
                    updateinput={updateinput}
                    currentimg={imgurl}
                    closeModal={() => setModalOpen(false)}
                    />
                )}
                <div className="flex gap-10 mt-12 flex-wrap justify-center border-2 border-yellow-200">
                    {
                        imgurl ? (
                            
                            <div className="flex flex-col items-center p-4 h-28 mt-9">
                                <img className="object-contain h-fit md:max-w-28" src={imgurl} alt="imginput" />
                                <h1 className="text-3xl text-yellow-400 mt-3">{selectedFile}</h1>
                                <h1 className="text-3xl text-white mt-3 border-2 rounded-md p-2 hover:cursor-pointer" onClick={() => setModalOpen(true)}>CROP IMAGE</h1>
                                {
                                    croperror ? (
                                        <>
                                            <h1 className="text-red-600 text-xl mt-2">{croperror}</h1>
                                        </>
                                    ):(
                                        <></>
                                    )
                                }
                            </div>
                        ) : (
                            <div className="flex justify-center items-center md:max-w-28 overflow-auto text-green-500 border-2 text-4xl p-4 h-28 mt-9" style={{ whiteSpace: 'pre-wrap' }}>
                                Your file input
                            </div>
                        )
                    }
                    {
                        ocrvalue ? (
                            <div className="md:max-w-28 overflow-auto border-none text-green-500 max-h-34 border-4 whitespace-pre-line p-4 mt-9">
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
                                <div className="flex flex-col justify-center items-center md:max-w-28 overflow-auto text-green-500 border-2 text-4xl p-4 h-28 mt-9" style={{ whiteSpace: 'pre-wrap' }}>
                                    <div>YOUR RESULT</div>
                                </div>
                            )
                        )
                    }
                    <div className="flex flex-col items-center justify-center">
                        <div>
                            {cameraEnabled ? (
                                <div>
                                    <Webcam
                                        audio={false}
                                        ref={webcamRef}
                                        screenshotFormat="image/jpeg"
                                    />
                                    <button className="text-white" onClick={captureImage}>Capture Image</button><br/>
                                    <button className="text-white" onClick={() => setCameraEnabled(false)}>Close Camera</button>
                                </div>
                            ) : (
                                <div className="mb-3 flex flex-col items-center">
                                    <button className="text-white text-wrap p-2 rounded-lg border-2" onClick={() => setCameraEnabled(true)}>Access Camera</button>
                                </div>
                            )}
                            <>
                                <label htmlFor="myFiles" className="hover:cursor-pointer border-dashed border-4 border-yellow-400 flex flex-col justify-center items-center w-auto md:p-4 p-10">
                                    <input
                                        type="file"
                                        id="myFiles"
                                        accept="*/*"
                                        className="hidden"
                                        onChange={handleFileUpload}
                                    />
                                    <>
                                        <img className="mt-7 md:max-h-15 md:h-auto h-32" src={img.fileupload} alt="" />
                                        <h1 className="text-3xl text-yellow-400 mt-3">Click here</h1>
                                        <h1 className="text-2xl mt-3 text-white mb-7">PDF, TIFF, JPEG & PNG</h1>
                                    </>
                                </label>
                            </>
                            {/* {capturedImage && <img src={capturedImage} alt="Captured" />} */}
                        </div>
                        <select className="mt-2 p-2 text-md border-none rounded-md hover:cursor-pointer" onChange={(e) => setinputservice(e.target.value)}>
                            <option value="">Select OCR services</option>
                            <option value="GG_vision">Google vision (recommend)</option>
                            <option value="Veryfi">Veryfi</option>
                            <option value="Amazon_Textract">Amazon Textract</option>
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
                                        switchtype === "json" && ocrvalue && objectfield ? (
                                            <>
                                                <pre>
                                                    {JSON.stringify(objectfield,null,2)}
                                                </pre>
                                                <button onClick={handleDownload} class="cursor-pointer group relative flex gap-1.5 px-8 py-4 bg-black bg-opacity-80 text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-md">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24px" width="24px"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Download"> <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="#f1f1f1" d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12" id="Vector"></path> </g> </g></svg>
                                                    Download
                                                    <div class="absolute opacity-0 -bottom-full rounded-md py-2 px-2 bg-black bg-opacity-70 left-1/2 -translate-x-1/2 group-hover:opacity-100 transition-opacity shadow-lg">
                                                        Download
                                                    </div>
                                                </button>                                            </>
                                        ) : switchtype === "text" && ocrvalue ? (
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
                                                            <div className="flex">
                                                                <input type="text" value={addvalue} onChange={(e) => setaddvalue(e.target.value)} className="p-2 rounded-lg"/>
                                                                <button type="submit" className="ml-3 border-2 pl-4 pr-4 p-2 rounded-lg flex gap-1 hover:opacity-60 hover:translate-x-1">
                                                                    ADD
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                                    </svg>

                                                                </button>                                                    
                                                            </div>
                                                        </form>
                                                    ) : deletefield ? (
                                                        <>
                                                            <h1 className=" text-red-600">Choose a field u want to delete (toggle the button to stop) </h1>
                                                        </>
                                                    ) : modifyfield ? (
                                                        <>
                                                            <h1 className=" text-yellow-600">Choose a field u want to modify (toggle the button to stop) </h1>
                                                            {
                                                                modifyfield ? (
                                                                    <form className="mb-6 text-yellow-600" onSubmit={modifyfunction}>
                                                                        <h1>Modify for {originalvalue}</h1>
                                                                        <div className="flex">
                                                                            <input type="text" value={modifyvalue} onChange={(e) => setmodifyvalue(e.target.value)} className="p-2 rounded-lg"/>
                                                                            <button type="submit" className="ml-3 border-2 pl-4 pr-4 p-2 rounded-lg flex gap-1 hover:opacity-60 hover:translate-x-1">
                                                                                CHANGE
                                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                                                                </svg>
                                                                            </button>                                                    
                                                                        </div>
                                                                    </form>
                                                                ):(
                                                                    <>
                                                                    </>
                                                                )
                                                            }
                                                        </>
                                                    ) : (
                                                        <></>
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
                                                    <button className={collectprocess ? "border-2 p-2 bg-green-600 text-2xl rounded-xl opacity-50 cursor-not-allowed" : "border-2 p-2 hover:bg-green-600 text-2xl rounded-xl"} onClick={convertjson} disabled={collectprocess}>{collectprocess ? "COLLECTING..." : "COLLECT"}</button>
                                                    {
                                                        collecterror ? (
                                                            <h1 className="text-red-600 mt-1">{collecterror}</h1>
                                                        ) :(
                                                            <></>
                                                        )
                                                    }
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
