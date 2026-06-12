class TextBox {
  input: string;

  constructor(input: string) {
    this.input = input;
  }

  getText() {
    return this.input;
  }
}

class JButton {
  constructor(message: string) {
    console.log({ message });
  }
}

class ActionEvent {}

interface Component {
  setMediator(mediator: Mediator): void;
  getName(): string;
}

interface Mediator {
  login(): void;
}

class LoginButton extends JButton implements Component {
  private mediator: Mediator | null = null;

  constructor() {
    super("Log In");
  }

  protected fireActionPerformed(actionEvent: ActionEvent): void {
    this.mediator?.login();
  }

  setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }

  getName(): string {
    return "LoginButton";
  }
}

class Dialog implements Mediator {
  constructor(
    private userTextBox: TextBox,
    private passTextBox: TextBox,
    private button: LoginButton,
  ) {}

  login(): void {
    const username = this.userTextBox.getText();
    const password = this.passTextBox.getText();
    // validate username and password
    // logs in the user or pops error message
  }
}

const userTxt = new TextBox("Felipe");
const passTxt = new TextBox("s3nh4");
const loginButton = new LoginButton();
const dialog = new Dialog(userTxt, passTxt, loginButton);

console.log({ userTxt });
console.log({ passTxt });
console.log({ loginButton });
console.log({ dialog });
