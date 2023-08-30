import * as React from 'react';
import { useEffect } from 'react';
import './styles/variables.scss';
import './styles/global.scss';
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom';
import { Home } from './components/pages/Home';
import { EditRecall } from './components/pages/EditRecall';
import { useUserState } from './states/user';
import { Loading } from './components/organisms/Loading';
import { CreateRecall } from './components/pages/CreateRecall';
import { usePluginState } from './states/plugin';
import { EmptyList } from './components/organisms/EmptyList';
import { setAppWrapperWithoutHeader } from './utils/setAppWrapperWithoutHeader';
import { useViewOpenState } from './states/view-open-state';
import { isValidApiKey } from './utils/is-valid-api-key';

export const App = () => {
    const isUserLoading = useUserState((state) => state.isLoading);
    const apiKey = usePluginState((state) => state.settings?.apiKey);
    const { setIsOpened } = useViewOpenState();

    useEffect(() => {
        setIsOpened(true);
        return () => {
            setIsOpened(false);
        };
    }, []);

    if (!isValidApiKey(apiKey)) {
        setAppWrapperWithoutHeader(true);
        return (
            <EmptyList
                title={'Api key isn`t provided'}
                text={
                    'You can provide it in community plugins section of obsidian settings.'
                }
            />
        );
    }

    if (isUserLoading) {
        setAppWrapperWithoutHeader(true);
        return <Loading />;
    }

    setAppWrapperWithoutHeader(false);
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
                <Route path='*' element={<Home />} />
            </Routes>
        </Router>
    );
};
