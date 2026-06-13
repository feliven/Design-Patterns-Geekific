@Data
public abstract class Client {
    private final String name;
    private final String address;
    private final String number;

    public abstract void sendMail();
}

@Getter
public class Resident extends Client {
    @Override
    public void sendMail() {
        System.out.println("Sending mail about medical insurance...");
    }
}

@Getter
public class Company extends Client {
    @Override
    public void sendMail() {
        System.out.println("Sending employees and equipment insurance mail...");
    }
}

@Getter
public class Bank extends Client {
    @Override
    public void sendMail() {
        System.out.println("Sending mail about theft insurance...");
    }
}

@Getter
public class Restaurant extends Client {
    @Override
    public void sendMail() {
        System.out.println("Sending mail about fire and food insurance...");
    }
}