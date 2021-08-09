import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {CardListModel} from "../shared/models/card-list.model";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private angularFirestore: AngularFirestore
  ) {
  }


  updateUser(data) {
    return this.angularFirestore.doc('users/' + data.email).update(data);
  }


  /************************************/

  getUser(id) {
    return this.angularFirestore.collection('users').doc(id).valueChanges();
  }

  getAllUsers() {
    return this.angularFirestore.collection('users').valueChanges();
  }

  getUserCards(userId) {
    return this.angularFirestore.collection('users/' + userId + '/collections').doc(userId).valueChanges();
  }

  /** CARDS **/

  getCard(id) {
    return this.angularFirestore.collection('cards').doc(id).valueChanges();
  }

  getAllCards() {
    return this.angularFirestore.collection('cards').valueChanges();
  }

  setCard(card) {
    this.angularFirestore.collection('cards').doc(card.id).set(card)
      .then(r => console.log("setCard", r))
      .catch(e => console.log("setCard error", e));
  }

  setMultipleCards(userId, cardList:Array<CardListModel>) {
    const cardsCollection = this.angularFirestore.collection('cards');
    let batch = this.angularFirestore.firestore.batch();

    cardList.forEach(card => {
      let cardRef = cardsCollection.doc(card.card.id).ref;
      batch.set(cardRef, card.card);
    });

    batch.commit().then(r => console.log("batch", r)).catch(e => console.log("batch error", e));
  }

  updateCard(card) {
    return this.angularFirestore.collection('cards').doc(card.id).update(card)
      .then(r => {
        return r
      })
      .catch(error => {
        return error
      });
  }

  deleteCard(id) {
    this.angularFirestore.collection('cards').doc(id).delete()
      .then(r => console.log("deleteCard", r))
      .catch(e => console.log("deleteCard error", e));
  }

  /** COLLECTIONS **/

  setCardsToUserCollection(userId, cardList, collectionId = userId, collectionName = 'My Collection') {
    const collectionsCollection = this.angularFirestore.doc('users/' + userId + '/collections/' + collectionId);
    collectionsCollection.set({
      name: collectionName,
      cards: cardList
    },{merge: true}).then(r => console.log("setCardsToUserCollection", r))
      .catch(e => console.log("setCardsToUserCollection error", e));
  }


  getCollectionById(userId, colId) {
    return this.angularFirestore.collection('users/' + userId + '/collections').doc(colId).valueChanges();
  }

  getCollectionByName(userId, colName) {
    console.log(colName)
    return this.angularFirestore.collection('users/' + userId + '/collections', ref => ref.where('name', '==', colName)).valueChanges();
  }

  getAllCollections(id) {
    return this.angularFirestore.collection('users/' + id + '/collections').valueChanges();
  }

  addCollection(id, cardData = null) {

  }

  updateCollection(id, cardData = null) {

  }

  deleteCollection(id) {
  }


}
