import { EntityModel } from './entity.model';

export class TokenModel extends EntityModel {

    static entity: string = "applications";
    
    token: string;
    payload: Date;
    creationDate: Date;
    seconds: string;
    key: string;
    state: string;
    
}