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

class LoginButton extends JButton {
  protected userTxt: TextBox;
  protected passTxt: TextBox;

  constructor(userTxt: TextBox, passTxt: TextBox) {
    super("Log In");
    this.userTxt = userTxt;
    this.passTxt = passTxt;
  }

  protected fireActionPerformed(_actionEvent: ActionEvent): void {
    this.userTxt.getText();
    this.userTxt.getText();
    // const password: string = this.passTxt.getText();
    // const password: string = this.passTxt.getText();
    // validates username and password
    // logs in the user or pops error message
  }
}

const userTxt = new TextBox("Felipe");
const passTxt = new TextBox("s3nh4");
const loginButton = new LoginButton(userTxt, passTxt);

console.log({ userTxt });
console.log({ passTxt });
console.log({ loginButton });
