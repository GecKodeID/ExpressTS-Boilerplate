export interface QueryId {
    id: string;
}

export interface Query {
    search?: string;
    search_by?: string;
    page?: number;
    limit?: number;
    sort?: string;
    sort_by?: string;
}