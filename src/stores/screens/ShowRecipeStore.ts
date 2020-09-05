import { observable, action, computed } from 'mobx'
import bind from 'bind-decorator'
import { decode as atob } from 'base-64'
import { decode, isUrlSafeBase64 } from 'url-safe-base64'
import { NonPersistableStore } from '../core/SubStore'
import IRecipeModel from '../models/IRecipeModel'
import CalculatorStore from './CalculatorStore'

export default class ShowRecipeStore extends NonPersistableStore {
  @observable
  public recipe : CalculatorStore

  @bind
  @action
  public load(serializedRecipe : string) {
    if (isUrlSafeBase64(serializedRecipe)) {
      const recipeModel : IRecipeModel = JSON.parse(atob(decode(serializedRecipe)))
      console.log('recipeModel', recipeModel)
      this.recipe = new CalculatorStore(this.root)
      this.recipe.load(recipeModel)
    }
  }

  @bind
  @action
  public clear() {
    this.recipe.clear()
    this.recipe = null
  }
}