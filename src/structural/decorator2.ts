class InitialDatabaseService {
  getMailFromUsername(username: string): string {
    return username + "@mail";
  }
}

class DatabaseService extends InitialDatabaseService {
  getPhoneNbrFromUsername(username: string): string {
    return username + "@Phone";
  }

  getFBNameFromUsername(username: string): string {
    return username + "@Facebook";
  }
}

interface INotifier {
  send(message: string): void;
  getUsername(): string;
}

class Notifier implements INotifier {
  private databaseService = new DatabaseService();

  constructor(private username: string) {}

  send(msg: string): void {
    const mail = this.databaseService.getMailFromUsername(this.username);
    console.log("Sending " + msg + " by Mail to " + mail);
  }

  getUsername(): string {
    return this.username;
  }
}

abstract class BaseNotifierDecorator implements INotifier {
  protected readonly databaseService = new DatabaseService();

  constructor(private wrapped: INotifier) {}

  send(msg: string): void {
    this.wrapped.send(msg);
  }

  getUsername(): string {
    return this.wrapped.getUsername();
  }
}

class FacebookDecorator extends BaseNotifierDecorator {
  constructor(wrapped: INotifier) {
    super(wrapped);
  }

  override send(msg: string): void {
    super.send(msg);
    const fbName = this.databaseService.getFBNameFromUsername(this.getUsername());
    console.log("Sending " + msg + " on Facebook to " + fbName);
  }
}

class WhatsAppDecorator extends BaseNotifierDecorator {
  constructor(wrapped: INotifier) {
    super(wrapped);
  }

  override send(msg: string): void {
    super.send(msg);
    const phoneNbr = this.databaseService.getPhoneNbrFromUsername(this.getUsername());
    console.log("Sending " + msg + " by WhatsApp on " + phoneNbr);
  }
}

function sendNotifications(): void {
  const notifier = new FacebookDecorator(new WhatsAppDecorator(new Notifier("Geekific")));
  notifier.send("Like and Subscribe!!!");
}

sendNotifications();
