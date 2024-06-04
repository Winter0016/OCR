import { useState, useEffect, useContext } from "react";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../Firebase/firebase-config";
import { Usercontext } from "../App";

function History() {
  const [productlist, setProductlist] = useState({});
  const [error, setError] = useState("");
  const { loading } = useContext(Usercontext);

  const fetchUserData = async () => {
    if (auth.currentUser) {
      const userEmail = auth.currentUser.email;
      try {
        const docRef = doc(db, "history", userEmail);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // console.log("Document data:", docSnap.data());
          setProductlist(docSnap.data());
        } else {
          // console.log("No such document!");
          setError("There is no document");
        }
      } catch (error) {
        setError(error.message);
        console.error("Error fetching document:", error);
      }
    } else {
      console.error("User is not authenticated");
      setError("User is not authenticated");
    }
  };

  useEffect(() => {
    if (!loading) {
      fetchUserData();
    }
  }, [loading]);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareurl);
            setCopySuccess(true);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

  const [shareurl,setshareurl] = useState("");
  const [urlprocess,seturlprocess]= useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

    const handleShare = async (objectfield) => {
        const jsonString = objectfield;
        const encodedJsonString = encodeURIComponent(jsonString);
        const longUrl = `${window.location.origin}/share?objectfield=${encodedJsonString}`;

        try {
            seturlprocess(true)
            const response = await fetch(`https://api.tinyurl.com/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eTjWEHD5vJb56KLAWgpDGBSN8yUVgkqBaegy0zJY6U6Kjiox7hfH4U5e6xr8'
                },
                body: JSON.stringify({
                    url: longUrl,
                    domain: 'tiny.one'
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const shortenedUrl = data.data.tiny_url;
            setshareurl(shortenedUrl);
            seturlprocess(false);
        } catch (error) {
            seturlprocess(false);
            console.error('Error shortening URL: ', error);
        }
    };

    const handleDownload = (objectfield) => {
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


  return (
    <div className="pt-[9rem] p-[4rem] min-h-screen font-mono bg-gray-700">
      {error ? (
          <div className="text-red-500 text-center text-4xl">{error}</div>
        ): (
          <>
            {productlist && (
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr>
                    <th className="border-[1px] border-gray-300 p-4 text-blue-500">Time</th>
                    <th className="border-[1px] border-gray-300 p-4 text-white">OCR Picture</th>
                    <th className="border-[1px] border-gray-300 p-4 text-green-500">OCR JSON</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(productlist).map((key) => (
                    <tr key={key}>
                      <td className="border-[1px] border-gray-300 p-2 text-blue-500">{key}</td>
                      <td className="border-gray-300 border-[1px] p-2 flex justify-center items-center">
                        <img className="w-[20rem]" src={productlist[key].ocr_picture} alt="" />
                      </td>
                      <td className="border border-gray-300 p-2">
                          <pre className="text-green-500">
                          {JSON.stringify(JSON.parse(productlist[key].ocr_json), null, 2)}
                          </pre>
                          {
                              shareurl ? (
                                  <>
                                      <div className="flex gap-2 mt-[1rem] mb-2">
                                          <h1 className="text-lg text-blue-400 border-[1px] text-center p-2 rounded-xl" >SHARE URL</h1>
                                          <button className="text-lg border-[1px] p-2 rounded-xl" onClick={copyToClipboard}>COPY</button>
                                      </div>
                                      {copySuccess && <span style={{color: "green"}}>Copied!</span>}
                                  </>
                              ):(
                                  <>
                                      {
                                          urlprocess ? (
                                              <>
                                                  <div className="mt-[1rem] mb-[1rem]">creating url....</div>
                                              </>
                                          ):(
                                              <></>
                                          )
                                      }
                                  </>
                              )
                          }
                          <div className="flex gap-3">
                            <button onClick={() => handleShare(productlist[key].ocr_json)} className="cursor-pointer group relative flex gap-1.5 px-8 py-2 bg-black bg-opacity-80 text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-md mt-2">
                                Share
                                <div class="absolute opacity-0 -bottom-full rounded-md py-2 px-2 bg-black bg-opacity-70 left-1/2 -translate-x-1/2 group-hover:opacity-100 transition-opacity shadow-lg">
                                    SHARE
                                </div>
                            </button>  
                            <button onClick={() => handleDownload(productlist[key].ocr_json)} className="cursor-pointer group relative flex gap-1.5 px-8 py-2 bg-black bg-opacity-80 text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-md mt-2">
                                Download
                                <div class="absolute opacity-0 -bottom-full rounded-md py-2 px-2 bg-black bg-opacity-70 left-1/2 -translate-x-1/2 group-hover:opacity-100 transition-opacity shadow-lg">
                                    Download
                                </div>
                            </button>  
                          </div>
                      </td>        
                    </tr>
                  ))}
                </tbody>
              </table>
            )}       
          </>
        )
      }
    </div>
  );
}

export default History;
