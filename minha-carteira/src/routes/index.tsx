import React from "react";

// import App from "./app.routes";

import AuthRoutes from "./auth.routes";

import {BrowserRouter} from 'react-router-dom';

const Routes:React.FC =()=>(
    <BrowserRouter>
        {/* <App/> */}
        <AuthRoutes/>
    </BrowserRouter>
    
);

export default Routes;