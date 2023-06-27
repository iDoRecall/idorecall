import * as React from 'react';
import './styles.scss';
import { MainContentTemplate } from '../../templates/MainContentTemplate';
import { Header } from '../../molecules/Header';
import { useNavigate, useParams } from 'react-router';
import { fakeRecalls } from '../../../mock/fakeRecalls';
import { RecallForm } from '../../organisms/RecallForm';
import { useLaunchCreatingState } from '../../../states/launch-creating';
import { useFormTagsState } from '../../../states/form-tags';
import { useFormClassesState } from '../../../states/form-classes';
import { useUserState } from '../../../states/user';
import { Recall } from '../../../models';
import { NoticeService } from '../../../services';
import { useCreateRecallState } from '../../../states/create-recall';
import { Loading } from '../../organisms/Loading';

export const CreateRecall = () => {
    const { recallId } = useParams();
    const { user } = useUserState();
    const { answer } = useLaunchCreatingState();
    const { loadTagsByQuery, tags } = useFormTagsState();
    const { loadClassesByQuery, classes } = useFormClassesState();
    const { isLoading, saveRecall } = useCreateRecallState();
    const navigate = useNavigate();

    const recall = fakeRecalls.find((r) => r.id === recallId);

    const createRecall = async (recall: Recall): Promise<void> => {
        const success = await saveRecall(recall);
        if (success) {
            NoticeService.instance.notice('Recall created successfully');
        } else {
            NoticeService.instance.notice(
                'Recall is`nt created, something wrong',
            );
        }
        navigate('/');
    };

    return (
        <div>
            <MainContentTemplate>
                {user && <Header key='header' user={user} />}
                {isLoading ? (
                    <Loading key='content' />
                ) : (
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
                        onSubmit={createRecall}
                    />
                )}
            </MainContentTemplate>
        </div>
    );
};
