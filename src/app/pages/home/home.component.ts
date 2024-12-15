import { Component } from '@angular/core';
import { ToolbarComponent } from "../shared/toolbar/toolbar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ToolbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  
}
