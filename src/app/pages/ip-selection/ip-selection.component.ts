import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ip-selection',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatInput],
  templateUrl: './ip-selection.component.html',
  styleUrl: './ip-selection.component.css',
})
export class IpSelectionComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  ipForm = this.fb.group({
    ip: ['http://localhost', Validators.required],
    port: [3000, Validators.required],
  });

  async submit() {
    try {
      let ip = this.ipForm.get('ip')?.value || '';
      let port = this.ipForm.get('port')?.value || '';
  
      ip = ip.replace(/["']/g, '').trim();
      port = port.toString().replace(/["']/g, '').trim();
  
      const baseUrl = `${ip}:${port}`;
      console.log('Set ip: ', baseUrl);
      localStorage.removeItem('baseUrl');
      localStorage.setItem('baseUrl', baseUrl);
      this.router.navigate(["auth"]);
    } catch (error) {
      console.error('Could not set ip: ', error);
    }
  }

  ngOnInit() {
    localStorage.clear();
  }
}
