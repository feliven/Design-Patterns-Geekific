class InitialDatabaseService {
  getMailFromUsername(username: string): string {
    return username + "@mail";
  }
}

class Notifier {
  protected databaseService = new DatabaseService();

  constructor(private username: string) {}

  send(msg: string): void {
    const mail: string = this.databaseService.getMailFromUsername(this.username);
    console.log("Sending " + msg + " by Mail to " + mail);
  }

  getUsername(): string {
    return this.username;
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

class WhatsAppNotifier extends Notifier {
  constructor(username: string) {
    super(username);
  }

  override send(msg: string): void {
    const phoneNbr: string = this.databaseService.getPhoneNbrFromUsername(this.getUsername());
    console.log("Sending " + msg + " by WhatsApp on " + phoneNbr);
  }
}

class FacebookNotifier extends Notifier {
  constructor(username: string) {
    super(username);
  }

  override send(msg: string): void {
    const fbName = this.databaseService.getFBNameFromUsername(this.getUsername());
    console.log("Sending " + msg + " on Facebook to " + fbName);
  }
}

function sendWhatsAppNotification(): void {
  const notifier = new WhatsAppNotifier("Geekific");
  notifier.send("Like and Subscribe!");
}

function sendFBNotification(): void {
  const notifier = new FacebookNotifier("Geekific");
  notifier.send("Like and Subscribe!");
}

sendWhatsAppNotification();
sendFBNotification();
