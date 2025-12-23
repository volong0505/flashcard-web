import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { catchError, Observable, map, of, tap, take } from "rxjs";
import { AuthSerivce } from "../data-access/auth/auth.service";

export const authGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    const authService = inject(AuthSerivce);
    const router = inject(Router)
    
    return authService.checkAuthStatus().pipe(
        take(1), // Take the first value, then close stream
        map(isAuthenticated => {
            if (isAuthenticated) {
                return true;
            } else {
                return router.createUrlTree(['/login'])
            }
        }),
        catchError(() => {
            return of(router.createUrlTree(['/error']))
        })
    )
    
}
