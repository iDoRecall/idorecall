import { useUserState } from './useUserState';

export const StatesFacade = {
    loadUser: useUserState.getState().loadUser,
};
