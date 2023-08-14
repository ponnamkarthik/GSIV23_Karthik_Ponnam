import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ListPage from './pages/ListPage';
import Header from "./components/HeaderComponent";

const AppRouter: React.FC = () => {
    // @ts-ignore
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<ListPage />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
