import React from "react";
import Header from "./components/header";
import LeftNav from "./components/leftNav";
import List from "./components/list";
import Footer from "./components/Footer";
import Create from "./components/create";
import RouterLayout from "./routes/routeFile";
import { BrowserRouter as Router } from 'react-router-dom';

const Home = () => {
    return (
        <Router>
        <div>
                <Header/>
                <div className="container-fluid main-container">
                <LeftNav/>
                    {/* <List/> */}
                    <RouterLayout>
                    
                    </RouterLayout>
                </div>
               
                <Footer/>
        </div>
        </Router>
    )
    ;
};

export default Home;