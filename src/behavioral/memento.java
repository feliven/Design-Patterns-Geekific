class TextArea {
    private String text;

    public void set(String text) {
        this.text = text;
    }

    public Memento takeSnapshot() {
        return new Memento(this.text);
    }

    public void restore(Memento memento) {
        this.text = memento.getSavedText();
    }

    public static class Memento {
        private final String text;

        private Memento(String textToSave) {
            text = textToSave;
        }

        private String getSavedText() {
            return text;
        }
    }
}

class Editor {
    private Deque<TextArea.Memento> stateHistory;
    private TextArea textArea;

    public Editor() {
        stateHistory = new LinkedList<>();
        textArea = new TextArea();
    }

    public void write(String text) {
        textArea.set(text);
        stateHistory.add(textArea.takeSnapshot());
    }

    public void undo() {
        textArea.restore(stateHistory.pop());
    }
}

public static void main(String[] args) {
    Editor editor = new Editor();
    editor.write("Like and");
    editor.write("Like and Subscribe");
    editor.write("Like and Subscribe to Geekific!");
    editor.undo();
}