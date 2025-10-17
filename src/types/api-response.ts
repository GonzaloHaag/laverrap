export type ApiResponse<T> = {
    /** T es un tipo generico! */
    ok:boolean;
    message:string;
    data?: T;
    totalPages?: number;
}