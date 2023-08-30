import { API_KEY_LENGTH } from '../constants/api-key-length';

export const isValidApiKey = (apiKey: string): boolean => {
    return apiKey?.length === API_KEY_LENGTH && apiKey.startsWith('idr');
};
