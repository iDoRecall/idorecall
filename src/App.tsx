import * as React from 'react';
import './styles/variables.scss';
import './styles/global.scss';
import { Header } from './components/molecules/Header';
import { fakeUser } from './fakeUser';
import { MainContentTemplate } from './components/templates/MainContentTemplate';

export const App = () => {
    return (
        <div>
            <MainContentTemplate>
                <Header key='header' user={fakeUser} />
                <div key='content'>Lorem ipsum dolor sit amet</div>
            </MainContentTemplate>
        </div>
    );
};
