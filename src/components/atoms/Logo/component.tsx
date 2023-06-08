import React from 'react';
import './styles.scss';

export const Logo = () => {
    return (
        <div className='logoContent'>
            <div className='wrapImg'>
                <svg
                    className='image'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 86.23 86.26'
                >
                    <defs>
                        <style type='text/css'>
                            {
                                '.cls-11{fill:#70bfa1;}.cls-22{fill:#fe9a25;}.cls-33{fill:#e71726;}'
                            }
                        </style>
                    </defs>
                    <g id='Layer_2'>
                        <g id='Layer_4'>
                            <g id='Group_936'>
                                <g id='Layer_1-2'>
                                    <g id='Path_12'>
                                        <path
                                            id='Path_105'
                                            className='cls-11'
                                            d='M43.11,86.25a43.12,43.12,0,0,1-30.49-73.6L25.16,25.19a25.39,25.39,0,0,0,18,43.34h0A25.42,25.42,0,0,0,68.49,43.14H86.22A43.16,43.16,0,0,1,43.11,86.26Z'
                                        />
                                    </g>
                                    <g id='Path_13'>
                                        <path
                                            id='Path_106'
                                            className='cls-22'
                                            d='M68.49,43.14a25.39,25.39,0,0,0-35.27-23.4L26.33,3.4a43.13,43.13,0,0,1,59.9,39.73Z'
                                        />
                                    </g>
                                    <g id='Path_14'>
                                        <path
                                            id='Path_107'
                                            className='cls-33'
                                            d='M25.17,25.18,12.62,12.66a42.72,42.72,0,0,1,13.7-9.25l6.92,16.32A25.34,25.34,0,0,0,25.17,25.18Z'
                                        />
                                    </g>
                                </g>
                                <path
                                    id='cut-solid'
                                    className='cls-11'
                                    d='M45.91,43.22l8.62-8.62a.63.63,0,0,0,0-.88h0a4.35,4.35,0,0,0-6.15,0l-6,6-1.29-1.29a5,5,0,1,0-6.44,2.8,4.88,4.88,0,0,0,2.51.3l1.7,1.7-1.7,1.7a5,5,0,1,0,4.23,5.6,4.86,4.86,0,0,0-.3-2.5l1.29-1.29,6,6a4.35,4.35,0,0,0,6.15,0,.63.63,0,0,0,0-.88h0Zm-9.43-5a1.66,1.66,0,1,1,1.66-1.66A1.65,1.65,0,0,1,36.48,38.25Zm0,13.26a1.66,1.66,0,1,1,1.66-1.66A1.66,1.66,0,0,1,36.48,51.51Z'
                                />
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
            <div className='wrapTitle'>
                <strong>iDoRecall</strong>
                <div>obsidian</div>
            </div>
        </div>
    );
};
