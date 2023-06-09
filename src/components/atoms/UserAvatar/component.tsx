import React from 'react';
import './styles.scss';
import { UserAvatarProps } from './UserAvatarProps.interface';

export const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
    return (
        <div className='avatar-wrapper'>
            <img alt='avatar' className='avatar' src={user.avatarUrl} />
            <span
                className='avatar-username'
                title={`${user.firstName} ${user.lastName}`}
            >
                {user.firstName}
            </span>
        </div>
    );
};
