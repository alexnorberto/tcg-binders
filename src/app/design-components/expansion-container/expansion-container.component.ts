import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expansion-container',
  templateUrl: './expansion-container.component.html',
  styleUrls: ['./expansion-container.component.css']
})
export class ExpansionContainerComponent implements OnInit {

  panelOpenState = true;

  constructor() { }

  ngOnInit(): void {
  }

}
