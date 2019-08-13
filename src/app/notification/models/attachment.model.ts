import { DeserializeInterface } from './deserialize.interface';

export class AttachmentModel implements DeserializeInterface {

    public _id: string;
    public path: string;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
    
}
