import * as React from 'react';
import './styles.scss';
import { MainContentTemplate } from '../../templates/MainContentTemplate';
import { Header } from '../../molecules/Header';
import { fakeUser } from '../../../fakeUser';

export const Home = () => {
    return (
        <div>
            <MainContentTemplate>
                <Header key='header' user={fakeUser} />
                <div key='content'>Lorem ipsum dolor sit amet</div>
            </MainContentTemplate>
        </div>
    );
};
