import * as React from 'react';
import './styles.scss';
import { MainContentTemplate } from '../../templates/MainContentTemplate';
import { Header } from '../../molecules/Header';
import { fakeUser } from '../../../mock/fakeUser';
import { useParams } from 'react-router';
import { fakeRecalls } from '../../../mock/fakeRecalls';
import { RecallForm } from '../../organisms/RecallForm';
import { useCreateRecallState } from '../../../states/create-recall';
import { useFormTagsState } from '../../../states/form-tags';
import { useFormClassesState } from '../../../states/form-classes';

export const EditRecall = () => {
    const { recallId } = useParams();
    const { answer } = useCreateRecallState();
    const recall = fakeRecalls.find((r) => r.id === recallId);
    const { loadTagsByQuery } = useFormTagsState();
    const { loadClassesByQuery } = useFormClassesState();

    return (
        <div>
            <MainContentTemplate>
                <Header key='header' user={fakeUser} />
                <RecallForm
                    recall={recallId ? recall : null}
                    partialRecall={
                        answer ? { answer, answerMarkup: answer } : null
                    }
                    onTagInput={loadTagsByQuery}
                    onClassesInput={loadClassesByQuery}
                    key='content'
                />
            </MainContentTemplate>
        </div>
    );
};
