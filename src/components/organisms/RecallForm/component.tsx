import React, { useCallback, useState } from 'react';
import './styles.scss';
import { RecallFormProps } from './RecallFormProps';
import { Recall } from '../../../models';
import { Field, Form, Formik } from 'formik';
import { AppFroalaEditor } from '../../molecules/AppFroalaEditor';
import { FroalaPlaceholder } from '../../atoms/FroalaPlaceholder';
import { AppAutocomplete } from '../../molecules/AppAutocomplete';
import ActionButton from '../../atoms/ActionButton/component';
import { useNavigate } from 'react-router';
import { isEqual } from '../../../utils/is-equal';
import { handleFormula } from '../../../utils/handleFormula';

const INITIAL_RECALL: Recall = {
    questionMarkup: '',
    answerMarkup: '',
    reversible: false,
    question: '',
    answer: '',
    id: '',
    tags: [],
    source: {
        id: '',
        type: '',
        name: '',
        link: '',
    },
};

export const RecallForm: React.FC<RecallFormProps> = ({
    recall,
    backRoute = '/',
    partialRecall = {},
    onTagInput,
    tagSearch = [],
    onClassesInput,
    onSubmit,
    classesSearch = [],
    submitDisabledWithoutChanges,
}) => {
    const [formValue, setFormValue] = useState<Recall>(
        recall ?? { ...INITIAL_RECALL, ...partialRecall },
    );
    const [activeQuestionMarkup, setActiveQuestionMarkup] =
        useState<boolean>(false);
    const [activeAnswerMarkup, setActiveAnswerMarkup] =
        useState<boolean>(false);

    const [errorQuestion, setErrorQuestion] = useState<string>('');
    const [errorAnswer, setErrorAnswer] = useState<string>('');

    const navigate = useNavigate();

    const swap = useCallback(
        ({ answerMarkup, questionMarkup, ...values }: Recall) => {
            setActiveQuestionMarkup(true);
            setActiveAnswerMarkup(true);
            setFormValue({
                ...values,
                answerMarkup: questionMarkup ? `${questionMarkup} ` : '',
                questionMarkup: answerMarkup ? `${answerMarkup} ` : '',
            });
        },
        [],
    );

    const handleSubmitWithValidation = (values: Recall) => {
        if (!errorQuestion && !errorAnswer) {
            values.answer = getValueFromMarkup(values.answerMarkup);
            values.question = getValueFromMarkup(values.questionMarkup);

            onSubmit(values);
        }
    };

    const getValueFromMarkup = (markup: string): string => {
        const div = document.createElement('div');
        div.innerHTML = markup;
        handleFormula(div);
        const { innerText } = div;
        div.remove();
        return innerText;
    };

    const handleKeyDown = (keyEvent: React.KeyboardEvent) => {
        if (keyEvent.key === 'Enter') {
            keyEvent.preventDefault();
        }
    };

    const checkIsValuesEqual = (values: Recall): boolean => {
        const initial = {
            questionMarkup: formValue.questionMarkup,
            answerMarkup: formValue.answerMarkup,
            reversible: formValue.reversible,
            tags: formValue.tags,
            shareClasses: formValue.shareClasses,
        };

        const current = {
            questionMarkup: normalizeText(values.questionMarkup),
            answerMarkup: normalizeText(values.answerMarkup),
            reversible: values.reversible,
            tags: values.tags,
            shareClasses: values.shareClasses,
        };

        return isEqual(initial, current);
    };

    const normalizeText = (inputValue: string): string => {
        try {
            const parser = new DOMParser();
            return parser.parseFromString(inputValue, 'text/html').body
                .textContent;
        } catch (error) {
            console.error('Error while normalizing text:', error);
            return inputValue;
        }
    };

    return (
        <div className='editing-recall'>
            <Formik
                enableReinitialize={true}
                initialValues={formValue}
                onSubmit={(values: Recall) => {
                    handleSubmitWithValidation(values);
                }}
            >
                {({ values, touched }) => (
                    <Form onKeyDown={handleKeyDown}>
                        <ul>
                            <li className='froala-question max-width-field'>
                                <svg
                                    className='letter'
                                    id='Layer_4'
                                    data-name='Layer 4'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 100 100'
                                >
                                    <defs>
                                        <style>
                                            .clss-1{'isolation:isolate;'}.clss-2
                                            {'fill:#424c51;'}
                                        </style>
                                    </defs>
                                    <g id='Q' className='clss-1'>
                                        <g className='clss-1'>
                                            <path
                                                className='clss-2'
                                                d='M79.11,52A40.77,40.77,0,0,1,74.9,71,26.88,26.88,0,0,1,62.85,83.09L77,96.92l-2.06,1.85L59.88,84.31a30.81,30.81,0,0,1-9.8,1.59Q37,85.9,29,76.62t-8-25V40.49a41.67,41.67,0,0,1,3.58-17.7A27.31,27.31,0,0,1,34.74,10.85,27.83,27.83,0,0,1,50,6.63a27.94,27.94,0,0,1,15.29,4.22,27.47,27.47,0,0,1,10.25,12,41.57,41.57,0,0,1,3.6,17.67ZM76.25,40.38q0-14-7.1-22.43T50,9.5q-11.91,0-19,8.39t-7.1,22.87V52a39,39,0,0,0,3.21,16.29A24.55,24.55,0,0,0,36.2,79.22,25.11,25.11,0,0,0,50.08,83q12.08,0,19.13-8.43t7-23Z'
                                            />
                                        </g>
                                    </g>
                                </svg>

                                {formValue?.questionMarkup ||
                                activeQuestionMarkup ? (
                                    <Field
                                        plase
                                        name='questionMarkup'
                                        component={AppFroalaEditor}
                                        setError={setErrorQuestion}
                                        nameField='questionMarkup'
                                        initContent={formValue.questionMarkup}
                                        isQuestion={true}
                                    />
                                ) : (
                                    <FroalaPlaceholder
                                        click={setActiveQuestionMarkup}
                                        text='Enter your question...'
                                    />
                                )}
                            </li>
                            {errorQuestion && (
                                <div className='errors'>{errorQuestion}</div>
                            )}
                            <li
                                className={`swap ${
                                    !activeQuestionMarkup
                                        ? 'question-inactive'
                                        : ''
                                } ${
                                    errorQuestion ? 'swap-error-question' : ''
                                }`}
                            >
                                <a
                                    onClick={() => {
                                        swap(values);
                                    }}
                                >
                                    <svg
                                        className='svg-icon'
                                        overflow='hidden'
                                        width='1em'
                                        height='1em'
                                        viewBox='0 0 1024 1024'
                                        version='1.1'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            fill='currentColor'
                                            d='M682.666667 725.333333l0-298.666667-85.333333 0 0 298.666667-128 0 170.666667 170.666667 170.666667-170.666667L682.666667 725.333333zM384 128 213.333333 298.666667l128 0 0 298.666667 85.333333 0L426.666667 298.666667l128 0L384 128z'
                                        />
                                    </svg>
                                </a>
                            </li>
                            <li className='froala-answer max-width-field'>
                                <svg
                                    className='letter'
                                    id='Layer_4'
                                    fontWeight='900'
                                    data-name='Layer 4'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 100 100'
                                >
                                    <defs>
                                        <style>
                                            .answer-1{'isolation:isolate;'}
                                            .answer-2{'fill:#424c51;'}
                                        </style>
                                    </defs>
                                    <g id='A' className='answer-1'>
                                        <g className='answer-1'>
                                            <path
                                                className='answer-2'
                                                d='M68.86,61.66H31.09l-8.59,23H19.38L48.25,7.56h3.5L80.62,84.71H77.5ZM32.14,58.8H67.8L50,11Z'
                                            />
                                        </g>
                                    </g>
                                </svg>

                                {activeAnswerMarkup ||
                                formValue.answerMarkup ? (
                                    <Field
                                        plase
                                        name='answerMarkup'
                                        component={AppFroalaEditor}
                                        setError={setErrorAnswer}
                                        nameField='answerMarkup'
                                        initContent={formValue.answerMarkup}
                                    />
                                ) : (
                                    <FroalaPlaceholder
                                        click={setActiveAnswerMarkup}
                                        text='Enter your answer ...'
                                    />
                                )}
                            </li>
                            {errorAnswer && (
                                <div className='errors'>{errorAnswer}</div>
                            )}
                            <li>
                                <svg
                                    className='idr-icons'
                                    id='Layer_4'
                                    data-name='Layer 4'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 100 100'
                                >
                                    <path d='M60.35,53.09l2.82,8.39H57.56ZM38.56,31A4.1,4.1,0,0,0,35,32.84a9.42,9.42,0,0,0-1.26,5.35v1a13.1,13.1,0,0,0,.33,3.1A6.78,6.78,0,0,0,35,44.57,4.21,4.21,0,0,0,36.51,46a4.52,4.52,0,0,0,2.08.47,4.07,4.07,0,0,0,3.59-1.85,9.6,9.6,0,0,0,1.25-5.37v-1a9.41,9.41,0,0,0-1.27-5.35A4.1,4.1,0,0,0,38.56,31ZM82.5,28.39V71.61A10.92,10.92,0,0,1,71.61,82.5H28.39A10.92,10.92,0,0,1,17.5,71.61V28.39A10.92,10.92,0,0,1,28.39,17.5H71.61A10.92,10.92,0,0,1,82.5,28.39ZM44.75,71a13.48,13.48,0,0,1-12.52-8.39l2-.37-4.06-4.76-2.1,5.89L30.15,63a15.56,15.56,0,0,0,14.6,10.1Zm3.36-32.79a14.1,14.1,0,0,0-.71-4.6,10.17,10.17,0,0,0-2-3.48,8.54,8.54,0,0,0-3-2.19,10.18,10.18,0,0,0-7.72,0,8.54,8.54,0,0,0-3,2.19,10.36,10.36,0,0,0-2,3.48,14.38,14.38,0,0,0-.7,4.6v1a14.08,14.08,0,0,0,.71,4.61,10,10,0,0,0,2,3.46,8.61,8.61,0,0,0,3,2.17,9.54,9.54,0,0,0,3.86.77,10.23,10.23,0,0,0,1.69-.14l4.78,3.83L48,51.31l-3.73-2.93a9.38,9.38,0,0,0,2.82-3.71,13.5,13.5,0,0,0,1-5.46ZM70.88,69.84,62.49,47.43H58.21L49.87,69.84h4.91l1.54-4.62h8.1L66,69.84Zm.85-29.73-2.06.38a15.56,15.56,0,0,0-14.6-10.1v2.09a13.48,13.48,0,0,1,12.51,8.39l-2,.36,4,4.77Z' />
                                </svg>
                                <span>
                                    <Field
                                        id='reversible'
                                        name='reversible'
                                        label='Start typing here to add a tag'
                                        type='checkbox'
                                    />
                                    <label htmlFor='reversible'>
                                        Reversible recall
                                    </label>
                                </span>
                            </li>
                            <li>
                                <svg
                                    className='idr-icons'
                                    id='Layer_4'
                                    data-name='Layer 4'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 100 100'
                                >
                                    <path d='M85,52.37,55.19,22.54a6.46,6.46,0,0,0-4-1.65H27.29a5.63,5.63,0,0,0-5.62,5.63V50.44a6.43,6.43,0,0,0,1.65,4L53.15,84.25a5.63,5.63,0,0,0,8,0L85,60.32A5.61,5.61,0,0,0,85,52.37ZM34.79,39.64A5.63,5.63,0,1,1,40.42,34,5.62,5.62,0,0,1,34.79,39.64Z' />
                                </svg>
                                <Field
                                    name='tags'
                                    component={AppAutocomplete}
                                    placeholder='Start typing here to add a tag'
                                    nameField='tags'
                                    initContent={recall ? recall.tags : []}
                                    onInput={onTagInput}
                                    itemsSearch={tagSearch}
                                />
                            </li>
                            {/* David sayed that we don't need it now */}
                            {/*<li>*/}
                            {/*    <svg*/}
                            {/*        className='idr-icons'*/}
                            {/*        id='Layer_4'*/}
                            {/*        data-name='Layer 4'*/}
                            {/*        xmlns='http://www.w3.org/2000/svg'*/}
                            {/*        viewBox='0 0 100 100'*/}
                            {/*    >*/}
                            {/*        <path d='M27.78,34.4a6.7,6.7,0,1,0-6.69-6.7,6.68,6.68,0,0,0,6.69,6.7Zm44.44,0a6.7,6.7,0,1,0-6.69-6.7,6.69,6.69,0,0,0,6.69,6.7ZM49.65,44.81a10,10,0,1,0-10-10,10,10,0,0,0,10,10ZM68.87,78.73A1.93,1.93,0,0,1,67,81H32.34a1.93,1.93,0,0,1-1.9-2.27l3.51-20a12.27,12.27,0,0,1,6.29-9.49,21.42,21.42,0,0,1,9.41-2,21.47,21.47,0,0,1,9.42,2,12.29,12.29,0,0,1,6.28,9.49ZM61.11,47.11l.59-3.37a8.24,8.24,0,0,1,4.21-6.36,15.32,15.32,0,0,1,12.62,0,8.2,8.2,0,0,1,4.21,6.36L85,56.38a1.94,1.94,0,0,1-1.9,2.28H68.28l-.07-.38A15.12,15.12,0,0,0,61.11,47.11ZM35.63,53.76c-.18.31-.35.62-.5.94C35.28,54.38,35.45,54.07,35.63,53.76Zm-1.1,2.49a16.48,16.48,0,0,0-.56,2.4A16.48,16.48,0,0,1,34.53,56.25Zm1.23-2.72c.19-.32.4-.62.62-.92C36.16,52.91,36,53.21,35.76,53.53ZM35,55c-.14.32-.27.64-.39,1C34.74,55.63,34.87,55.31,35,55Zm-4,3.67H16.93A1.94,1.94,0,0,1,15,56.38l2.23-12.64a8.2,8.2,0,0,1,4.21-6.36A14.28,14.28,0,0,1,27.78,36a14.31,14.31,0,0,1,6.31,1.36,8.24,8.24,0,0,1,4.21,6.36l.52,3a15.1,15.1,0,0,0-7.73,11.56Zm5.47-6.21a8.94,8.94,0,0,1,.75-.88A8.94,8.94,0,0,0,36.5,52.45Zm1.81-1.87a10.2,10.2,0,0,1,1-.78A10.2,10.2,0,0,0,38.31,50.58Zm-.06.05a9,9,0,0,0-.9.84A9,9,0,0,1,38.25,50.63Z' />*/}
                            {/*    </svg>*/}

                            {/*    <Field*/}
                            {/*        name='shareClasses'*/}
                            {/*        component={AppAutocomplete}*/}
                            {/*        placeholder='Share with classes you belong to'*/}
                            {/*        nameField='shareClasses'*/}
                            {/*        onInput={onClassesInput}*/}
                            {/*        itemsSearch={classesSearch}*/}
                            {/*    />*/}
                            {/*</li>*/}
                        </ul>
                        <footer>
                            <ActionButton
                                onClick={() => {
                                    navigate(backRoute);
                                }}
                                colorType='light'
                                type='button'
                            >
                                CANCEL
                            </ActionButton>
                            <ActionButton
                                type='submit'
                                colorType='dark'
                                isDisabled={
                                    (submitDisabledWithoutChanges &&
                                        checkIsValuesEqual(values)) ||
                                    !values.questionMarkup ||
                                    !values.answerMarkup ||
                                    (!!errorQuestion ??
                                        !!errorAnswer ??
                                        (!values.questionMarkup &&
                                            !touched.questionMarkup) ??
                                        (!values.answerMarkup &&
                                            !touched.answerMarkup) ??
                                        !!values.id)
                                }
                            >
                                {values.id ? 'SAVE RECALL' : 'ADD RECALL'}
                            </ActionButton>
                        </footer>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
