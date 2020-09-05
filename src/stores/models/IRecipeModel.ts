export default interface IRecipeModel {
  id: string
  numberOfBalls : number
  doughWeight : number
  wantedHydration : number
  wantedSalt : number
  wantedFats : number
  temperature : number
  risingTime : number
  fridgeRisingTime : number
  grandmaPizza : boolean
}
