import * as React from 'react';
import './styles.scss';
import { RecallsListProps } from './RecallsListProps';
import { fakeRecalls } from '../../../mock/fakeRecalls';
import { Recall } from '../../../models';
import { RecallCard } from '../../molecules/RecallCard';
import { useState } from 'react';

export const RecallsList: React.FC<RecallsListProps> = () => {
    const [activeCard, setActiveCard] = useState<string>('');

    const changeActiveCard = (id: string, shouldBecomeActive = true): void => {
        const newActiveCard = fakeRecalls.find(
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
        console.log(recall);
    };

    return (
        <div className='recalls-list-container'>
            {fakeRecalls.map((recall: Recall, index) => (
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
