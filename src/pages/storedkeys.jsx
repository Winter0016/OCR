import { useState, useContext, useEffect } from "react";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../Firebase/firebase-config";
import { Usercontext } from "../App";

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
            setKey(productlist.Api_key);
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
            saveFunction(json.api_key);
        } catch (err) {
            setError(err.message);
            setSaveProcess(false);
        }
    };

    const saveFunction = async (newKey) => {
        try {
            setError(null); // Clear previous errors

            const documentPath = `${auth?.currentUser?.email}`;
            const productDoc = doc(db, "KEYS", documentPath);
            const data = {
                Api_key: newKey || key
            };

            await setDoc(productDoc, data, { merge: true });
            setSaveProcess(false);
            setError("");
            setsaved(true);
        } catch (error) {
            setSaveProcess(false);
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
                    className="rounded-xl flex flex-col gap-11 text-white lg:min-w-[1000px] w-fit"
                    onSubmit={(e) => {
                        e.preventDefault();
                        generateapikey();
                    }}
                >
                    <div>
                        <div className="text-xl font-bold">Api Key</div>
                        <input
                            className="rounded-xl mt-1 text-xl text-green-400 p-2 w-full"
                            type="text"
                            required
                            value={loadingkey ? "Getting key..." : key ? key : "You have no key!"}
                            disabled={true}
                        />
                    </div>
                    {saved && <div className="text-blue-500 text-center text-2xl">SAVED!</div>}
                    <button
                        className={`rounded-xl p-3 text-2xl ${saveProcess ? 'bg-green-700 opacity-65' : error === "User is not authenticated" ? 'cursor-not-allowed bg-green-600 opacity-55' : 'hover:bg-green-700 bg-green-600'}`}
                        type="submit"
                        disabled={saveProcess || error === "User is not authenticated"}
                    >
                        {saveProcess ? "Generating" : "Generate new key"}
                    </button>
                    {error && <div className="text-red-500 text-center text-xl">{error}</div>}
                </form>
            </div>
        </div>
    );
}

export default StoredKeys;
