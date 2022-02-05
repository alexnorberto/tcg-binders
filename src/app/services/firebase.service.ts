import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {CardItemModel} from "../shared/models/card-item.model";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private angularFirestore: AngularFirestore
  ) {
  }

  /**
   * Updates the user data on firestore
   * @param data
   */
  updateUser(data) {
    return this.angularFirestore.doc('users/' + data.email).update(data);
  }

  getUser(id) {
    return this.angularFirestore.collection('users').doc(id).valueChanges();
  }

  getAllUsers() {
    return this.angularFirestore.collection('users').valueChanges();
  }

  getUserCards(userId) {
    return this.angularFirestore.collection('users/' + userId + '/collections').doc(userId).valueChanges();
  }


  /***********************************************************
   *
   * CARDS ROOT
   *
   **********************************************************/

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

  /**
   * Adds cards to root cards collection on firestore;
   * Check if the card is already on the list before add
   * @param userId
   * @param cardList
   */
  setCards(userId, cardList: Array<CardItemModel>) {
    const cardsCollection = this.angularFirestore.collection('cards');
    let batch = this.angularFirestore.firestore.batch();

    cardList.forEach(card => {
      let cardRef = cardsCollection.doc(card.cardData.id).ref;
      batch.set(cardRef, card.cardData);
    });

    batch.commit().then(r => console.log("batch", r)).catch(e => console.log("batch error", e));
  }

  /**
   * Delete a card from firestore cards root collection
   * @param id
   */
  deleteCard(id) {
    this.angularFirestore.collection('cards').doc(id).delete()
      .then(r => console.log("deleteCard", r))
      .catch(e => console.log("deleteCard error", e));
  }

  /***********************************************************
   *
   * CARDS_COLLECTIONS
   *
   **********************************************************/

  /**
   * Set an array of cards to a collection. If no collectionId is passed, set the main-card-collection
   * @param userId current user
   * @param cardList cards to be set
   * @param collectionId collection id on firestore
   * @param collectionName collection name attribute
   */
  setCardsToCollection(userId, cardList: Array<CardItemModel>, collectionId = 'main-cards-collection', collectionName = 'All my cards') {
    this.angularFirestore.doc('users/' + userId + '/cards-collections/' + collectionId)
      .set({
        name: collectionName,
        cards: cardList
      }, {merge: false}).then(r => console.log("setCardsToUserCollection", r))
      .catch(e => console.log("setCardsToUserCollection error", e));
  }

  getCollectionById(userId, colId = 'main-cards-collection') {
    return this.angularFirestore.collection('users/' + userId + '/cards-collections').doc(colId).valueChanges();
  }

  getCollectionByName(userId, colName) {
    console.log(colName)
    return this.angularFirestore.collection('users/' + userId + '/cards-collections', ref => ref.where('name', '==', colName)).valueChanges();
  }

  getAllCollections(id) {
    return this.angularFirestore.collection('users/' + id + '/cards-collections').valueChanges();
  }

  addCollection(id, cardData = null) {

  }

  updateCollection(id, cardData = null) {

  }

  deleteCollection(id) {
  }


}
