import * as React from 'react';
import { useEffect } from 'react';
import './styles.scss';
import { MainContentTemplate } from '../../templates/MainContentTemplate';
import { Header } from '../../molecules/Header';
import { RecallsList } from '../../organisms/RecallsList';
import { useUserState } from '../../../states/user';
import { useRecallListState } from '../../../states/recall-list';
import { Loading } from '../../organisms/Loading';
import { usePluginState } from '../../../states/plugin';

export const Home = () => {
    const { user } = useUserState();
    const { isLoading, recallList } = useRecallListState();
    const { plugin } = usePluginState();

    useEffect(() => {
        const ctime = plugin?.app.workspace.getActiveFile()?.stat.ctime;

        if (ctime && user) {
            void useRecallListState.getState().loadRecallList(ctime);
        }
    }, []);

    return (
        <div>
            <MainContentTemplate>
                {user && <Header key='header' user={user} />}
                {isLoading ? (
                    <Loading key='content' />
                ) : (
                    <RecallsList recalls={recallList} key='content' />
                )}
            </MainContentTemplate>
        </div>
    );
};
