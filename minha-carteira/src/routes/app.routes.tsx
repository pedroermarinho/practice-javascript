
import React from "react";

import {Route, Routes} from 'react-router-dom';

import Dashboard from "../pages/Dashboard";
import List from "../pages/List";
import Layout from "../components/Layout";

const AppRoutes: React.FC =()=>(
    <Layout>
        <Routes>
            <Route path='/dasboard' element={<Dashboard/>}/>
            <Route path='/list/:type' element={<List />}/>
        </Routes>
    </Layout>
);

export default AppRoutes;