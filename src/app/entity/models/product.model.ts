import { EntityModel } from './entity.model';

export class ProductModel extends EntityModel {

    static entity: string = "products";
    
    public _id : string;
    public service : string;
    public name : string;
    public user : string;
    public domain : string;
    public mail : string;
    public password : string;
    public description : string;
    public date : Date;
    public state : string;
    
    public toString(): String {
        return "id:" + this._id;
    }

}