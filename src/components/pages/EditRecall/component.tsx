import * as React from 'react';
import './styles.scss';
import { MainContentTemplate } from '../../templates/MainContentTemplate';
import { Header } from '../../molecules/Header';
import { fakeUser } from '../../../mock/fakeUser';
import { useParams } from 'react-router';
import { fakeRecalls } from '../../../mock/fakeRecalls';
import { RecallForm } from '../../organisms/RecallForm';

export const EditRecall = () => {
    const { recallId } = useParams();
    const recall = fakeRecalls.find((r) => r.id === recallId);

    return (
        <div>
            <MainContentTemplate>
                <Header key='header' user={fakeUser} />
                <RecallForm recall={recall} key='content' />
            </MainContentTemplate>
        </div>
    );
};
