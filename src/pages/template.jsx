import { useState, useEffect, useContext } from "react";
import { getDoc, doc,deleteDoc,setDoc } from "firebase/firestore";
import { auth, db } from "../Firebase/firebase-config";
import { Usercontext } from "../App";



function Template () {

    const [productlist, setProductlist] = useState([]);
    const [error, setError] = useState("");
    const { loading } = useContext(Usercontext);

    const fetchUserData = async () => {
        if (auth.currentUser) {
          const userEmail = auth.currentUser.email;
          try {
            const docRef = doc(db, "customTemplate", userEmail);
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

    if(productlist){
        console.log(productlist);
        for(var key in productlist){
            console.log(key)
        }
    }


    return(
        <>
            <div className="pt-[16rem] p-[4rem] min-h-screen font-mono bg-gray-700 border-2">
                <div className="border-2 bg-gray-800">

                </div>

            </div>
        </>
    )
}

export default Template