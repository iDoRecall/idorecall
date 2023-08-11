import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { environment } from '../environments/environment';
import { usePluginState } from '../states/plugin';
import { HttpResponse } from '../models';
import { NoticeService } from '../services';
import { getFragment } from '../utils/getFragment';

export class RestService {
    private static _instance: RestService;
    private readonly api = axios.create({
        baseURL: `${environment.serverURL}${environment.apiUrl}`,
        headers: {
            Authorization: usePluginState.getState().settings?.apiKey,
        },
    });

    constructor() {
        this.api.interceptors.response.use(
            null,
            async (error: AxiosError): Promise<void> => {
                if (error.response.status === 402) {
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
