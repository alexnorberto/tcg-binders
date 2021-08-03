import {Component, Input, OnInit} from '@angular/core';

import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-binder-page',
  templateUrl: './binder-page.component.html',
  styleUrls: ['./binder-page.component.css']
})
export class BinderPageComponent implements OnInit {

  cards = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep',
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  drop(event: CdkDragDrop<string[]>,column = null) {
    if(event.container.element.nativeElement.id.includes(column) && event.container.data.length+1 > 1){
      transferArrayItem(event.container.data, event.previousContainer.data, event.previousIndex, event.currentIndex);
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      return;
    }
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    console.log(this.bindersBlank);
  }

  @Input() userData;
  @Input() binderRow = 3;
  @Input() binderColumn = 3;
  binderGrid: Array<any>;
  bindersBlank = [];

  valueToArray(value){
    return Array(value);
  }
  constructor() {
    this.binderGrid = this.valueToArray((this.binderRow * this.binderColumn));
    for(let i = 0; i < this.binderRow * this.binderColumn; i++) {
      this.bindersBlank.push([]);
    }
  }

  ngOnInit(): void {
  }

}
