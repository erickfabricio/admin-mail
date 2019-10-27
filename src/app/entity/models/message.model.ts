import { EntityModel } from './entity.model';
import { AttachmentModel } from './attachment.model';

export class MessageModel extends EntityModel {
    	
    public to: string;
    public cc: string;
    public cco: string;
    public subject: string;
    public html: string;
    public attachments: AttachmentModel[];    

}