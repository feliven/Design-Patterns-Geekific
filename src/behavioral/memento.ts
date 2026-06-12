class TextArea {
  private text: string = "";

  set(text: string): void {
    this.text = text;
    console.log("---");
    console.log("set:", text);
  }

  takeSnapshot(): TextArea.Memento {
    console.log("takeSnapshot:", this.text.length ? this.text : `''`);
    return new TextArea.Memento(this.text);
  }

  restore(memento: TextArea.Memento): void {
    this.text = memento.getSavedText();
    console.log("restored to:", this.text);
  }
}

namespace TextArea {
  export class Memento {
    private readonly text: string = "";

    constructor(textToSave: string) {
      this.text = textToSave;
    }

    getSavedText(): string {
      console.log("getSavedText():", this.text);
      return this.text;
    }
  }
}

class Editor {
  private stateHistory: TextArea.Memento[] = [];
  private textArea: TextArea;

  constructor() {
    this.textArea = new TextArea();
  }

  write(text: string): void {
    this.stateHistory.push(this.textArea.takeSnapshot());
    this.textArea.set(text);

    console.log(this.stateHistory);
    console.log("this.textArea.set:", text);
  }

  undo(): void {
    const memento = this.stateHistory.pop();
    console.log("memento:", memento);

    if (memento) {
      console.log("this.textArea.restore() called");
      this.textArea.restore(memento);
    }
  }
}

function textEditor(): void {
  const editor = new Editor();
  editor.write("Like and");
  editor.write("Like and Subscribe");
  editor.write("Like and Subscribe to Geekific!");
  editor.undo();
}

textEditor();
