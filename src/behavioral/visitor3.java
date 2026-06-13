public interface Visitor {
    void visitBank(Bank bank);
    void visitRestaurant(Restaurant restaurant);
    void visitResident(Resident resident);
}

@Data
public abstract class Client {
    private final String name;
    private final String address;
    private final String number;

    public abstract void accept(Visitor visitor);
}

@Getter
public class Bank extends Client {
    ...

    @Override
    public void accept(Visitor visitor) {
        visitor.visitBank(this);
    }
}

@Getter
public class Restaurant extends Client {
    ...

    @Override
    public void accept(Visitor visitor) {
        visitor.visitRestaurant(this);
    }
}

@Getter
public class Resident extends Client {
    ...

    @Override
    public void accept(Visitor visitor) {
        visitor.visitResident(this);
    }
}

public class InsuranceMessagingVisitor implements Visitor {
    public void sendInsuranceMails(List<Client> clients) {
        for (Client client : clients) {
            client.accept(this);
        }
    }

    ...
}
