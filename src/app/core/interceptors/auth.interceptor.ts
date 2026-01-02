import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Interceptor que añade el header Authorization con el token guardado en localStorage, si existe.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authReq);
};

