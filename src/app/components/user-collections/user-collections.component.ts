import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Observable, Observer} from "rxjs";
import {FormControl} from "@angular/forms";
import {UserDataModel} from "../../shared/models/user-data.model";
import {FirebaseService} from "../../services/firebase.service";
import {UserDataService} from "../../services/user-data.service";


@Component({
  selector: 'app-user-collections',
  templateUrl: './user-collections.component.html',
  styleUrls: ['./user-collections.component.css']
})
export class UserCollectionsComponent implements OnInit, OnChanges, AfterViewInit {

  userData = new UserDataModel();
  cardsByCollection = [];
  /**
   * Content for the mat-tabs
   */
  //collectionsList = [];
  selected = new FormControl(0);
  newCollectionName = new FormControl('');

  addTab(tabName, selectAfterAdding: boolean) {
    if (tabName != "") {
      this.addCollectionToUserData(tabName);
      if (selectAfterAdding) {
        this.selected.setValue(this.cardsByCollection.length - 1);
      }
    }
  }

  addCollectionToUserData(collectionName) {
    let collection = {
      name: collectionName,
      binders: [],
      cards: []
    }
    console.log(this.userData);
    let collections = this.userData.collections;
    collections.push(collection);
    this.firebaseService.updateUser(this.userDataService.setUserData(this.userData, null, null, null, collections));
  }

  removeTab(tabName, index: number) {
    this.cardsByCollection.splice(index, 1);
    this.removeCollectionFromUserData(tabName);
  }

  removeCollectionFromUserData(collectionName) {

  }

  setCardsByCollection() {
    let cardsByCollection = [];
    let userDataCards = this.userData.cards;
    let userDataCollections = this.userData.collections;
    userDataCollections.forEach(collection => {
      let col = {
        name: collection.name,
        cards: [],
        binders: []
      }
      userDataCards.forEach(card => {
        if(card.collections != null){
          card.collections.forEach(cardCollection => {
            if(collection.name == cardCollection.collection){
              for(let i = 0; i < cardCollection.quantity; i++) {
                col.cards.push(card);
              }
            }
          });
        }
      });
      cardsByCollection.push(col);
    });
    this.cardsByCollection = cardsByCollection;
    console.log("cardsByCollection",cardsByCollection);
  }

  constructor(
    private firebaseService: FirebaseService,
    private userDataService: UserDataService
  ) {

  }

  ngOnInit(): void {
    this.userDataService.currentUserData
      .subscribe(user => {
        if(user.collections){
          this.userData = user;
          this.setCardsByCollection();
        }
      });
  }

  ngOnChanges() {
    //this.updateCollectionsList(this.collectionsList);
  }

  ngAfterViewInit() {
    //this.updateCollectionsList(this.collectionsList);
  }

}
