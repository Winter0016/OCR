import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import {createContext, Suspense,useState,useEffect} from "react"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './Firebase/firebase-config.js';



import { Header } from './Components/header';
import {Mainpage} from './pages/mainpage';
import { Footer } from './Components/footer.jsx';
import { lazy } from 'react';
import Integration from './pages/integration.jsx';
import SharedJson from './pages/share.jsx';


const Process = import("./pages/process.jsx");
// const Solution = lazy(() => import("./pages/solution.jsx"));
const Sign = lazy(()=> import("./pages/signup.jsx"));
const Login = lazy(()=> import("./pages/login.jsx"));
const History = lazy(()=> import("./pages/history.jsx"));
const Template = lazy(() =>import("./pages/template.jsx"));
// const About = lazy(() => import("./pages/about.jsx"));

const Policy = lazy (() => import("./pages/policy.jsx"));

export const Usercontext = createContext("");


function App() {
  const [imgurl, setImgUrl] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

 

  const initializeUser = (user) => {
    if (user) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
    setLoading(false);
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  const LoadingIndicator = () => (
    <div className="product-loading">
      <div className="tiktok-spinner">
        <div className="ball red"></div>
        <div className="ball blue"></div>
      </div>
    </div>
  );
  
  const keepFunctionWarm = async () => {
      await fetch('https://fastapi-r12h.onrender.com');
  };

  // Call this function when your app starts
  useEffect(() => {
    keepFunctionWarm();
  },[])


  return (
    <>
      <Usercontext.Provider value={{imgurl,setImgUrl,userLoggedIn,loading,setLoading}}>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path='/sign' element={<Suspense fallback={<LoadingIndicator />}><Sign/></Suspense>} />         
            <Route path='/login' element={<Suspense fallback={<LoadingIndicator />}><Login/></Suspense>} />         
            <Route path="/process" element={<Process/>}/>
            <Route path="/integration" element={<Suspense fallback={<LoadingIndicator />}><Integration/></Suspense>} />
            {/* <Route path="/solution" element={<Suspense fallback={<LoadingIndicator />}><Solution/></Suspense>} /> */}
            <Route path="/history" element={<Suspense fallback={<LoadingIndicator />}><History/></Suspense>} />
            <Route path="/template" element={<Suspense fallback={<LoadingIndicator />}><Template/></Suspense>} />
            <Route path="/privacy-policy" element={<Suspense fallback={<LoadingIndicator />}><Policy/></Suspense>} />
            {/* <Route path="/about" element={<Suspense fallback={<LoadingIndicator />}><About/></Suspense>} /> */}
            <Route path='/' element={ <Mainpage/> } />
            <Route path='/share' element={ <SharedJson/> } />
          </Routes>
          <Footer/>
        </BrowserRouter>
      </Usercontext.Provider>
    </>
  );
}

export default App;
