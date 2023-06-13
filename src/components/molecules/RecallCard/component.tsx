import * as React from 'react';
import './styles.scss';
import { RecallCardProps } from './RecallCardProps';
import { MouseEventHandler, useState } from 'react';

export const RecallCard: React.FC<RecallCardProps> = ({
    activeCard,
    recall,
    changeActiveCard,
    deleteRecall,
}) => {
    const [isActionsDisabled, setIsActionsDisabled] = useState<boolean>(false);
    // const cardRef = useRef<HTMLDivElement>(null);
    // const navigate = useNavigate();
    console.log(activeCard);

    const handleDelete: MouseEventHandler<HTMLDivElement> = (event) => {
        if (!activeCard) {
            return;
        }
        setIsActionsDisabled(true);
        event.stopPropagation();
        deleteRecall(recall);
    };

    return (
        <div className='recall-card'>
            <div className='clipperCard__wrapInfo'>
                <svg
                    className='clipperCard__wrapInfo__img'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 18.09 12.17'
                    fill='#000000'
                >
                    <title>Recall icon</title>
                    <g>
                        <g>
                            <path d='M16.17,0H1.92A1.92,1.92,0,0,0,0,1.92v8.33a1.92,1.92,0,0,0,1.92,1.92H16.17a1.92,1.92,0,0,0,1.92-1.92V1.92A1.92,1.92,0,0,0,16.17,0ZM10.54,8.71a.27.27,0,0,1-.28.28H4a.27.27,0,0,1-.28-.28V8.14A.28.28,0,0,1,4,7.86h6.22a.28.28,0,0,1,.28.28Zm0-2.36a.28.28,0,0,1-.28.29H4a.28.28,0,0,1-.28-.29V5.79A.27.27,0,0,1,4,5.51h6.22a.27.27,0,0,1,.28.28Zm4-2.35a.28.28,0,0,1-.28.28H4A.28.28,0,0,1,3.76,4V3.43A.27.27,0,0,1,4,3.15H14.26a.27.27,0,0,1,.28.28Z' />
                        </g>
                    </g>
                </svg>

                <div className='clipperCard__wrapInfo__content__effect'>
                    <div className='clipperCard__wrapInfo__content'>
                        <span
                            dangerouslySetInnerHTML={{
                                __html: recall.questionMarkup,
                            }}
                        />
                    </div>
                </div>
            </div>
            <div
                className={`clipperCard__wrapAction ${
                    isActionsDisabled ? 'disabled' : ''
                }`}
            >
                <div
                    onClick={(event) => {
                        event.stopPropagation();
                        // navigate('/');
                    }}
                >
                    <div className='clipperCard__wrapAction__wrap'>
                        <svg
                            className='clipperCard__wrapAction__wrap__img big'
                            id='Icons'
                            version='1.1'
                            viewBox='0 0 32 32'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <style type='text/css'>
                                .st0
                                {
                                    'fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;'
                                }
                            </style>
                            <g>
                                <path d='M28.2,6.8l-2.9-2.9c-1.2-1.2-3.2-1.2-4.3,0l-2.3,2.3l7.3,7.3l2.3-2.3C29.4,9.9,29.4,8,28.2,6.8z' />
                                <path d='M17.2,7.6L4.8,20c-0.1,0.1-0.2,0.3-0.3,0.5L3,27.8c-0.1,0.3,0,0.7,0.3,0.9C3.5,28.9,3.7,29,4,29c0.1,0,0.1,0,0.2,0l7.3-1.5   c0.2,0,0.4-0.1,0.5-0.3l12.4-12.4L17.2,7.6z M10.6,22.8c-0.2,0.2-0.5,0.3-0.7,0.3S9.4,23,9.2,22.8c-0.4-0.4-0.4-1,0-1.4l8.8-8.8   c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4L10.6,22.8z' />
                            </g>
                        </svg>
                        {activeCard && (
                            <span className='clipperCard__wrapAction__wrap__text'>
                                Editing
                            </span>
                        )}
                    </div>
                </div>
                <div
                    onClick={handleDelete}
                    className={`clipperCard__wrapAction__wrap ${
                        isActionsDisabled ? 'disabled' : ''
                    }`}
                >
                    <svg
                        className='clipperCard__wrapAction__wrap__img'
                        enableBackground='new 0 0 32 32'
                        id='Glyph'
                        version='1.1'
                        viewBox='0 0 32 32'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M6,12v15c0,1.654,1.346,3,3,3h14c1.654,0,3-1.346,3-3V12H6z M12,25c0,0.552-0.448,1-1,1s-1-0.448-1-1v-9  c0-0.552,0.448-1,1-1s1,0.448,1,1V25z M17,25c0,0.552-0.448,1-1,1s-1-0.448-1-1v-9c0-0.552,0.448-1,1-1s1,0.448,1,1V25z M22,25  c0,0.552-0.448,1-1,1s-1-0.448-1-1v-9c0-0.552,0.448-1,1-1s1,0.448,1,1V25z'
                            id='XMLID_237_'
                        />
                        <path
                            d='M27,6h-6V5c0-1.654-1.346-3-3-3h-4c-1.654,0-3,1.346-3,3v1H5C3.897,6,3,6.897,3,8v1c0,0.552,0.448,1,1,1h24  c0.552,0,1-0.448,1-1V8C29,6.897,28.103,6,27,6z M13,5c0-0.551,0.449-1,1-1h4c0.551,0,1,0.449,1,1v1h-6V5z'
                            id='XMLID_243_'
                        />
                    </svg>
                    {activeCard && (
                        <span className='clipperCard__wrapAction__wrap__text'>
                            Discard
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};
