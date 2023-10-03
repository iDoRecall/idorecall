import { requestUrl } from 'obsidian';

import { useUserState } from '../states/user';
import { usePluginState } from '../states/plugin';
import { useRecallListState } from '../states/recall-list';

import { BASE_URL } from './constants';
import { NoticeService } from '../services';
import { getFragment } from '../utils/getFragment';
import { ErrorWithStatus, HttpMethodType } from './models';

export class RestService {
    private static _instance: RestService;

    public static get instance(): RestService {
        if (!RestService._instance) {
            RestService._instance = new RestService();
        }
        return RestService._instance;
    }

    public async requestWrapper<T>(
        url: string,
        method: HttpMethodType,
        payload?: object,
    ): Promise<T> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: usePluginState.getState().settings?.apiKey,
        };

        try {
            const httpResponse = await requestUrl({
                url: `${BASE_URL}/${url}`,
                method,
                headers,
                body: JSON.stringify(payload),
            });

            const response = httpResponse.json;

            return response.data.payload;
        } catch (error) {
            this.handleError(error);
        }
    }

    private handleError(error: ErrorWithStatus): void {
        const status = error.status;

        switch (status) {
            case 401:
                NoticeService.instance.notice('Please add the valid API key');

                useUserState.getState().resetUser();
                useRecallListState.getState().setRecallList([]);
                break;
            case 402:
                NoticeService.instance.notice(
                    getFragment(
                        `Your current subscription limit for this operation is over <a href="https://app.idorecall.com/profile/subscription?skipUserPosition=true">I Do Recall subscription</a>`,
                    ),
                );
                break;
            default:
                NoticeService.instance.notice(
                    getFragment(`<b>${'Error'}</b>, ${error.message}.`),
                );
                break;
        }
    }
}
