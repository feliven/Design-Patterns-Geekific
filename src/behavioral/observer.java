public class Store {
    private final NotificationService notificationService;

    public Store() {
        notificationService = new NotificationService();
    }

    public void newItemPromotion() {
        notificationService.notify();
    }

    public NotificationService getService() {
        return notificationService;
    }
}

public class NotificationService {
    private final List<EmailMsgListener> customers;

    public NotificationService() {
        customers = new ArrayList<>();
    }

    public void subscribe(EmailMsgListener listener) {
        customers.add(listener);
    }

    public void unsubscribe(EmailMsgListener listener) {
        customers.remove(listener);
    }

    public void notify() {
        customers.forEach(listener -> listener.update());
    }
}

public class EmailMsgListener {
    private final String email;

    public EmailMsgListener(String email) {
        this.email = email;
    }

    public void update() {
        // Actually send the mail
    }
}