import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class SvenskaDictionaryService {
    private readonly http = inject(HttpClient)
    create(body: any) {
        return this.http.post('svenska-dictionaries', body, { withCredentials: true })
    }

    getAll(request: any): Observable<any> {
        return this.http.get<any>('svenska-dictionary/find-all', { params: { ...request }, withCredentials: true })
    }

    getOne(_id: string): Observable<any> {
        return this.http.get<any>('svenska-dictionaries/find-one', { params: { _id }, withCredentials: true })
    }
}