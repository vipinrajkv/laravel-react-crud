import React from "react";
import Footer from "./components/Footer";
import RouterLayout from "./routes/routeFile";
import { BrowserRouter as Router } from 'react-router-dom';
import { ContexProvider } from "./components/contextProvider";

const Home = () => {

    return (
        <Router>
            <ContexProvider>
                <RouterLayout>
                </RouterLayout>
            </ContexProvider>
            <Footer />
        </Router>
    );
};

export default Home;