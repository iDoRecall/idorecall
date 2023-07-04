import { useUserState } from './user';
import { usePluginState } from './plugin';

// TODO: do something with this service
export const statesFacade = {
    loadUser: useUserState.getState().loadUser,
    setPlugin: usePluginState.getState().setPlugin,
};
