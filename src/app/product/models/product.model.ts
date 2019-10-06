import { DeserializeInterface } from './deserialize.interface';

export class ProductModel implements DeserializeInterface {
    
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
    
    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    public toString(): String {
        return "id:" + this._id;
    }

}
