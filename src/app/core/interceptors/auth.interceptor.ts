import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authReq = req.clone({
    withCredentials: true,
    setHeaders: {
      'Content-Type': 'application/json'
    },
  });

  console.log('Auth interceptor triggered - ', authReq);
  return next(authReq);
};
