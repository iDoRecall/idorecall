import { EnvironmentTypeEnum, IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    froalaLicenseKey:
        'Ig1A7vB2A1B1D2D1H5mEZXQUVJe1EZb1IWIAUKLJZMBQuF2C1G1F1A10C1D7A1D6E5==',
    serverURL: 'https://dev-node.idorecall.com',
    apiUrl: '/api/v1',
    type: EnvironmentTypeEnum.DEVELOPMENT,
    version: 'DEV',
    appUrl: 'https://dev.idorecall.com',
    socket: {
        url: 'https://socket-dev.idorecall.com',
        token: '7h2bAGjCV7nh2yARaXt6z8JZ',
    },
};
