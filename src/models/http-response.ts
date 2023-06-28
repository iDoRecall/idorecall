interface Data<T> {
    payload: T;
    warnings: any | null;
}

export interface HttpResponse<T = any> {
    success: boolean;
    message: string;
    errors: any | null;
    data: Data<T>;
}
