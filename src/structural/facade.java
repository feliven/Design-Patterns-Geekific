@Data
public class User {
    private String id;
    private String name;
    private double balance;
    private String currency;
    private String accountNbr;
}

public class UIService {
    public static String getLoggedInUserId() {
        ...
    }

    public boolean logIn(String username, String password) {
        ...
    }

    public boolean logout() {
        ...
    }
}

public class DatabaseService {
    public User getUser(String userId) {
        ...
    }
}

public abstract class CryptoService {
    private CryptoDatabase cryptoDatabase;
    private SomeComplexStuff complexStuff;

    public abstract void buyCurrency(User user, double amount);
}

public class BitcoinService extends CryptoService {
    @Override
    public void buyCurrency(User user, double amount) {
        ...
    }
}

public class EthereumService extends CryptoService {
    @Override
    public void buyCurrency(User user, double amount) {
        ...
    }
}

public class CryptoFactory {
    public static CryptoService getCryptoService(String currency) {
        if (currency.equals("BTC")) {
            return new BitcoinService();
        } else if (currency.equals("ETH")) {
            return new EthereumService();
        } else {
            ...
        }
    }
}

public class BuyCryptoFacade {
    public void buyCryptocurrency(double amount, String currency) {
        DatabaseService dbService = new DatabaseService();
        User user = dbService.getUser(UIService.getLoggedInUserId());
        if (user.getBalance() < amount) {
            System.out.println("Insufficient balance to perform transaction");
            return;
        }
        CryptoFactory.getCryptoService(currency).buyCurrency(user, amount);
        MailService mailService = new MailService();
        mailService.sendConfirmationMail(user);
    }
}

public static void main(String[] args) throws Exception {
    BuyCryptoFacade buyCrypto = new BuyCryptoFacade();
    buyCrypto.buyCryptocurrency(1000, "BTC");
}