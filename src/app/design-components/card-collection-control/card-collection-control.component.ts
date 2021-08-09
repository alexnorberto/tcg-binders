import {Component, Input, OnInit, Output, EventEmitter, ViewChild, OnChanges} from '@angular/core';
import {UserDataModel} from "../../shared/models/user-data.model";
import {TcgApiService} from "../../services/tcg-api.service";
import {FirebaseService} from "../../services/firebase.service";
import {AngularFireAuth} from "@angular/fire/auth";
import {AuthService} from "../../services/auth.service";
import {UserDataService} from "../../services/user-data.service";
import {TcgCardModel} from "../../shared/models/tcg-card.model";
import {CardListModel} from "../../shared/models/card-list.model";

@Component({
  selector: 'app-card-collection-control',
  templateUrl: './card-collection-control.component.html',
  styleUrls: ['./card-collection-control.component.css']
})
export class CardCollectionControlComponent implements OnInit, OnChanges {

  /** Variable to save the start quantity for the current card and update it */
  @Input() quantity = 0;

  /** Card TCGCardModel */
  @Input() card: TcgCardModel;

  /** List of cards to add to user collection, where the selected cards will be added; items as { card: TCGCardModel, quantity: number }*/
  @Input() cardsList: Array<CardListModel> = [];

  /** Send back the list of cards */
  @Output() cardsListEmitter = new EventEmitter<any>();

  /**
   * Event to send to parent the updated card list to add
   */
  updateCardList() {
    console.log('updateCardList')
    this.cardsListEmitter.emit(this.cardsList);
  }

  /**
   * add a copy of the card to the card list
   */
  addToList(){
    let currentCard = {
      card: this.card,
      quantity: this.addOne(true)
    }
    let cardList = this.cardsList;
    let found = false;
    this.cardsList = cardList.map(card => {
      if(card.card.id == this.card.id) {
        found = true;
        return currentCard;
      }
      return card;
    });
    if (!found) {
      this.cardsList.push(currentCard);
    }
    this.updateCardList();
  }

  /**
   * remove a copy the card from the card list or remove it at all
   */
  removeFromList(){
    let currentCard = {
      card: this.card,
      quantity: this.addOne(false)
    }
    console.log("currentCard",currentCard);
    let cardList = this.cardsList;
    this.cardsList = cardList.filter(card => {
      if(card.card.id == this.card.id) {
        if(currentCard.quantity == 0) {
          return false;
        } else {
          if(card.quantity == 0) {
            return false;
          } else {
            card.quantity = currentCard.quantity;
            return true;
          }
        }
      }
      return true;
    });
    console.log("removeFromList",this.cardsList);
    this.updateCardList();
  }

  /**
   * increase or decrease the quantity for a card in the list
   * @param bool
   */
  addOne(bool){
    if(bool){
      this.quantity++;
      return this.quantity;
    } else {
      if(this.quantity > 0) {
        this.quantity--;
        return this.quantity;
      }
      return this.quantity;
    }
  }

  /**
   * Set the start value for quantity based on the card list
   * @param cardId
   */
  setQuantityFromCardList(cardId){
    this.cardsList.forEach(card => {
      if (cardId == card.card.id) {
        this.quantity = card.quantity;
      }
    })
  }

  constructor() {}

  ngOnInit(): void {
  }

  ngOnChanges() {
    if(!this.cardsList.length) {
      this.quantity = 0;
    }
    this.setQuantityFromCardList(this.card.id);
  }
}
