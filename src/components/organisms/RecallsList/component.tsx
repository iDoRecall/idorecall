import * as React from 'react';
import { useState } from 'react';
import './styles.scss';
import { RecallsListProps } from './RecallsListProps';
import { Recall } from '../../../models';
import { RecallCard } from '../../molecules/RecallCard';
import { EmptyList } from '../EmptyList';
import { DeleteRecallService } from '../../../services';
import { Loading } from '../Loading';

export const RecallsList: React.FC<RecallsListProps> = ({ recalls }) => {
    const [activeCard, setActiveCard] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const changeActiveCard = (id: string, shouldBecomeActive = true): void => {
        const newActiveCard = recalls.find(
            (recall: Recall) => recall && id === recall.id,
        );
        if (!newActiveCard) {
            setActiveCard('');
            return;
        }

        if (!shouldBecomeActive) {
            setActiveCard('');
        } else {
            setActiveCard(newActiveCard.id);
        }
    };

    const deleteRecall = async (recall: Recall) => {
        setIsLoading(true);
        await DeleteRecallService.instance.deleteRecall(recall);
        setIsLoading(false);
    };

    return isLoading ? (
        <Loading />
    ) : recalls.length ? (
        <div className='recalls-list-container'>
            {recalls.map((recall: Recall) => (
                <RecallCard
                    key={recall.id}
                    activeCard={activeCard === recall.id}
                    recall={recall}
                    changeActiveCard={changeActiveCard}
                    deleteRecall={deleteRecall}
                />
            ))}
        </div>
    ) : (
        <EmptyList
            title={'Nothing here yet'}
            text={'Create some recalls, after that, you will see recall list.'}
        />
    );
};
