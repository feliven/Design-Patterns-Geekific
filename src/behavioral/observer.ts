class Store {
  private notificationService: NotificationService;

  constructor() {
    this.notificationService = new NotificationService();
  }

  newItemPromotion(): void {
    this.notificationService.notify();
  }

  getService(): NotificationService {
    return this.notificationService;
  }
}

class NotificationService {
  private readonly customers: EmailMsgListener[];

  constructor() {
    this.customers = [];
  }

  subscribe(listener: EmailMsgListener): void {
    this.customers.push(listener);
  }

  unsubscribe(listener: EmailMsgListener): void {
    const index = this.customers.indexOf(listener);
    if (index !== -1) {
      this.customers.splice(index, 1);
    }
  }

  notify(): void {
    this.customers.forEach((listener) => {
      return listener.update();
    });
  }
}

class EmailMsgListener {
  public readonly email: string;

  constructor(email: string) {
    this.email = email;
  }

  update(): void {
    // Actually send the mail
  }
}
