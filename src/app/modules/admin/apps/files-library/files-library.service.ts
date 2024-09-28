import { Injectable }  from '@angular/core';
import { BaseService } from '@core/interfaces/base-service.interface';
import { of }          from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FilesLibraryService implements BaseService<any> {

    constructor() { }

    findAll(): any {
        throw new Error('Method not implemented.');
    }

    findOne(id: string): any {
        // throw new Error('Method not implemented.');
        return of(undefined);
    }

    create(data: any): any {
        throw new Error('Method not implemented.');
    }

    update(data: any): any {
        throw new Error('Method not implemented.');
    }

    delete(id: string): any {
        throw new Error('Method not implemented.');
    }
}
