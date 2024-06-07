import { useState, useEffect, useContext } from "react";
import { getDoc, doc,deleteDoc,setDoc } from "firebase/firestore";
import { auth, db } from "../Firebase/firebase-config";
import { Usercontext } from "../App";



function Template () {

    const [productlist, setProductlist] = useState([]);
    const [error, setError] = useState("");
    const { loading } = useContext(Usercontext);
    const [crud,setcrud] = useState(false);

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

    // if(productlist){
    //     console.log(productlist);
    //     for(var key in productlist){
    //         console.log(key)
    //     }
    // }
    const [showform,setshowform] = useState(false);
    const [deletefield,setdeletefield] = useState(false);
    const [addvalue,setaddvalue] = useState("");
    const [modifyfield , setmodifyfield] = useState(false);
    const [objectfield,setobjectfield] = useState({});
    const [modifyvalue,setmodifyvalue] = useState();
    const [originalvalue , setoriginalvalue] = useState();

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
              newobject[modifyvalue] = original[key];
          }else{
              newobject[key] = original[key];
          }
      }
      setobjectfield(newobject);
  }

    return(
        <>
            <div className="pt-[16rem] p-[4rem] min-h-screen font-mono bg-gray-700 border-2">
              {productlist && (
                <>
                  <table  className="min-w-full bg-gray-800 border-none rounded-3xl">
                    <thead>
                      <tr>
                        <th className="border-gray-300 p-9 text-blue-500 text-3xl">NAME</th>
                        <th className="border-gray-300 p-9 text-white text-3xl">TEMPLATE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(productlist).map((key) => (
                        <tr key={key}>
                          <td className="border-gray-300 p-7 text-blue-500 text-xl">
                            <div className="flex items-center justify-center text-wrap">
                              <span className="">{key}</span>
                            </div>
                          </td>
                          {
                            crud ? (
                              <>
                                <td className="border-gray-300 pb-7 text-blue-500 pr-4">
                                  <div className="text-gray-300 flex flex-col gap-4">
                                    <div className="overflow-auto flex gap-5 justify-center">
                                      <div className="border-2 p-3 rounded-lg hover:cursor-pointer hover:bg-blue-600 text-base" onClick={() => {setdeletefield(false);setmodifyfield(false); setshowform(prevshowform => !prevshowform)}}>ADD FIELD</div>
                                      <div className="border-2 p-3 rounded-lg hover:cursor-pointer hover:bg-red-600 text-base" onClick={() => {setshowform(false);setmodifyfield(false); setdeletefield(prev => !prev)}}>DELETE FIELD</div>
                                      <div className="border-2 p-3 rounded-lg hover:cursor-pointer hover:bg-yellow-600 text-base" onClick={() => {setshowform(false);setdeletefield(false); setmodifyfield(prev => !prev)}}>MODIFY</div>
                                    </div>
                                    <div className="flex flex-col items-center text-base">
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
                                    </div>
                                    <div className="flex flex-col gap-5 items-center">
                                      <div>
                                        <div className="min-w-[25rem]">
                                          {  
                                            Object.entries(objectfield).map(([key, value]) => (
                                                <div className="flex flex-col">
                                                    <div className="flex gap-4 text-base text-wrap" key={key}>
                                                        <div className={deletefield ? "hover:cursor-pointer hover:bg-red-600 border-[1px] p-2 w-full flex items-center": modifyfield ? "hover:cursor-pointer hover:bg-yellow-600 border-[1px] p-2 w-full flex items-center" : "border-[1px] p-2 w-full flex items-center"} onClick={() => {deletefunction(key);setmodifyvalue(key);setoriginalvalue(key)}}>
                                                            {key}
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            ))
                                            // <>
                                            //     <div>convert to text template</div>
                                            // </>
                                          }
                                          <div className="w-full flex justify-center">
                                            <button className="mt-[1rem] border-2 min-w-[10rem] p-1 bg-green-700 hover:bg-green-600 text-lg rounded-xl">SAVE</button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </>
                            ):(
                              <>
                                <td className="border-gray-300 p-7 text-white text-xl">
                                  <div className="flex items-center justify-center text-wrap gap-7 flex-wrap">
                                    <pre className="text-green-500 text-wrap">
                                      {JSON.stringify(JSON.parse(productlist[key]), null, 2)}
                                    </pre> 
                                    <div className="border-2 p-3 rounded-lg hover:cursor-pointer hover:bg-blue-600 text-base" onClick={() => {setcrud(prevcrud => !prevcrud);setobjectfield(JSON.parse(productlist[key]))}}>EDIT</div>                                   
                                  </div>
                                </td>
                              </>
                            )
                          }
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
        </>
    )
}

export default Template