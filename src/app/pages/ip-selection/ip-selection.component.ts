import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { IpInfoService } from '../shared/ip-info.service';
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
  private readonly ipInfo = inject(IpInfoService);
  baseUrlSignal = this.ipInfo.baseUrlSignal;

  ipForm = this.fb.group({
    ip: ['localhost', Validators.required],
    port: [22222, Validators.required],
  });

  async submit() {
    const ip = this.ipForm.get("ip")?.value;
    const port = this.ipForm.get("port")?.value;
    const baseUrl = `http://${ip}:${port}`;
    this.baseUrlSignal.set(baseUrl);
    console.log("baseUrl set: ", this.baseUrlSignal());
    this.router.navigate(["/auth"]);
  }

  ngOnInit() {
    localStorage.clear();
  }
}
