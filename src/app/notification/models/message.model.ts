import { DeserializeInterface } from './deserialize.interface';
import { AttachmentModel } from './attachment.model';

export class MessageModel implements DeserializeInterface {
    	
    public to: string;
    public cc: string;
    public cco: string;
    public subject: string;
    public html: string;
    public attachments: AttachmentModel[]
    
    deserialize(input: any): this {
        return Object.assign(this, input);
    }

}
