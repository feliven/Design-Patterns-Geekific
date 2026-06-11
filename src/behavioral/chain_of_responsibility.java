public interface Handler {
    boolean handle(String username, String password);
}

public abstract class BaseHandler implements Handler{
    private Handler next;

    public Handler setNextHandler(Handler next) {
        this.next = next;
        return next;
    }

    public abstract boolean handle(String username, String password);

    protected boolean handleNext(String username, String password) {
    if (next == null) {
        return true;
    }
    return next.handle(username, password);
}

}

public class UserExistsHandler extends Handler {
    private Database database;

    public UserExistsHandler(Database database) {
        this.database = database;
    }

    @Override
    public boolean handle(String username, String password) {
        if (!database.isValidUser(username)) {
            System.out.println("This username is not registered!");
            System.out.println("Sign Up to our app now!");
            return false;
        }
        return handleNext(username, password);
    }
}

public class ValidPasswordHandler extends Handler {
    private Database database;

    public ValidPasswordHandler(Database database) {
        this.database = database;
    }

    @Override
    public boolean handle(String username, String password) {
        if (!database.isValidPassword(username, password)) {
            System.out.println("Wrong Password!");
            return false;
        }
        return handleNext(username, password);
    }
}

public class RoleCheckHandler extends Handler {
    @Override
    public boolean handle(String username, String password) {
        if ("admin_username".equals(username)) {
            System.out.println("Loading Admin Page...");
            return true;
        }
        System.out.println("Loading Default Page...");
        return handleNext(username, password);
    }
}

public class Database {

    private final Map<String, String> users;

    public Database() {
        users = new HashMap<>();
        users.put("admin_username", "admin_password");
        users.put("user_username", "user_password");
    }

    public boolean isValidUser(String username) {
        return users.containsKey(username);
    }

    public boolean isValidPassword(String username, String password) {
        return users.get(username).equals(password);
    }

}

public class AuthService {
    private Handler handler;

    public AuthService(Handler handler) {
        this.handler = handler;
    }

    public boolean logIn(String email, String password) {
        if (handler.handle(email, password)) {
            System.out.println("Authorization was successful!");

            // Do stuff for authorized users

            return true;
        }
        return false;
    }
}

public static void main(String[] args) throws IOException {
    Database database = new Database();
    Handler handler = new UserExistsHandler(database)
        .setNextHandler(new ValidPasswordHandler(database))
        .setNextHandler(new RoleCheckHandler());
    AuthService service = new AuthService(handler);
    service.logIn("username", "password");
}