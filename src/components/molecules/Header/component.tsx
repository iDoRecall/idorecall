import React from 'react';
import './styles.scss';
import { HeaderProps } from './HeaderProps.interface';
import { Logo } from '../../atoms/Logo';
import { UserAvatar } from '../../atoms/UserAvatar';

export const Header: React.FC<HeaderProps> = ({ user }) => {
    return (
        <header className='header'>
            <Logo />
            <UserAvatar user={user} />
        </header>
    );
};
