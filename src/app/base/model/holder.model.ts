export class HolderModel<T> {
    _items: T[];
    _links: {
        parent: {
            title: string;
            href: string;
        },
        last: {
            title: string;
            href: string;
        },
        next: {
            title: string;
            href: string;
        },
        prev: {
            title: string;
            href: string;
        }
        self: {
            title: string;
            href: string;
        }
    };
    _meta: {
        page: number;
        max_results: number;
        total: number;
    };
}