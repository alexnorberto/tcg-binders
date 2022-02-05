import {Component, Input, OnInit, Output, EventEmitter, ViewChild, OnChanges} from '@angular/core';
import {UserDataModel} from "../../shared/models/user-data.model";
import {TcgApiService} from "../../services/tcg-api.service";
import {FirebaseService} from "../../services/firebase.service";
import {AngularFireAuth} from "@angular/fire/auth";
import {AuthService} from "../../services/auth.service";
import {UserDataService} from "../../services/user-data.service";
import {TcgCardModel} from "../../shared/models/tcg-card.model";
import {CardItemModel} from "../../shared/models/card-item.model";
import {CardCollectionControlManager} from "./card-collection-control.manager";

@Component({
  selector: 'app-card-collection-control',
  templateUrl: './card-collection-control.component.html',
  styleUrls: ['./card-collection-control.component.css'],
  providers: [CardCollectionControlManager]
})
export class CardCollectionControlComponent implements OnInit, OnChanges {

  /**
   * User cards collection
   */
  @Input() userMainCardsCollection = [];

  /**
   * Card TCGCardModel
   */
  @Input() card: TcgCardModel;

  timeout = 1500;

  timer;

  /**
   * Remove a copy the card from the card list or remove it at all
   */
  addToList(isToAdd) {
    if (!(!isToAdd && this.card.quantity == 0)){
      this.addOne(isToAdd);
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.manager.addCardsToMainCardsCollection([this.card])
      }, this.timeout)
    }
  }

  /**
   * increase or decrease the quantity for a card in the list
   * @param bool
   */
  addOne(bool) {
    if (bool) {
      this.card.quantity++;
    } else {
      this.card.quantity--;
    }
    return this.card.quantity;
  }

  constructor(private manager: CardCollectionControlManager) {
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
  }
}
