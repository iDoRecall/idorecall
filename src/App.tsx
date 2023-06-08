import * as React from 'react';
import './styles/variables.scss';
import './styles/global.scss';
import { Header } from './components/molecules/Header';
import { fakeUser } from './fakeUser';

export const App = () => {
    return (
        <div>
            <Header user={fakeUser} />
        </div>
    );
};
