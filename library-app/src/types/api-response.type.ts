export type ApiResponse<T> = {
    success: boolean; 
    message: string; 
    data: T
}; 

export type PaginationMeta = {
    page: number; 
    limit: number; 
    total: number; 
    totalPage: number; 
}

export type PaginatedApiResponse<T> = ApiResponse<T> & {
    meta: PaginationMeta
}