import * as React from 'react';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
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
import {
    CreateRecallService,
    NoticeService,
    RewriteFormService,
} from '../../../services';
import { Recall } from '../../../models';
import { isLinkIdUsed } from '../../../utils/is-link-id-used';

export const CreateRecall = () => {
    const { user } = useUserState();
    const {
        answer = null,
        question = null,
        reset,
        linkId,
    } = useLaunchCreatingState();
    const { loadTagsByQuery, tags } = useFormTagsState();
    const { loadClassesByQuery, classes } = useFormClassesState();
    const { isLoading, saveRecall } = useCreateRecallState();
    const navigate = useNavigate();
    const refIsSubmitted = useRef(false);

    useEffect(() => {
        return () => {
            if (!RewriteFormService.instance.isRewrite) {
                if (refIsSubmitted.current) {
                    CreateRecallService.instance.resetCreatingData();
                } else {
                    CreateRecallService.instance.unLaunchCreating(linkId);
                }
                reset();
            } else if (!refIsSubmitted.current && !isLinkIdUsed(linkId)) {
                CreateRecallService.instance.unLaunchCreating(linkId);
            }
        };
    }, []);

    const createRecall = async (recall: Recall): Promise<void> => {
        const success = await saveRecall(recall);
        refIsSubmitted.current = true;
        if (success) {
            NoticeService.instance.notice('Recall created successfully');
        } else {
            NoticeService.instance.notice(
                'Recall isn`t created, something wrong',
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
                        tagSearch={tags}
                        classesSearch={classes}
                        partialRecall={{
                            answer,
                            answerMarkup: answer,
                            question,
                            questionMarkup: question,
                        }}
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
