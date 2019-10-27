import { EntityModel } from './entity.model';
import { MessageModel } from './message.model';

export class NotificationModel extends EntityModel {

    public _id: string;
    public product: string;
    public creationDate: Date;
	public sentDate: Date;
	public state: string;
    public menssage: MessageModel;
    
}