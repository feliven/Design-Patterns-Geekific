public interface PaymentStrategy {
    void collectPaymentDetails();
    boolean validatePaymentDetails();
    void pay(int amount);
}

public class PaymentByCreditCard implements PaymentStrategy {
    private CreditCard card;

    @Override
    public void collectPaymentDetails() {
        // Pop-up to collect card details...
        card = new CreditCard("cardNumber", "expiryDate", "cvv");
    }

    @Override
    public boolean validatePaymentDetails() {
        // Validate credit card...
        return false;
    }

    @Override
    public void pay(int amount) {
        System.out.println("Paying " + amount + " using Credit Card");
        card.setAmount(card.getAmount() - amount);
    }
}

public class PaymentByPayPal implements PaymentStrategy {
    private String email;
    private String password;

    @Override
    public void collectPaymentDetails() {
        // Pop-up to collect PayPal mail and password...
        email = "...";
        password = "...";
    }

    @Override
    public boolean validatePaymentDetails() {
        // Validate account...
        return false;
    }

    @Override
    public void pay(int amount) {
        System.out.println("Paying " + amount + " using PayPal");
    }
}

@Setter
public class PaymentService {
    private int cost;
    private boolean includeDelivery;

    private PaymentStrategy strategy;

    public void processOrder() {
        strategy.collectPaymentDetails();
        if (strategy.validatePaymentDetails()) {
            strategy.pay(getTotal());
        }
    }

    private int getTotal() {
        return includeDelivery ? cost + 10 : cost;
    }
}

public static void main(String[] args) {
    PaymentService paymentService = new PaymentService();
    // The strategy can now be easily picked at runtime
    paymentService.setStrategy(new PaymentByCreditCard());
    paymentService.processOrder();
}