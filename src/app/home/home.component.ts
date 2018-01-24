import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  version: number;
  color: string;

  ngOnInit(): void {
    this.version = 1.0;
    this.color = 'blue';
  }

  toggleColor(): void {
    this.color = (this.color === 'blue') ? 'red' : 'blue' ;
  }

}

