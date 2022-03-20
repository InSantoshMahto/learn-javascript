import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fragment';

  constructor(private router: Router) {
  }

  onMove(id: string, ...paths: string[]){
    this.router.navigate(paths, {fragment: id}).finally()
  }
}
