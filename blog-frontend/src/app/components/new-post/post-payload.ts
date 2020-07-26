import { Form } from '@angular/forms';

export class PostPayload {
    id: number;
    title: string;
    bodyText: string;
    user: any;
    dateCreated: Date;
    lastUpdated: Date;
}