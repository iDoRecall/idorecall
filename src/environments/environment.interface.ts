export enum EnvironmentTypeEnum {
    LOCAL,
    DEVELOPMENT,
    DESKTOP,
    PRODUCTION,
    TEST,
}

export interface IEnvironment {
    apiUrl: string;
    froalaLicenseKey: string;
    serverURL: string;
    type: EnvironmentTypeEnum;
    version: string;
    appUrl: string;
    socket: Socket;
}
export interface Socket {
    url: string;
    token: string;
}

export interface OAuth {
    clientId: string;
    secret: string;
}
