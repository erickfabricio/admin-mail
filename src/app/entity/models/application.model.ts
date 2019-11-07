import { EntityModel } from './entity.model';
import { TokenModel } from './token.model';

export class ApplicationModel extends EntityModel {

    static entity: string = "applications";
    
    name: string;
    contact: string;
    description: string;
    creationDate: Date;    
    state: string;
    tokens: TokenModel[];

}