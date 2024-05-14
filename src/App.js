import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import {Suspense,} from "react"

import { Header } from './Components/header';
import {Mainpage} from './pages/mainpage';
import { lazy } from 'react';
import Integration from './pages/integration.jsx';

const Process = lazy(() => import("./pages/process.jsx"));
const Solution = lazy(() => import("./pages/solution.jsx"));



function App() {
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
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/process" element={<Suspense fallback={<LoadingIndicator />}><Process/></Suspense>} />
          <Route path="/integration" element={<Suspense fallback={<LoadingIndicator />}><Integration/></Suspense>} />
          <Route path="/solution" element={<Suspense fallback={<LoadingIndicator />}><Solution/></Suspense>} />
          <Route path='/' element={ <Mainpage/> } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
