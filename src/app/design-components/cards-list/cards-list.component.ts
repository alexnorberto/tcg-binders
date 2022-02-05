import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CardItemModel} from "../../shared/models/card-item.model";
import {FormControl} from "@angular/forms";
import {TcgCardModel} from "../../shared/models/tcg-card.model";

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.css']
})
export class CardsListComponent implements OnInit {

  /** Variable to storage the list of searched items from api */
  @Input() searchList: Array<TcgCardModel> = [];

  @Input() isLoggedUser = false;

  @Input() userMainCardsCollection = [];

  constructor() { }

  ngOnInit(): void {
  }

}
