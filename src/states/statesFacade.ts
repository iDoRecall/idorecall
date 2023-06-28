import { useUserState } from './user';
import { usePluginState } from './plugin';

export const statesFacade = {
    loadUser: useUserState.getState().loadUser,
    setPlugin: usePluginState.getState().setPlugin,
};
