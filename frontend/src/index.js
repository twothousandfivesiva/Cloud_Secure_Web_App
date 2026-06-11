import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer ,toast,Slide} from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <Provider store={store}>
     <HelmetProvider> 
      
    <App />
        <ToastContainer
            position="bottom-center"
            autoClose={5000}
            transition={Slide} // closest match to SCALE
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
        
          />
      
     </HelmetProvider>
</Provider>

);

