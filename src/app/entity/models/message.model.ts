import { EntityModel } from './entity.model';
import { AttachmentModel } from './attachment.model';

export class MessageModel extends EntityModel {

    to: string;
    cc: string;
    cco: string;
    subject: string;
    html: string;
    attachments: AttachmentModel[];

}