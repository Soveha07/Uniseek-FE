export interface ApiResponse<T> {
    status: number;
    timestamp: string;
    data: T;
}