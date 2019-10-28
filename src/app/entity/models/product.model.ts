import { EntityModel } from './entity.model';

export class ProductModel extends EntityModel {

    static entity: string = "products";
    
    service: string;
    name: string;
    user: string;
    domain: string;
    mail: string;
    password: string;
    description: string;
    date: Date;
    state: string;

}