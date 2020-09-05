import NotificationsStore from './NotificationsStore'

export default class UI {
  public readonly notifications : NotificationsStore

  constructor(root) {
    this.notifications = new NotificationsStore(root)
  }
}