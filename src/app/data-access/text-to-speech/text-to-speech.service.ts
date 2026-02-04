import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TextToSpeechService {
    private readonly http = inject(HttpClient);

    getAudio(text: string): Observable<Blob> {
        return this.http.get('speak', { params: {text}, responseType: 'blob', withCredentials: true})
    }
}