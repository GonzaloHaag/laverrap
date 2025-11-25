export type ServiceResponse<T> =  {
    ok: boolean;
    message: string;
    data: T;
    errors?: Record<string, string>;
}