import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthSerivce } from "../auth/auth.service";
import { Observable } from "rxjs";
import { EnglishSentenceCreateDto, EnglishSentenceListRequest, EnglishSentenceListResponse, EnglishSentenceUpdateDto } from "./dtos";

@Injectable({ providedIn: 'root' })
export class EnglishSentenceService {

    private readonly http = inject(HttpClient);

    create(body: EnglishSentenceCreateDto) {
        return this.http.post('english-sentences', body, {withCredentials: true })
    }

    update(body: EnglishSentenceUpdateDto) {
        return this.http.put('english-sentences', body, {withCredentials: true })

    }

    getAll(request: EnglishSentenceListRequest): Observable<EnglishSentenceListResponse> {
        return this.http.get<EnglishSentenceListResponse>('english-sentences/find-all', { params: {...request}, withCredentials: true})
    }
 
}