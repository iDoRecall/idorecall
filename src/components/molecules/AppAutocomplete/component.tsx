import React, { useCallback, useEffect, useRef, useState } from 'react';
import './styles.scss';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { uuid } from '../../../utils/guid';
import { AutocompleteItem } from '../../../models';
import { AppAutocompleteProps } from './AppAutocompleteProps';

const MIN_CHARACTERS = 2;

const AppAutocomplete: React.FC<AppAutocompleteProps> = ({
    initContent,
    placeholder,
    nameField,
    form,
    isAction = false,
    onInput,
    itemsSearch = [],
}: AppAutocompleteProps) => {
    const [isComponentVisible, setIsComponentVisible] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<AutocompleteItem[]>(
        [],
    );

    const [inputValue, setInputValue] = useState('');
    const [tabsFilterList, setTabFilterList] = useState<AutocompleteItem[]>([]);
    const [filtersOptions, setFiltersOptions] = useState<AutocompleteItem[]>(
        [],
    );

    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClickOutside = useCallback(() => {
        setIsComponentVisible(false);
    }, []);

    useClickOutside(wrapperRef, handleClickOutside);

    useEffect(() => {
        if (initContent?.length) {
            setSelectedOptions(initContent);
        }
    }, []);

    useEffect(() => {
        setTabFilterList(itemsSearch);
    }, [itemsSearch]);

    useEffect(() => {
        changeFieldValue(selectedOptions);
    }, [selectedOptions]);

    const changeFieldValue = (value: AutocompleteItem[]) => {
        if (!form) return;
        form.setFieldValue(nameField, value);
    };

    useEffect(() => {
        onInput(inputValue);
    }, [inputValue]);

    useEffect(() => {
        if (tabsFilterList) {
            const filterTabs = tabsFilterList.filter((tag) => {
                return !selectedOptions.find(({ name }) => name === tag.name);
            });
            setFiltersOptions(filterTabs); // input 2
        }
    }, [tabsFilterList]);

    useEffect(() => {
        const handleClickOutside = () => {
            onAdd(inputValue);
        };

        if (!isComponentVisible) {
            handleClickOutside();
        }
    }, [isComponentVisible]);

    const deleteSelectedOptions = (clickOption: AutocompleteItem) => {
        const newSelectedOptions = selectedOptions.filter(
            ({ name }) => name !== clickOption.name,
        );
        setSelectedOptions(newSelectedOptions);
    };

    const onAdd = (value: string) => {
        if (value.length < MIN_CHARACTERS) {
            return;
        }

        if (!value || selectedOptions.find(({ name }) => name === value)) {
            return;
        }

        const newSelectedOptions = [
            ...selectedOptions,
            { name: value, id: uuid() },
        ];

        setSelectedOptions(newSelectedOptions);
        setTabFilterList([]); // ??
        setInputValue('');
    };

    const onKeyPressInput = ({
        target,
        key,
    }: React.KeyboardEvent<HTMLInputElement>): void => {
        const { value } = target as HTMLInputElement;

        switch (key) {
            case 'Enter':
                onAdd(value);
                break;
            case 'Backspace':
                if (value) {
                    return;
                }

                selectedOptions.pop();
                setSelectedOptions([...selectedOptions]);
                break;
        }
    };

    const onChangeInput = ({
        target,
    }: React.ChangeEvent<HTMLInputElement>): void => {
        const value = target.value.trim();

        setTabFilterList([]);

        if (!value) {
            setInputValue('');
            return;
        }

        setInputValue(value);
    };

    const clickFiltersOption = (clickOption: AutocompleteItem) => {
        const newSelectedOptions = [...selectedOptions, clickOption];
        setSelectedOptions(newSelectedOptions);
        setTabFilterList([]);
        setInputValue('');
    };

    const deleteFiltersOption = (
        event: Event,
        clickOption: AutocompleteItem,
    ) => {
        event.stopPropagation();
        const newFiltersOptions = filtersOptions.filter((option) => {
            return option.name !== clickOption.name;
        });
        setFiltersOptions(newFiltersOptions);
    };

    return (
        <div
            ref={wrapperRef}
            className='wrap-autocomplete'
            onFocus={() => {
                setIsComponentVisible(true);
            }}
        >
            <div className='selected-options'>
                <ul>
                    {selectedOptions.map((option, index) => (
                        <li key={`${index}` + option.name}>
                            <div className='option-item'>{option.name}</div>
                            <svg
                                className='closeOptions'
                                onClick={() => {
                                    deleteSelectedOptions(option);
                                }}
                                version='1.1'
                                id='icon'
                                xmlns='http://www.w3.org/2000/svg'
                                x='0px'
                                y='0px'
                                width='32px'
                                height='32px'
                                viewBox='0 0 32 32'
                            >
                                <path
                                    enableBackground='new 0 0 32 32'
                                    fill='#b3b3b3'
                                    d='M16,2C8.2,2,2,8.2,2,16s6.2,14,14,14s14-6.2,14-14S23.8,2,16,2z M21.4,23L16,17.6L10.6,23L9,21.4l5.4-5.4L9,10.6L10.6,9
	l5.4,5.4L21.4,9l1.6,1.6L17.6,16l5.4,5.4L21.4,23z'
                                />
                                <polyline
                                    fill='#eee'
                                    id='inner-path'
                                    className='st0'
                                    points='14.4,16 9,10.6 10.6,9 16,14.4 21.4,9 23,10.6 17.6,16 23,21.4 21.4,23 16,17.6
	10.6,23 9,21.4 14.4,16 '
                                />
                            </svg>
                        </li>
                    ))}
                    <input
                        ref={inputRef}
                        type='text'
                        className='input-autocomplete'
                        value={inputValue}
                        onKeyDown={(event) => {
                            onKeyPressInput(event);
                        }}
                        onChange={(event) => {
                            onChangeInput(event);
                        }}
                        placeholder={selectedOptions.length ? '' : placeholder}
                        width={selectedOptions.length ? 'auto' : 300}
                    />
                </ul>
            </div>
            {inputValue && isComponentVisible && filtersOptions && (
                <div className='filters-options'>
                    <ul>
                        {filtersOptions.map((option, index) => (
                            <li
                                key={`${index}` + option.name}
                                onClick={() => {
                                    clickFiltersOption(option);
                                }}
                                className={`${
                                    !isAction ? 'option-no-action' : ''
                                }`}
                            >
                                <div className='option-item'>{option.name}</div>
                                {isAction && (
                                    <svg
                                        className='closeOptions'
                                        onMouseDown={(event: any) => {
                                            deleteFiltersOption(event, option);
                                        }}
                                        version='1.1'
                                        id='icon'
                                        xmlns='http://www.w3.org/2000/svg'
                                        x='0px'
                                        y='0px'
                                        width='32px'
                                        height='32px'
                                        viewBox='0 0 32 32'
                                    >
                                        <path
                                            enableBackground='new 0 0 32 32'
                                            fill='#b3b3b3'
                                            d='M16,2C8.2,2,2,8.2,2,16s6.2,14,14,14s14-6.2,14-14S23.8,2,16,2z M21.4,23L16,17.6L10.6,23L9,21.4l5.4-5.4L9,10.6L10.6,9
	l5.4,5.4L21.4,9l1.6,1.6L17.6,16l5.4,5.4L21.4,23z'
                                        />
                                        <polyline
                                            fill='#eee'
                                            id='inner-path'
                                            className='st0'
                                            points='14.4,16 9,10.6 10.6,9 16,14.4 21.4,9 23,10.6 17.6,16 23,21.4 21.4,23 16,17.6
	10.6,23 9,21.4 14.4,16 '
                                        />
                                    </svg>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AppAutocomplete;
