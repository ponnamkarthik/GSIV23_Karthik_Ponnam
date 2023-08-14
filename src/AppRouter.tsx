import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ListPage from './pages/ListPage';

const AppRouter: React.FC = () => {
    // @ts-ignore
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ListPage />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
