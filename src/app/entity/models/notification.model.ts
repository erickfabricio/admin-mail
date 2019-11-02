import { EntityModel } from './entity.model';
import { MessageModel } from './message.model';

export class NotificationModel extends EntityModel {

    static entity: string = "notifications";

    _id: string;
    product: string;
    creationDate: Date;
    sentDate: Date;
    state: string;
    menssage: MessageModel;

}