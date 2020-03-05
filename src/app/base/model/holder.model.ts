export interface HolderModel<T> {
    _items: T[];
    _links: any;
    _meta: {
        page: number;
        max_results: number;
        total: number;
    };
}