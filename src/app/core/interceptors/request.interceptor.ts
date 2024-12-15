import { HttpInterceptorFn } from '@angular/common/http';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('authToken');

  const authReq = token
    ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    : req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
      },
    });

  console.log('Request interceptor triggered - ', authReq);
  return next(authReq);
};
