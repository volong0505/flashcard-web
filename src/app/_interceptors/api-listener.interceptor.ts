import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap, finalize, map } from 'rxjs';
import { AppLogsStore } from '../data-access/app-logs/app-logs.store';

export const apiListenerInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(AppLogsStore);

  store.setLoading(true);

 return next(req).pipe(
    map((event) => {
      if (req.responseType === 'blob') {
        return event;
      }

      // Chỉ xử lý nếu event là HttpResponse
      if (event instanceof HttpResponse) {
        const body = event.body as any;

        // 1. Lưu message và status vào Global Signal Store
        if (body && body.message) {
          store.addLog({status: body.status, log: body.message});
        }

        // 2. "Lọc" lại response: Trả về một bản sao HttpResponse mới nhưng body chỉ là trường 'data'
        return event.clone({
          body: body?.data !== undefined ? body.data : body
        });
      }
      return event;
    }),
    tap({
      error: (err) => {
        // Xử lý lỗi toàn cục nếu cần
        if (err.status === 200 && err.url?.includes('speak')) {
         console.warn('Phát hiện dữ liệu Binary nhưng bị lỗi Parse, hãy kiểm tra responseType');
      }

        console.error('API Error:', err);
      }
    }),
    // Kết thúc request (loading = false)
    // Dùng finalize ở cuối cùng của chuỗi pipe
    finalize(() => store.setLoading(false)) 
  );
};