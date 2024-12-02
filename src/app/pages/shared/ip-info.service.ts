import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IpInfoService {

  private readonly router = inject(Router)
  // use this to store and manipulate things related to ip and network things
  baseUrlSignal = signal('');

  checkIp() { // this is used to send the user back to ip selection if there is no ip info
    if (!this.baseUrlSignal()) {
      console.warn("No IP! Redirecting to IP selection screen")
      this.router.navigate([""]);
    }
  }
}
