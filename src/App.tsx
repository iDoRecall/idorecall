import * as React from 'react';
import './styles/variables.scss';
import './styles/global.scss';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import { Home } from './components/pages/Home';
import { EditRecall } from './components/pages/EditRecall';

export const App = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path='/index.html'
                    element={<Navigate to={'/'} replace />}
                />
                <Route path='/' element={<Home />} />
                <Route path='/edit' element={<EditRecall />} />
                <Route path='/edit/:recallId' element={<EditRecall />} />
                {/* TODO: implement not found */}
                <Route path='*' element={<Home />} />
            </Routes>
        </Router>
    );
};
