import React,{Suspense, lazy}from "react";
import "./styles/main.scss"; 
import Loader from "./components/Loader/Loader";

const Home = lazy(() => import("./pages/Home")); 

function App() {
  return (
    <div className="appContainer">
      <Suspense fallback={<Loader/>}>
        <Home />
      </Suspense>
    </div>
  );
}

export default App;