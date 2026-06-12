public class LoginButton extends JButton {
    private final TextBox userTxt;
    private final TextBox passTxt;

    public LoginButton(TextBox userTxt, TextBox passTxt) {
        super("Log In");
        this.userTxt = userTxt;
        this.passTxt = passTxt;
    }

    @Override
    protected void fireActionPerformed(ActionEvent actionEvent) {
        String username = userTxt.getText();
        String password = passTxt.getText();
        // validates username and password
        // logs in the user or pops error message
    }
}