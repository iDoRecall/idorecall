import React, { ReactElement, ReactNode } from 'react';
import './styles.scss';
import { MainContentTemplateProps } from './MainContentTemplateProps.interface';

export const MainContentTemplate: React.FC<MainContentTemplateProps> = ({
    children,
}) => {
    const extractChild = (key: string): ReactNode =>
        children.find((c: ReactElement) => c?.key === key);

    return (
        <div className='main-template-grid'>
            {extractChild('header')}
            <div className='main-template-content'>
                {extractChild('content')}
            </div>
        </div>
    );
};
