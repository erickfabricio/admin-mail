import { EntityModel } from './entity.model';

export class UserModel extends EntityModel {

    static entity: string = "users";
        
    name: string;
    user: string;    
    mail: string;
    password: string;
    description: string;
    date: Date;
    state: string;

}