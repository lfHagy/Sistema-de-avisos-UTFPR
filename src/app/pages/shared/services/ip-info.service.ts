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
      const foundBaseUrl = localStorage.getItem("baseUrl"); // check if there is an url available in local storage
      if (foundBaseUrl) {
        this.baseUrlSignal.set(foundBaseUrl); // we need to use a signal to avoid sending extra data in the request url
        return true;
      } else { 
        console.warn("No IP! Redirecting to IP selection screen")
        this.router.navigate(["ip"]);
        return false;
      }
    }
    return true;
  }
}
