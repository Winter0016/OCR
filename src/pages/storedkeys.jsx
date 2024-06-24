import { useState, useContext,useEffect } from "react";
import { setDoc, doc,getDoc } from "firebase/firestore";
import { auth, db } from "../Firebase/firebase-config";
import { Usercontext } from "../App";


function StoredKeys() {
    const [id, setId] = useState("");
    const [secret, setSecret] = useState("");
    const [username, setUsername] = useState("");
    const [key, setKey] = useState("");
    const { loading } = useContext(Usercontext);
    const [saveProcess, setSaveProcess] = useState(false);
    const [error, setError] = useState(null);
    const [productlist,setProductlist] = useState();
    const [saved,setsaved]=useState(false);

    const fetchUserData = async () => {
        if (auth.currentUser) {
          const userEmail = auth.currentUser.email;
          try {
            const docRef = doc(db, "KEYS", userEmail);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setProductlist(docSnap.data());
            }
          } catch (error) {
            console.error("Error fetching document:", error);
          }
        } else {
        //   console.error("User is not authenticated");
          setError("User is not authenticated");
        }
    };

    useEffect(() => {
        if (!loading) {
          fetchUserData();
        }
      }, [loading]);

    useEffect(()=>{
        if(productlist){
            setId(productlist.Client_id);
            setSecret(productlist.Client_secret);
            setUsername(productlist.Username);
            setKey(productlist.Api_key);
        }
    },[productlist])

    const saveFunction = async () => {
        try {
            setSaveProcess(true);
            setError(null); // Clear previous errors

            const documentPath = `${auth?.currentUser?.email}`;
            const productDoc = doc(db, "KEYS", documentPath);
            const data = {
                Client_id: id,
                Client_secret: secret,
                Username: username,
                Api_key: key
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

    if(saved){
        setTimeout(()=>{
            setsaved(false);
        },2500)
    }

    return (
        <div className="pt-[14rem] bg-gray-800 pb-[14rem] font-mono">
            <div className="flex justify-center">
                <form
                    className="rounded-xl flex flex-col gap-11 text-white lg:min-w-[1000px] w-fit"
                    onSubmit={(e) => {
                        e.preventDefault();
                        saveFunction();
                    }}
                >
                    <div>
                        <div className="text-xl">Client id</div>
                        <input
                            className="rounded-xl mt-1 text-xl text-black p-2 w-full"
                            type="text"
                            required
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="text-xl">Client secret</div>
                        <input
                            className="rounded-xl mt-1 text-xl text-black p-2 w-full"
                            type="text"
                            required
                            value={secret}
                            onChange={(e) => setSecret(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="text-xl">Username</div>
                        <input
                            className="rounded-xl mt-1 text-xl text-black p-2 w-full"
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="text-xl">Api key</div>
                        <input
                            className="rounded-xl mt-1 text-xl text-black p-2 w-full"
                            type="text"
                            required
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                        />
                    </div>
                    {saved && <div className="text-blue-500 text-center text-2xl">SAVED!</div>}
                    <button
                        className={`rounded-xl p-3 text-2xl ${saveProcess ? 'bg-green-700 opacity-65': error=="User is not authenticated" ? 'cursor-not-allowed bg-green-600 opacity-55' : 'hover:bg-green-700 bg-green-600'}`}
                        type="submit"
                        disabled={saveProcess || error=="User is not authenticated"}
                    >
                        {saveProcess ? "Saving" : "Save"}
                    </button>
                    {error && <div className="text-red-500 text-center text-xl">{error}</div>}
                </form>
            </div>
        </div>
    );
}

export default StoredKeys;
