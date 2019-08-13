import { DeserializeInterface } from './deserialize.interface';
import { MessageModel } from './message.model';

export class NotificationModel implements DeserializeInterface {

    public _id: string;
    public product: string;
    public creationDate: Date;
	public sentDate: Date;
	public state: string;
    public menssage: MessageModel;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
    
}
