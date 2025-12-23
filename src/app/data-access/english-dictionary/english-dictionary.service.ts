import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthSerivce } from "../auth/auth.service";
import { Observable } from "rxjs";
import { EnglishDictionaryCreateDto, EnglishDictionaryListRequest, EnglishDictionaryListResponse } from "./dtos";

@Injectable({ providedIn: 'root' })
export class EnglishDictionaryService {

    private readonly http = inject(HttpClient);
    private readonly authService = inject(AuthSerivce);

    create(body: EnglishDictionaryCreateDto) {
        return this.http.post('english-dictionaries', body, {withCredentials: true })
    }

    getAll(request: EnglishDictionaryListRequest): Observable<EnglishDictionaryListResponse> {
        return this.http.get<EnglishDictionaryListResponse>('english-dictionaries/find-all', { params: {...request}, withCredentials: true})
    }
 
}