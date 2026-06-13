public enum Event {
    NEW_ITEM, SALE
}

public interface EventListener {
    void update(Event eventType);
}

public class NotificationService {
    private final Map<Event, List<EventListener>> customers;

    public NotificationService() {
        customers = new HashMap<>();
        Arrays.stream(Event.values()).forEach(event ->
            customers.put(event, new ArrayList<>())
        );
    }

    public void subscribe(Event eventType, EventListener listener) {
        customers.get(eventType).add(listener);
    }

    public void unsubscribe(Event eventType, EventListener listener) {
        customers.get(eventType).remove(listener);
    }

    public void notify(Event eventType) {
        customers.get(eventType).forEach(listener ->
            listener.update(eventType)
        );
    }
}

public interface EventListener {
    void update();
}

public class EmailMsgListener implements EventListener {
    private final String email;

    public EmailMsgListener(String email) {
        this.email = email;
    }

    @Override
    public void update() {
        // Actually send the mail
    }
}

public class MobileAppListener implements EventListener {
    private final String username;

    public MobileAppListener(String username) {
        this.username = username;
    }

    @Override
    public void update() {
        // Actually send the push notification
    }
}

public static void main(String[] args) {
    Store store = new Store();
    store.getNotificationService().subscribe(
        new EmailMsgListener("geekific@like.com")
    );
    store.getNotificationService().subscribe(
        new EmailMsgListener("geekific@subs.com")
    );
    store.getNotificationService().subscribe(
        new MobileAppListener("GeekificLnS")
    );
}