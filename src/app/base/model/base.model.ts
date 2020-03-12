export class BaseModel {
    id: number;
    _created: Date;
    _updated: Date;
    _etag: string;
    _links: {
        parent: {
            title: string;
            href: string;
        };
        self: {
            title: string;
            href: string;
        };
        collection: {
            title: string;
            href: string;
        };
    }
}