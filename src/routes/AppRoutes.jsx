// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Services from "../pages/Services";
import Product from "../pages/Product";

import Nav from "../components/Nav/Nav";

const AppRoutes = () => {
    return (
        <>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/products" element={<Product />} />
            </Routes>
        </>
    );
};

export default AppRoutes;
