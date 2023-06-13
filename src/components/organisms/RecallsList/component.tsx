import * as React from 'react';
import './styles.scss';
import { RecallsListProps } from './RecallsListProps';
import { fakeRecalls } from '../../../mock/fakeRecalls';
import { Recall } from '../../../models';
import { RecallCard } from '../../molecules/RecallCard';

export const RecallsList: React.FC<RecallsListProps> = () => {
    return (
        <div className='recalls-list-container'>
            {fakeRecalls.map((recall: Recall, index) => (
                <RecallCard
                    key={recall.id}
                    activeCard={index === 0}
                    recall={recall}
                    changeActiveCard={() => {}}
                    deleteRecall={() => {}}
                />
            ))}
        </div>
    );
};
