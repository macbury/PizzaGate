import { action } from 'mobx'
import CalculatorStore from './CalculatorStore'
import ShowRecipeStore from './ShowRecipeStore'

/**
 * Stores used only by assigned screen
 */
export default class Screens {
  public calculator : CalculatorStore
  public showRecipe : ShowRecipeStore

  constructor(rootStore) {
    this.calculator = new CalculatorStore(rootStore)
    this.showRecipe = new ShowRecipeStore(rootStore)
  }

  @action
  public clear() {
    this.showRecipe.clear()
    this.calculator.clear()
  }
}