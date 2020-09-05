import AsyncStorage from '@react-native-community/async-storage'
import { observable, computed, runInAction } from 'mobx'
import { StoreState } from './types'
import RootStore from '../RootStore'
import i18n from '../../config/i18n'

export const KEY_NAMESPACE = '@PizzaGate'

export abstract class SubStore<BundleType> {
  @observable
  protected readonly i18n = i18n
  @observable
  protected readonly root : RootStore
  /**
   * Defines in what state is store:
   * - None: is empty and uninitialized
   * - Loading: don't have data and fetching new one from server(in this case show full screen loader)
   * - Refreshing: data is fetched but outdated(show only small notification about update)
   * - Ready: fetching is done, you can have data or some kind of errors
   */
  @observable
  public state : StoreState = "None"

  constructor(root : RootStore) {
    this.root = root
  }


  protected get screens() {
    return this.root.screens
  }

  protected get ui() {
    return this.root.ui
  }

  @computed
  public get isLoading() {
    return this.state === "Loading"
  }

  @computed
  public get isRefreshing() {
    return this.state === "Refreshing"
  }

  @computed
  public get isSaving() {
    return this.state === "Saving"
  }

  @computed
  public get isNone() {
    return this.state === "None"
  }

  public abstract clear() : void

  /**
   * Cache key used for storing data in local storage
   */
  abstract get cacheKey() : string;

  protected abstract toBundle() : BundleType;
  protected abstract loadBundle(data : BundleType) : void;

  private get storeKey() {
    return [KEY_NAMESPACE, this.cacheKey].join('/')
  }

  /**
   * Save serialized state of this store
   */
  protected async persist() {
    const bundle = this.toBundle()

    if (!bundle) {
      await AsyncStorage.removeItem(this.storeKey)
      //log("No bundle data, removing key", this.storeKey)
      return
    }

    const serialized = JSON.stringify(bundle)
    await AsyncStorage.setItem(this.storeKey, serialized)
    //log("Persisted data to", this.storeKey)
  }

  /**
   * Load state from storage
   */
  protected async restore() {
    const rawData = await AsyncStorage.getItem(this.storeKey)
    if (rawData) {
      //log("Restoring data for", this.storeKey)
      const data = JSON.parse(rawData)
      runInAction(() => {
        this.loadBundle(data)
      })
    }
  }
}

export abstract class NonPersistableStore extends SubStore<void> {
  get cacheKey(): string {
    throw new Error("Method not implemented.")
  }

  protected toBundle() : any {
    throw new Error("Method not implemented.")
  }

  protected loadBundle(data: any) : void {
    throw new Error("Method not implemented.")
  }
}