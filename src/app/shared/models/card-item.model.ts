import {TcgCardModel} from "./tcg-card.model";

export class CardItemModel {
  id: string;
  quantity: number;
  quantityOnUserMainCollection?: number;
  cardData?: TcgCardModel;
}

export class FirestoreCardItem {
  id: string;
  quantity: number;
}
