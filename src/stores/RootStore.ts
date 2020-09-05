import { flow } from 'mobx'
import Screens from './screens'
import UI from './ui'

export default class RootStore {
  public readonly screens : Screens
  public readonly ui : UI

  constructor() {
    this.ui = new UI(this)

    this.screens = new Screens(this)
  }

  /**
   * Load all cached data in all stores. This is first method run after app is boot.
   * If it returns true then splash screen is hidden
   * */
  public setup = flow(function * (this : RootStore) {

  }.bind(this))

  /**
   * After execution of this method, splash screen is always hidden. This method is run before restore
   * function, and should refresh access token and then start refreshing all data in background
   */
  public refresh = flow(function * (this : RootStore) {

  }.bind(this))

  /**
   * Cleanup all stores and their data
   */
  public clear = flow(function * (this : RootStore) {
    this.screens.clear()
  }.bind(this))
}