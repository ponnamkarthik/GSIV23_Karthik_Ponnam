import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ListPage from './pages/ListPage';
import Header from "./components/HeaderComponent";
import DetailsPage from "./pages/DetailsPage";

const AppRouter: React.FC = () => {
    // @ts-ignore
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<ListPage />} />
                <Route path="/movie/:movieId" element={<DetailsPage />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
