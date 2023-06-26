import * as React from 'react';
import './styles.scss';
import { MainContentTemplate } from '../../templates/MainContentTemplate';
import { Header } from '../../molecules/Header';
import { useParams } from 'react-router';
import { fakeRecalls } from '../../../mock/fakeRecalls';
import { RecallForm } from '../../organisms/RecallForm';
import { useCreateRecallState } from '../../../states/create-recall';
import { useFormTagsState } from '../../../states/form-tags';
import { useFormClassesState } from '../../../states/form-classes';
import { Recall } from '../../../models';
import { RecallService } from '../../../api/recall';
import { useUserState } from '../../../states/user';

export const EditRecall = () => {
    const { recallId } = useParams();
    const { user } = useUserState();
    const { answer } = useCreateRecallState();
    const recall = fakeRecalls.find((r) => r.id === recallId);
    const { loadTagsByQuery, tags } = useFormTagsState();
    const { loadClassesByQuery, classes } = useFormClassesState();
    const editRecall = (recall: Recall): void => {
        void RecallService.instance.editRecall(recall);
    };

    return (
        <div>
            <MainContentTemplate>
                {user && <Header key='header' user={user} />}
                <RecallForm
                    recall={recallId ? recall : null}
                    tagSearch={tags}
                    classesSearch={classes}
                    partialRecall={
                        answer ? { answer, answerMarkup: answer } : null
                    }
                    onTagInput={loadTagsByQuery}
                    onClassesInput={loadClassesByQuery}
                    key='content'
                    onSubmit={editRecall}
                />
            </MainContentTemplate>
        </div>
    );
};
