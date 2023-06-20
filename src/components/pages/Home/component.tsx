import * as React from 'react';
import './styles.scss';
import { MainContentTemplate } from '../../templates/MainContentTemplate';
import { Header } from '../../molecules/Header';
import { fakeUser } from '../../../mock/fakeUser';
import { RecallsList } from '../../organisms/RecallsList';
import { fakeRecalls } from '../../../mock/fakeRecalls';

export const Home = () => {
    return (
        <div>
            <MainContentTemplate>
                <Header key='header' user={fakeUser} />
                <RecallsList recalls={fakeRecalls} key='content' />
            </MainContentTemplate>
        </div>
    );
};
