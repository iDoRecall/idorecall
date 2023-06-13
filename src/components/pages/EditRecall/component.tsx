import * as React from 'react';
import './styles.scss';
import { MainContentTemplate } from '../../templates/MainContentTemplate';
import { Header } from '../../molecules/Header';
import { fakeUser } from '../../../mock/fakeUser';
import { useParams } from 'react-router';
import { fakeRecalls } from '../../../mock/fakeRecalls';

export const EditRecall = () => {
    const { recallId } = useParams();
    console.log(recallId);

    const recall = fakeRecalls.find((r) => r.id === recallId);
    console.log(recall);
    return (
        <div>
            <MainContentTemplate>
                <Header key='header' user={fakeUser} />
                <div key='content'>Oh myyyyy!</div>
            </MainContentTemplate>
        </div>
    );
};
