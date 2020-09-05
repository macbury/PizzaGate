import { observable, action, computed } from 'mobx'
import bind from 'bind-decorator'
import uuid from 'uuid'
import { encode } from 'url-safe-base64'
import { encode as btoa } from 'base-64'
import IRecipeModel from '../models/IRecipeModel'
import { NonPersistableStore } from '../core/SubStore'

export const MAX_HYDRATION = 80
export const MIN_HYDRATION = 40

export const MIN_DOUGH_WEIGHT = 200
export const MAX_DOUGH_WEIGHT = 400

export const MIN_TEMPERATURE = 15
export const MAX_TEMPERATURE = 35

export const MIN_SALT = 0
export const MAX_SALT = 70

export const MIN_FAT = 0
export const MAX_FAT = 150

export const MIN_RISING_TIME = 3
export const MAX_RISING_TIME = 96

export const MIN_FRIDGE_TIME = 0
export const MAX_FRIDGE_TIME = 24

function clamp(rawValue : string, min : number, max : number) {
  const value = parseInt(rawValue) || 0

  if (value > max) {
    return max
  } else if (value < min) {
    return min
  } else {
    return value
  }
}

/**
 * Calculate ingredients required for pizza preparation
 * logic based on https://www.laconfraternitadellapizza.net/calcolapizza/
 */
export default class CalculatorStore extends NonPersistableStore implements IRecipeModel {
  @observable
  public id : string
  @observable
  public numberOfBalls : number// sztk
  @observable
  public doughWeight : number//  g
  @observable
  public wantedHydration : number// %
  @observable
  public wantedSalt : number// g/L
  @observable
  public wantedFats : number// g/L
  @observable
  public temperature : number // C
  @observable
  public risingTime : number// hours
  @observable
  public fridgeRisingTime : number //hours
  @observable
  public grandmaPizza : boolean

  constructor(root) {
    super(root)
    this.clear()
  }

  @computed
  public get hydration() {
    return this.wantedHydration
  }

  @computed
  public get flour() {
    return Math.round(Math.pow(10, 5) * this.totalDoughWeight / this.C)
  }

  @computed
  public get water() {
    return Math.round((Math.pow(10, 3) * this.wantedHydration * this.totalDoughWeight) / this.C);
  }

  @computed
  public get yeast() {
    return Math.round(this.flour * this.h * 100.0) / 100.0;
  }

  @computed
  public get dryYeast() {
    return Math.round((this.yeast / 3.0) * 100.0) / 100.0;
  }

  @computed
  public get salt() {
    return Math.round((this.wantedSalt * this.hydration * this.totalDoughWeight) / this.C);
  }

  @computed
  public get fats() {
    return Math.round((this.wantedFats * this.hydration * this.totalDoughWeight) / this.C);
  }

  @computed
  private get totalDoughWeight() {
    return this.numberOfBalls * this.doughWeight
  }

  @computed
  private get c() {
    return this.risingTime - 9 * this.fridgeRisingTime / 10.0
  }

  @computed
  private get fatsAndSaltPerLiter() {
    return this.wantedFats + this.wantedSalt
  }

  @computed
  private get C() {
    return (this.wantedHydration * this.fatsAndSaltPerLiter) + 1000.0 * (this.wantedHydration + 100.0)
  }

  @computed
  private get n() {
    if (this.grandmaPizza) {
      return this.temperature * (1.0 - 0.25 * 1.0)
    } else {
      return this.temperature * (1.0 - 0.25 * 0.0)
    }
  }

  @computed
  private get h() {
    return 2250.0 *
      (1.0 + this.wantedSalt / 200.0) *
      (1.0 + this.wantedFats / 300.0) /
      (
        (4.2 * this.wantedHydration - 80 - 0.0305 * Math.pow(this.wantedHydration, 2)) *
        Math.pow(this.n, 2.5) *
        Math.pow(this.c, 1.2)
      );
  }

  @computed
  public get recipe() : IRecipeModel {
    const {
      numberOfBalls,
      doughWeight,
      wantedHydration,
      wantedSalt,
      wantedFats,
      temperature,
      risingTime,
      fridgeRisingTime,
      grandmaPizza,
      id
    } = this

    return {
      id,
      numberOfBalls,
      doughWeight,
      wantedHydration,
      wantedSalt,
      wantedFats,
      temperature,
      risingTime,
      fridgeRisingTime,
      grandmaPizza
    }
  }


  @bind
  @action
  public load(recipe : IRecipeModel) {
    const {
      numberOfBalls,
      doughWeight,
      wantedHydration,
      wantedSalt,
      wantedFats,
      temperature,
      risingTime,
      fridgeRisingTime,
      grandmaPizza,
      id
    } = recipe

    this.numberOfBalls = numberOfBalls
    this.doughWeight = doughWeight
    this.wantedHydration = wantedHydration
    this.wantedSalt = wantedSalt
    this.wantedFats = wantedFats
    this.temperature = temperature
    this.risingTime = risingTime
    this.fridgeRisingTime = fridgeRisingTime
    this.grandmaPizza = grandmaPizza
    this.id = id
  }

  @computed
  public get serializedRecipe() {
    return encode(btoa(JSON.stringify(this.recipe)))
  }

  @bind
  @action
  public setNumberOfBalls(newNumberOfBalls : string) {
    this.numberOfBalls = clamp(newNumberOfBalls, 3, 20)
  }

  @bind
  @action
  public setDoughWeight(newDoughWeight : string) {
    this.doughWeight = clamp(newDoughWeight, MIN_DOUGH_WEIGHT, MAX_DOUGH_WEIGHT)
  }

  @bind
  @action
  public setWantedHydration(wantedHydration : string) {
    this.wantedHydration = clamp(wantedHydration, MIN_HYDRATION, MAX_HYDRATION)
  }

  @bind
  @action
  public setWantedSalt(wantedSalt : string) {
    this.wantedSalt = clamp(wantedSalt, MIN_SALT, MAX_SALT)
  }

  @bind
  @action
  public setGrandmaPizza(grandmaPizza : boolean) {
    this.grandmaPizza = grandmaPizza
  }

  @bind
  @action
  public setWantedFats(wantedFats : string) {
    this.wantedFats = clamp(wantedFats, MIN_FAT, MAX_FAT)
  }

  @bind
  @action
  public setTemperature(temperature : string) {
    this.temperature = clamp(temperature, MIN_TEMPERATURE, MAX_TEMPERATURE)
  }

  @bind
  @action
  public setRisingTime(risingTime : string) {
    this.risingTime = clamp(risingTime, MIN_RISING_TIME, MAX_RISING_TIME)
  }

  @bind
  @action
  public setFridgeRisingTime(fridgeRisingTime : string) {
    this.fridgeRisingTime = clamp(fridgeRisingTime, MIN_FRIDGE_TIME, MAX_FRIDGE_TIME)
  }

  @bind
  @action
  public clear(): void {
    this.id = uuid()
    this.numberOfBalls = 4
    this.doughWeight = 200
    this.wantedHydration = 65.0
    this.wantedSalt = 50
    this.wantedFats = 0
    this.temperature = 20
    this.risingTime = 24
    this.fridgeRisingTime = 0
  }
}