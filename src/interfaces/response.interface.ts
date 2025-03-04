export interface ApiResponse<T> {
    status: string;
    timestamp: string;
    data: T;
}