interface Snapshot {
  text: string;
  date: Date;
}

class TextArea {
  private text: string = "";

  set(text: string): void {
    this.text = text;
    console.log("set:", text);
  }

  takeSnapshot(): Snapshot {
    const snapshot = {
      text: this.text,
      date: new Date(),
    };
    console.log("takeSnapshot():", snapshot);
    return snapshot;
  }

  restore(snapshot: Snapshot): void {
    this.text = snapshot.text;
    console.log("restored to:", this.text);
  }
}

class Editor {
  private stateHistory: Snapshot[] = [];
  private textArea = new TextArea();

  write(text: string): void {
    this.stateHistory.push(this.textArea.takeSnapshot());
    this.textArea.set(text);

    console.log("this.textArea.set:", text);
    console.log("this.stateHistory:", this.stateHistory);
  }

  undo(): void {
    const snapshot = this.stateHistory.pop();
    if (snapshot) {
      console.log("this.textArea.restore() called");
      this.textArea.restore(snapshot);
    }
  }
}

function textEditor(): void {
  const editor = new Editor();
  let delay = 0;

  setTimeout(
    () => {
      editor.write("Like and");
    },
    (delay += Math.random() * 1000),
  );

  setTimeout(
    () => {
      editor.write("Like and Subscribe");
    },
    (delay += Math.random() * 1000),
  );

  setTimeout(
    () => {
      editor.write("Like and Subscribe to Geekific!");
    },
    (delay += Math.random() * 1000),
  );

  setTimeout(
    () => {
      editor.undo();
    },
    (delay += Math.random() * 1000),
  );
}

textEditor();

async function textEditor2(): Promise<void> {
  const editor = new Editor();

  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
  editor.write("Like and");

  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
  editor.write("Like and Subscribe");

  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
  editor.write("Like and Subscribe to Geekific!");

  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
  editor.undo();
}

textEditor2();

const getDataPromise = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("API data");
    }, 2000);
  });
};
