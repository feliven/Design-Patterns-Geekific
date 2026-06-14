class User {
  constructor(
    private id: string,
    private name: string,
    private balance: number,
    private currency: string,
    private accountNbr: string,
  ) {}

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getBalance(): number {
    return this.balance;
  }

  setBalance(balance: number): void {
    this.balance = balance;
  }

  getCurrency(): string {
    return this.currency;
  }
}

class UserDatabase {
  private static instance = new UserDatabase();
  private users: User[] = [new User("1", "Eu", 1500, "USD", "12345")];

  static getInstance(): UserDatabase {
    return UserDatabase.instance;
  }

  getUser(userId: string): User | undefined {
    return this.users.find((user) => user.getId() === userId);
  }
}

class UserDatabaseService {
  private userDatabase = UserDatabase.getInstance();

  getUser(userId: string): User | undefined {
    return this.userDatabase.getUser(userId);
  }
}

class CryptoDatabase {
  private crypto = [];
}

class SomeComplexStuff {}

class UIService {
  static getLoggedInUserId(): string {
    //
    return "1";
  }

  login(username: string, password: string): boolean {
    //
    return true;
  }

  logout(): boolean {
    //
    return true;
  }
}

abstract class CryptoService {
  buyCurrency(user: User, amount: number): void {
    this.debit(user, amount);
    this.performPurchase(user, amount);
  }

  private debit(user: User, amount: number): void {
    user.setBalance(user.getBalance() - amount);
  }

  protected abstract performPurchase(user: User, amount: number): void;
}

class BitcoinService extends CryptoService {
  protected performPurchase(user: User, amount: number): void {
    console.log(`Buy ${amount} ${user.getCurrency()} in Bitcoin for ${user.getName()}`);
    console.log("balance:", user.getBalance());
  }
}

class EthereumService extends CryptoService {
  protected performPurchase(user: User, amount: number): void {
    console.log(`Buy ${amount} ${user.getCurrency()} in ETH for ${user.getName()}`);
    console.log("balance:", user.getBalance());
  }
}

class CryptoFactory {
  static getCryptoService(currency: string): CryptoService | null {
    if (currency === "BTC") {
      return new BitcoinService();
    } else if (currency === "ETH") {
      return new EthereumService();
    } else {
      return null;
    }
  }
}

class BuyCryptoFacade {
  buyCryptocurrency(amount: number, currency: string): void {
    const userDbService = new UserDatabaseService();
    const user = userDbService.getUser(UIService.getLoggedInUserId());

    if (!user) {
      console.log("User not found");
      return;
    }

    if (user.getBalance() < amount) {
      console.log("Insufficient balance to perform transaction");
      return;
    }

    const cryptoService = CryptoFactory.getCryptoService(currency);

    if (!cryptoService) {
      console.log("Unsupported currency");
      return;
    }

    cryptoService.buyCurrency(user, amount);
    const mailService = new MailService();
    mailService.sendConfirmationMail(user);
  }
}

class MailService {
  sendConfirmationMail(user: User): void {
    console.log("Confirmation email sent to " + user.getName());
  }
}

function buyCrypto(): void {
  try {
    const buyCrypto = new BuyCryptoFacade();
    buyCrypto.buyCryptocurrency(1000, "BTC");

    buyCrypto.buyCryptocurrency(450, "ETH");

    buyCrypto.buyCryptocurrency(50, "");

    buyCrypto.buyCryptocurrency(100, "BTC");
  } catch (error) {
    console.error(error);
  }
}

buyCrypto();
