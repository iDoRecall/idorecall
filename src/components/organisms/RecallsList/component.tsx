import * as React from 'react';
import './styles.scss';
import { RecallsListProps } from './RecallsListProps';
import { Recall } from '../../../models';
import { RecallCard } from '../../molecules/RecallCard';
import { useState } from 'react';

export const RecallsList: React.FC<RecallsListProps> = ({ recalls }) => {
    const [activeCard, setActiveCard] = useState<string>('');

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

    const deleteRecall = (recall: Recall) => {
        // emit to the smart parent;
    };

    return (
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
    );
};
