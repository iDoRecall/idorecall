import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { HttpResponse } from '../models';
import { NoticeService } from '../services';
import { getFragment } from '../utils/getFragment';
import { environment } from '../environments/environment';
import { usePluginState } from '../states/plugin';
import { useUserState } from '../states/user';
import { useRecallListState } from '../states/recall-list';

export class RestService {
    private static _instance: RestService;

    private readonly api: AxiosInstance = axios.create({
        baseURL: `${environment.serverURL}${environment.apiUrl}`,
    });

    constructor() {
        this.api.interceptors.request.use((config) => {
            config.headers.Authorization =
                usePluginState.getState().settings?.apiKey;
            return config;
        });

        this.api.interceptors.response.use(
            null,
            async (error: AxiosError): Promise<void> => {
                const status = error.response.status;

                if (status === 401) {
                    NoticeService.instance.notice(
                        'Please add the valid API key',
                    );

                    useUserState.getState().resetUser();
                    useRecallListState.getState().setRecallList([]);
                } else if (status === 402) {
                    NoticeService.instance.notice(
                        getFragment(
                            `Your current subscription limit for this operation is over <a href="https://app.idorecall.com/profile/subscription?skipUserPosition=true">I Do Recall subscription</a>`,
                        ),
                    );
                } else {
                    NoticeService.instance.notice(
                        getFragment(`<b>${'Error'}</b>, ${error.message}.`),
                    );
                }

                throw error;
            },
        );
    }

    public static get instance(): RestService {
        if (!RestService._instance) {
            RestService._instance = new RestService();
        }
        return RestService._instance;
    }

    public async get<T>(
        url: string,
        config?: AxiosRequestConfig<any> | undefined,
    ): Promise<T> {
        return await this.api
            .get<HttpResponse<T>>(url, config)
            .then(({ data }) => data)
            .then(({ data }) => data.payload);
    }

    public async post<T>(
        url: string,
        payload?: any,
        config?: AxiosRequestConfig<any> | undefined,
    ): Promise<T> {
        return await this.api
            .post<HttpResponse<T>>(url, payload, config)
            .then(({ data }) => data)
            .then(({ data }) => data.payload);
    }

    public async patch<T>(
        url: string,
        payload?: any,
        config?: AxiosRequestConfig<any> | undefined,
    ): Promise<T> {
        return await this.api
            .patch<HttpResponse<T>>(url, payload, config)
            .then(({ data }) => data)
            .then(({ data }) => data.payload);
    }

    public async delete<T>(
        url: string,
        config?: AxiosRequestConfig<any> | undefined,
    ): Promise<T> {
        return await this.api
            .delete(url, config)
            .then(({ data }) => data)
            .then(({ data }) => data.payload);
    }
}
