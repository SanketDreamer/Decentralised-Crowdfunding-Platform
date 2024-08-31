// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import {BrowserRouter as Router} from 'react-router-dom';
// import {ChainId, ThirdwebProvider} from '@thirdweb-dev/react';
// import { Goerli } from "@thirdweb-dev/chains";

// import App from './App';
// import { StateContextProvider } from './context';
// import './index.css';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//     <ThirdwebProvider activeChain={Goerli}>
//         <Router>
//             <StateContextProvider> 
//                 <App/>
//             </StateContextProvider>
//         </Router>
//     </ThirdwebProvider>
// )

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ChainId, ThirdwebProvider,useContract } from "@thirdweb-dev/react";
import { StateContextProvider } from "./context";
import App from "./App";
import "./index.css";
import { Sepolia } from "@thirdweb-dev/chains";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThirdwebProvider activeChain={Sepolia}
  clientId="ed752fa0eb84043d47086e75a726aeee">
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Router>
  </ThirdwebProvider>
);
