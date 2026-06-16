public class DatabaseService {
    public String getMailFromUsername(String username) {
        return username + "@mail";
    }
}

public class Notifier {
    private final String username;
    protected final DatabaseService databaseService;

    public Notifier(String username) {
        this.username = username;
        databaseService = new DatabaseService();
    }

    public void send(String msg) {
        String mail = databaseService.getMailFromUsername(username);
        System.out.println("Sending " + msg + " by Mail to " + mail);
    }

    public String getUsername() {
        return username;
    }
}

public class DatabaseService {
    public String getPhoneNbrFromUsername(String username) {
        return username + "@Phone";
    }

    public String getFBNameFromUsername(String username) {
        return username + "@Facebook";
    }
}

public class WhatsAppNotifier extends Notifier {
    public WhatsAppNotifier(String username) {
        super(username);
    }

    @Override
    public void send(String msg) {
        String phoneNbr = databaseService.getPhoneNbrFromUsername(getUsername());
        System.out.println("Sending " + msg + " by WhatsApp on " + phoneNbr);
    }
}

public class FacebookNotifier extends Notifier {
    public FacebookNotifier(String username) {
        super(username);
    }

    @Override
    public void send(String msg) {
        String fbName = databaseService.getFBNameFromUsername(getUsername());
        System.out.println("Sending " + msg + " on Facebook to " + fbName);
    }
}

public static void main(String[] args) {
    WhatsAppNotifier notifier = new WhatsAppNotifier("Geekific");
    notifier.send("Like and Subscribe!");
}