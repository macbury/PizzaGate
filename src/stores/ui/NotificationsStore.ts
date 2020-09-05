import { action, observable } from 'mobx'
import { NonPersistableStore } from '../core/SubStore'

export type TAction = {
  /**
   * I18n key to translation
   */
  name: string
}

export interface INotification {
  message: string
  retryAction?()
  action?: TAction
}

/**
 * Manage displaying errors in snackbar
 */
export default class NotificationsStore extends NonPersistableStore {
  @observable
  public current : INotification

  @action
  public show = (notification : INotification) => {
    this.current = notification
  }

  @action
  public showSuccess(i18nKey : string) {
    this.show({
      message: this.i18n.t(i18nKey)
    })
  }

  @action
  public showErrorKey(i18nKey : string, retryAction?) {
    this.show({
      message: this.i18n.t(i18nKey),
      retryAction
    })
  }

  @action
  public showError(error : Error, retryAction?) {
    this.show({
      message: error.toString(),
      retryAction
    })
  }

  @action
  public hide = () => {
    this.current = null
  }

  @action
  public async clear() {
    this.current = null
  }
}