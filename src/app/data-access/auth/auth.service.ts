import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { catchError, of, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthSerivce {

    private readonly http = inject(HttpClient);

    userProfile = signal<any>({})

    signIn(dto: any) {
        return this.http.post('auth/sign-in', dto, { withCredentials: true})
    }

    signUp(email: string, password: string, username: string) {
        const dto = {
            email, password, username
        }

        return this.http.post('sign-up', dto, { withCredentials: true})
    }

    checkAuthStatus() {
        return this.http.get('auth/profile', { withCredentials: true}).pipe(
            tap((res) => this.userProfile.set(res)),
            catchError(() => {
                this.userProfile.set({});
                return of(null)
            })
        )
    }

    getUserProfile() {
        return this.userProfile();
    }

    getUserId() {
        return this.userProfile()._id
    }
}