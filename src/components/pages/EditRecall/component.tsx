import * as React from 'react';
import './styles.scss';
import { MainContentTemplate } from '../../templates/MainContentTemplate';
import { Header } from '../../molecules/Header';
import { useNavigate, useParams } from 'react-router';
import { RecallForm } from '../../organisms/RecallForm';
import { useLaunchCreatingState } from '../../../states/launch-creating';
import { useFormTagsState } from '../../../states/form-tags';
import { useFormClassesState } from '../../../states/form-classes';
import { Recall } from '../../../models';
import { RecallService } from '../../../api/recall';
import { useUserState } from '../../../states/user';
import { useEffect, useState } from 'react';
import { NoticeService } from '../../../services';
import { Loading } from '../../organisms/Loading';

export const EditRecall = () => {
    const navigate = useNavigate();
    const { recallId } = useParams();
    const { user } = useUserState();
    const { answer } = useLaunchCreatingState();
    const { loadTagsByQuery, tags } = useFormTagsState();
    const { loadClassesByQuery, classes } = useFormClassesState();
    const [recall, setRecall] = useState<Recall>();
    const [isRecallLoading, setIsRecallLoading] = useState<boolean>(false);

    useEffect(() => {
        void loadRecall();
    }, []);

    const editRecall = (recall: Recall): void => {
        void RecallService.instance.editRecall(recall);
        navigate('/');
    };

    const loadRecall = async (): Promise<void> => {
        setIsRecallLoading(true);
        if (recallId) {
            const recall = await RecallService.instance
                .getRecallById(recallId)
                .catch(() => {
                    navigate('/');
                    NoticeService.instance.notice('Something wrong');
                });
            if (recall) {
                setRecall(recall);
            }
        }
        setIsRecallLoading(false);
    };

    return (
        <div>
            <MainContentTemplate>
                {user && <Header key='header' user={user} />}
                {isRecallLoading ? (
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
                        onSubmit={editRecall}
                    />
                )}
            </MainContentTemplate>
        </div>
    );
};
