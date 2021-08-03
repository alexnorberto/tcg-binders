export class TcgCardModel {
  collections: Array<{ collection: string, quantity: number }>
  quantity: number
  id: string
  name: string
  supertype: string
  subtypes: Array<string>
  level: string
  hp: number
  types: Array<string>
  evolvesFrom: string
  evolvesTo: Array<string>
  rules_list:Array<string>
  ancientTrait: Object
  abilities:Array<any>
  attacks:Array<any>
  weaknesses:Array<any>
  resistances:Array<any>
  retreatCost:Array<string>
  convertedRetreatCost: number
  set: any
  number: string
  artist: string
  rarity: string
  flavorText: string
  nationalPokedexNumbers: Array<number>
  legalities: any
  images: any
  tcgplayer: any
}
