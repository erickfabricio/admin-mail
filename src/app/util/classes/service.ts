import { environment } from 'src/environments/environment';

export abstract class Service {

    private api: string;
    
    constructor(private entity: string) {
        this.api = `${environment.api}/${this.entity}`
    }

}
