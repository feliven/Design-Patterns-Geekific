interface Handler {
  setNextHandler(next: Handler): Handler;
  handle(username: string, password: string): boolean;
}

abstract class BaseHandler implements Handler {
  private next: Handler | null; // Allow next to be null

  constructor(nextHandler: Handler | null = null) {
    // Make next optional in constructor
    this.next = nextHandler;
  }

  setNextHandler(next: Handler): Handler {
    this.next = next;
    return next;
  }

  abstract handle(username: string, password: string): boolean;

  protected handleNext(username: string, password: string): boolean {
    // Use strict equality
    if (this.next === null) {
      return true;
    }
    return this.next.handle(username, password);
  }
}

class UserExistsHandler extends BaseHandler {
  constructor(private database: Database) {
    super();
  }

  handle(username: string, password: string): boolean {
    if (!this.database.isValidUser(username)) {
      console.error("This username is not registered. Sign up to our app now!");
      return false;
    }
    return this.handleNext(username, password);
  }
}

class ValidPasswordHandler extends BaseHandler {
  constructor(private database: Database) {
    super();
  }

  handle(username: string, password: string): boolean {
    if (!this.database.isValidPassword(username, password)) {
      console.error("Wrong Password!");
      return false;
    }
    return this.handleNext(username, password);
  }
}

class RoleCheckHandler extends BaseHandler {
  constructor() {
    super();
  }

  handle(username: string, password: string): boolean {
    if (username === "admin_username") {
      console.error("Loading Admin Page...");
      return true;
    }
    console.error("Loading Default Page...");
    return this.handleNext(username, password);
  }
}

class Database {
  private users: Map<string, string>; // Initialize in constructor

  constructor() {
    this.users = new Map<string, string>(); // Initialize the map
    this.users.set("admin_username", "admin_password");
    this.users.set("user_username", "user_password");
  }

  isValidUser(username: string): boolean {
    return this.users.has(username);
  }

  isValidPassword(username: string, password: string): boolean {
    return this.users.get(username) === password;
  }
}

class AuthService {
  constructor(private handler: Handler) {
    this.handler = handler;
  }

  login(username: string, password: string): boolean {
    if (this.handler.handle(username, password)) {
      console.log("Authorization was successful!");

      // Do stuff for authorized users

      return true;
    }
    return false;
  }
}

function auth(): void {
  const database = new Database();
  // Construct handlers with their specific dependencies
  const userExistsHandler = new UserExistsHandler(database);
  const validPasswordHandler = new ValidPasswordHandler(database);
  const roleCheckHandler = new RoleCheckHandler();

  // Chain the handlers
  userExistsHandler.setNextHandler(validPasswordHandler).setNextHandler(roleCheckHandler);

  const service = new AuthService(userExistsHandler); // Pass the head of the chain

  console.log('service.login("user_username", "user_password")');
  service.login("user_username", "user_password");
  console.log("---");
  console.log('service.login("username", "password")');
  service.login("username", "password");
  console.log("---");
  console.log('service.login("admin_username", "admin_password")');
  service.login("admin_username", "admin_password");
  console.log("---");
  console.log('service.login("user_username", "wrong_password")');
  service.login("user_username", "wrong_password");
  console.log("---");
  console.log('service.login("non_existent_user", "password")');
  service.login("non_existent_user", "password");
}

// Call the auth function to run the example
auth();
