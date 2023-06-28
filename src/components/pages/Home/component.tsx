import * as React from 'react';
import './styles.scss';
import { MainContentTemplate } from '../../templates/MainContentTemplate';
import { Header } from '../../molecules/Header';
import { RecallsList } from '../../organisms/RecallsList';
import { fakeRecalls } from '../../../mock/fakeRecalls';
import { useUserState } from '../../../states/user';

export const Home = () => {
    const { user } = useUserState();
    return (
        <div>
            <MainContentTemplate>
                {user && <Header key='header' user={user} />}
                <RecallsList recalls={fakeRecalls} key='content' />
            </MainContentTemplate>
        </div>
    );
};
