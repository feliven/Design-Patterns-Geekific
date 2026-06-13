@Data
public class CreditCard {
    private int amount = 1_000;
    private final String number;
    private final String date;
    private final String cvv;
}

@Setter
public class PaymentService {
    private int cost;
    private boolean includeDelivery;

    public void processOrder() {
        // Pop-up to collect card details...
        CreditCard card = new CreditCard("cardNumber", "expiryDate", "cvv");
        // Validate credit card...
        System.out.println("Paying " + getTotal() + " using Credit Card");
        card.setAmount(card.getAmount() - getTotal());
    }

    private int getTotal() {
        return includeDelivery ? cost + 10 : cost;
    }
}

public interface PaymentStrategy {
    void pay(int amount);
}

public class PaymentByCreditCard implements PaymentStrategy {
    private CreditCard card;

    @Override
    public void pay(int amount) {
        // Pop-up to collect card details...
        card = new CreditCard("cardNumber", "expiryDate", "cvv");
        // Validate credit card...
        System.out.println("Paying " + amount + " using Credit Card");
        card.setAmount(card.getAmount() - amount);
    }
}

public class PaymentByPayPal implements PaymentStrategy {
    private String email;
    private String password;

    @Override
    public void pay(int amount) {
        // Pop-up to collect PayPal mail and password...
        email = "...";
        password = "...";
        // Validate account...
        System.out.println("Paying " + amount + " using PayPal");
    }
}
