import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import {createContext, Suspense,useState} from "react"

import { Header } from './Components/header';
import {Mainpage} from './pages/mainpage';
import { Footer } from './Components/footer.jsx';
import { lazy } from 'react';
import Integration from './pages/integration.jsx';
import img from './imgs/img.js';
import SharedJson from './pages/share.jsx';


const Process = lazy(() => import("./pages/process.jsx"));
const Solution = lazy(() => import("./pages/solution.jsx"));

export const Usercontext = createContext("");


function App() {
  const [imgurl, setImgUrl] = useState(null);
  // const [objectfield,setobjectfield] = useState({});


  const LoadingIndicator = () => (
    <div className="product-loading">
      <div className="tiktok-spinner">
        <div className="ball red"></div>
        <div className="ball blue"></div>
      </div>
    </div>
  );
  return (
    <>
      <Usercontext.Provider value={{imgurl,setImgUrl}}>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/process" element={<Suspense fallback={<LoadingIndicator />}><Process/></Suspense>} />
            <Route path="/integration" element={<Suspense fallback={<LoadingIndicator />}><Integration/></Suspense>} />
            <Route path="/solution" element={<Suspense fallback={<LoadingIndicator />}><Solution/></Suspense>} />
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
