import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthSerivce } from "../auth/auth.service";
import { Observable } from "rxjs";
import { EnglishDictionaryCreateDto, EnglishDictionaryDetailRequest, EnglishDictionaryDetailResponse, EnglishDictionaryListRequest, EnglishDictionaryListResponse } from "./dtos";
import { EnglishDictionaryGetOptionsRequest, EnglishDictionaryGetOptionsResponse } from "./dtos/get-options";

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

    getOne(_id: string): Observable<EnglishDictionaryDetailResponse> {
        return this.http.get<EnglishDictionaryDetailResponse>('english-dictionaries/find-one', { params: {_id}, withCredentials: true})
    }

    getOptions(request: EnglishDictionaryGetOptionsRequest): Observable<EnglishDictionaryGetOptionsResponse> {
        return this.http.get<EnglishDictionaryGetOptionsResponse>('english-dictionaries/get-options', { params: {...request}, withCredentials: true})
    }
 
}