import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import './styles.scss';
import { MainContentTemplate } from '../../templates/MainContentTemplate';
import { Header } from '../../molecules/Header';
import { Loading } from '../../organisms/Loading';
import { RecallForm } from '../../organisms/RecallForm';
import { useLaunchCreatingState } from '../../../states/launch-creating';
import { useFormTagsState } from '../../../states/form-tags';
import { useFormClassesState } from '../../../states/form-classes';
import { useUserState } from '../../../states/user';
import { useCreateRecallState } from '../../../states/create-recall';
import { CreateRecallService, NoticeService } from '../../../services';
import { Recall } from '../../../models';
import { fakeRecalls } from '../../../mock/fakeRecalls';

export const CreateRecall = () => {
    const { recallId } = useParams();
    const { user } = useUserState();
    const { answer } = useLaunchCreatingState();
    const { loadTagsByQuery, tags } = useFormTagsState();
    const { loadClassesByQuery, classes } = useFormClassesState();
    const { isLoading, saveRecall } = useCreateRecallState();
    const navigate = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const recall = fakeRecalls.find((r) => r.id === recallId);

    useEffect(() => {
        return () => {
            if (isSubmitted) {
                CreateRecallService.instance.resetCreatingData();
            } else {
                CreateRecallService.instance.unLaunchCreating();
            }
        };
    }, []);

    const createRecall = async (recall: Recall): Promise<void> => {
        setIsSubmitted(true);
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
