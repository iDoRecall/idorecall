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
import { useUserState } from './states/user';
import { Loading } from './components/organisms/Loading';
import { CreateRecall } from './components/pages/CreateRecall/component';

export const App = () => {
    const isUserLoading = useUserState((state) => state.isLoading);

    if (isUserLoading) {
        return <Loading />;
    }

    return (
        <Router>
            <Routes>
                <Route
                    path='/index.html'
                    element={<Navigate to={'/'} replace />}
                />
                <Route path='/' element={<Home />} />
                <Route path='/create' element={<CreateRecall />} />
                <Route path='/edit/:recallId' element={<EditRecall />} />
                {/* TODO: implement not found */}
                <Route path='*' element={<Home />} />
            </Routes>
        </Router>
    );
};
