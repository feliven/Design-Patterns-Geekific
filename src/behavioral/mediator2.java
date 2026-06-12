public interface Component {
    void setMediator(Mediator mediator);
    String getName();
}

public interface Mediator {
    void login();
}

public class LoginButton extends JButton implements Component {
    private Mediator mediator;

    public LoginButton() {
        super("Log In");
    }

    @Override
    protected void fireActionPerformed(ActionEvent actionEvent) {
        mediator.login();
    }

    @Override
    public void setMediator(Mediator mediator) {
        this.mediator = mediator;
    }

    @Override
    public String getName() {
        return "LoginButton";
    }
}

public class Dialog implements Mediator {
    private TextBox userTextBox;
    private TextBox passTextBox;
    private LoginButton button;

    @Override
    public void login() {
        String username = userTextBox.getText();
        String password = passTextBox.getText();
        // validate username and password
        // logs in the user or pops error message
    }
}