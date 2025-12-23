import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EnglishLearningVocabularyDto, GetEnglishFlashcardRequest } from "./dtos";

@Injectable({providedIn: 'root'})
export class EnglishLearningService {
    private readonly http = inject(HttpClient);

    getVocabulary(params: GetEnglishFlashcardRequest): Observable<EnglishLearningVocabularyDto>  {
        return this.http.get<EnglishLearningVocabularyDto>('english-flashcard/flashcard', {params: {...params}, withCredentials: true})

    }
}