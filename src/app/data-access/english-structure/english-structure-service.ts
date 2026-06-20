import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class EnglishStructureService {
    private readonly http = inject(HttpClient)
   
    create(body: any) {
            return this.http.post('english-dictionaries', body, {withCredentials: true })
        }
    
    getAll(request: any): Observable<any> {
            return this.http.get('english-dictionaries/find-all', { params: {...request}, withCredentials: true})
        }
}