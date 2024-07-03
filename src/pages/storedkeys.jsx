import { useState, useContext, useEffect } from "react";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db } from "../Firebase/firebase-config";
import { Usercontext } from "../App";

const storage = getStorage();

function StoredKeys() {
    const [key, setKey] = useState("");
    const { loading } = useContext(Usercontext);
    const [loadingkey, setloadingkey] = useState(false);
    const [saveProcess, setSaveProcess] = useState(false);
    const [error, setError] = useState(null);
    const [productlist, setProductlist] = useState();
    const [saved, setsaved] = useState(false);

    const fetchUserData = async () => {
        if (auth.currentUser) {
            const userEmail = auth.currentUser.email;
            try {
                setloadingkey(true);
                const docRef = doc(db, "KEYS", userEmail);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProductlist(docSnap.data());
                }
                setloadingkey(false);
            } catch (error) {
                setloadingkey(false);
                console.error("Error fetching document:", error);
            }
        } else {
            setloadingkey(false);
            setError("User is not authenticated");
        }
    };

    useEffect(() => {
        if (!loading) {
            fetchUserData();
        }
    }, [loading]);

    useEffect(() => {
        if (productlist) {
            setKey(productlist.PAN_key);
            setid(productlist.Client_id);
            setsecret(productlist.Client_secret);
            setusername(productlist.Username);
            setveryfikey(productlist.Veryfikey);
            setjsonfile(productlist.service_key_url);
        }
    }, [productlist]);

    const generateapikey = async () => {
        try {
            setSaveProcess(true);
            setError(null);
            const response = await fetch("https://fastapi-r12h.onrender.com/generate-api-key", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                },
            });
            const json = await response.json();
            setKey(json.api_key);
            setSaveProcess(false);
        } catch (err) {
            setError(err.message);
            setSaveProcess(false);
        }
    };
    const [id, setid] = useState("");
    const [secret, setsecret] = useState("");
    const [username, setusername] = useState("");
    const [veryfikey, setveryfikey] = useState("");
    const [saveprocess2, setsaveprocess2] = useState(false);
    const [jsonfile, setjsonfile] = useState("");

    const uploadFile = async (file) => {
        if (!file) {
            throw new Error("No file selected");
        }
        const userEmail = auth.currentUser.email;
        const storageRef = ref(storage, `keys/${userEmail}/service_key.json`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
    };

    const saveFunction = async () => {
        try {
            setsaveprocess2(true);
            setError(null); // Clear previous errors

            const documentPath = `${auth?.currentUser?.email}`;
            const productDoc = doc(db, "KEYS", documentPath);
            const data = {
                PAN_key: key,
                Client_id: id,
                Client_secret: secret,
                Username: username,
                Veryfikey: veryfikey,
            };

            await setDoc(productDoc, data, { merge: true });
            setsaveprocess2(false);
            setError("");
            setsaved(true);
        } catch (error) {
            setsaveprocess2(false);
            setError(error.message);
        }
    };

    useEffect(() => {
        if (saved) {
            const timeout = setTimeout(() => {
                setsaved(false);
            }, 2500);

            return () => clearTimeout(timeout);
        }
    }, [saved]);

    return (
        <div className="pt-[14rem] bg-gray-800 pb-[14rem] font-mono">
            <div className="flex justify-center">
                <form
                    className="rounded-xl flex flex-col gap-9 text-white lg:min-w-[1000px] w-fit"
                    onSubmit={(e) => {
                        e.preventDefault();
                        saveFunction();
                    }}
                >
                    <div>
                        <div className="text-xl font-bold">PAN api key</div>
                        <div className="flex gap-3">
                            <input
                                className="rounded-xl mt-1 text-xl text-green-400 p-2 w-full"
                                type="text"
                                required
                                value={loadingkey ? "Getting key..." : key ? key : "You have no key!"}
                                disabled={true}
                            />
                            <button
                                className={`rounded-xl p-2 whitespace-nowrap text-lg ${saveProcess ? 'bg-green-700 opacity-65' : error === "User is not authenticated" ? 'cursor-not-allowed bg-green-600 opacity-55' : 'hover:bg-green-700 bg-green-600'}`}
                                disabled={saveProcess || error === "User is not authenticated" || saveprocess2 || loadingkey }
                                onClick={() => generateapikey()}
                            >
                                {saveProcess ? "Generating" : "Generate new key"}
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 rounded-xl p-3 py-9 bg-gray-900">
                        <div className="text-center text-xl">Veryfi KEYS</div>
                        <div>
                            <div className="text-xl font-bold">Client_id</div>
                            <div className="flex gap-3">
                                <input
                                    className="rounded-xl mt-1 text-xl text-green-400 p-2 w-full bg-gray-600"
                                    type="text"
                                    value={loadingkey ? "Getting key..." : id}
                                    onChange={(e) => setid(e.target.value)}
                                    disabled={loadingkey}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="text-xl font-bold">Client_secret</div>
                            <div className="flex gap-3">
                                <input
                                    className="rounded-xl mt-1 text-xl text-green-400 p-2 w-full bg-gray-600"
                                    type="text"
                                    value={loadingkey ? "Getting key..." : secret}
                                    onChange={(e) => setsecret(e.target.value)}
                                    disabled={loadingkey}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="text-xl font-bold">Username</div>
                            <div className="flex gap-3">
                                <input
                                    className="rounded-xl mt-1 text-xl text-green-400 p-2 w-full bg-gray-600"
                                    type="text"
                                    value={loadingkey ? "Getting key..." : username}
                                    onChange={(e) => setusername(e.target.value)}
                                    disabled={loadingkey}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="text-xl font-bold">Api_key</div>
                            <div className="flex gap-3">
                                <input
                                    className="rounded-xl mt-1 text-xl text-green-400 p-2 w-full bg-gray-600"
                                    type="text"
                                    value={loadingkey ? "Getting key..." : veryfikey}
                                    onChange={(e) => setveryfikey(e.target.value)}
                                    disabled={loadingkey}
                                />
                            </div>
                        </div>
                    </div>
                    {/* <div className="flex flex-col gap-4 rounded-xl p-3 py-9 bg-gray-900">
                        <div className="text-center text-xl">Google Vision KEYS</div>
                        <div className="text-red-500">*ONLY ACCEPT JSON FILE*</div>
                        <input
                            type="file"
                            id="myFiles"
                            accept="application/json"
                        />
                        {jsonfile && (
                            <div className="text-green-500">
                                We have received your JSON file.
                                <br />
                                <a 
                                    href={jsonfile} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    download="service_key.json" // Add the download attribute
                                    className="text-blue-400 underline"
                                >
                                    Check your JSON file
                                </a>
                            </div>
                        )}
                    </div> */}
                    <button
                        className={`rounded-xl p-2 whitespace-nowrap text-lg ${saveprocess2 ? 'bg-green-700 opacity-65' : error === "User is not authenticated" ? 'cursor-not-allowed bg-green-600 opacity-55' : 'hover:bg-green-700 bg-green-600'}`}
                        type="submit"
                        disabled={saveprocess2 || error === "User is not authenticated" || saveProcess || loadingkey}
                    >
                        {saveprocess2 ? "Saving" : "Save"}
                    </button>
                    {saved && <div className="text-blue-500 text-center text-2xl">SAVED!</div>}
                    {error && <div className="text-red-500 text-center text-xl">{error}</div>}
                </form>
            </div>
        </div>
    );
}

export default StoredKeys;
