enum Event {
  NEW_ITEM,
  SALE,
}

interface EventListener {
  update(eventType: Event): void;
}

class NotificationService {
  private readonly customers: Map<Event, EventListener[]> = new Map();

  constructor() {
    this.customers.set(Event.NEW_ITEM, []);
    this.customers.set(Event.SALE, []);
  }

  subscribe(eventType: Event, listener: EventListener): void {
    this.customers.get(eventType)?.push(listener);
  }

  unsubscribe(eventType: Event, listener: EventListener): void {
    // TypeScript arrays don't have a direct .remove() method.
    // We use .indexOf() and .splice() to remove the listener.
    const listeners = this.customers.get(eventType);
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    }
  }

  notify(eventType: Event): void {
    this.customers?.get(eventType)?.forEach((listener) => {
      console.log({ eventType });
      console.log({ listener });
      return listener?.update(eventType);
    });
  }
}

class Store {
  private notificationService: NotificationService;

  constructor() {
    this.notificationService = new NotificationService();
  }

  getNotificationService(): NotificationService {
    return this.notificationService;
  }
}

class EmailMsgListener implements EventListener {
  private email: string;

  constructor(email: string) {
    this.email = email;
  }

  update(): void {
    // Actually send the email
    console.log("email sent");
  }
}

class MobileAppListener implements EventListener {
  private username: string;

  constructor(username: string) {
    this.username = username;
  }

  update(): void {
    // Actually send the push notification
    console.log("push notification sent");
  }
}

function notifyClients(): void {
  const store = new Store();

  store.getNotificationService().subscribe(Event.NEW_ITEM, new EmailMsgListener("geekific@like.com"));
  store.getNotificationService().subscribe(Event.SALE, new EmailMsgListener("geekific@subs.com"));
  store.getNotificationService().subscribe(Event.NEW_ITEM, new MobileAppListener("GeekificLnS"));

  store.getNotificationService().notify(Event.NEW_ITEM);
  store.getNotificationService().notify(Event.SALE);
}

notifyClients();
