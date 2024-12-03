import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { IpInfoService } from '../../pages/shared/ip-info.service';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('authToken');
  const router = inject(Router);
  const dialog = inject(MatDialog);
  const ipInfoService = inject(IpInfoService);

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
