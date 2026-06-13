abstract class State {
  protected phone: Phone;

  constructor(phone: Phone) {
    this.phone = phone;
  }

  abstract onHome(): string;
  abstract onOffOn(): string;
}

class Phone {
  private state: State;

  constructor() {
    this.state = new OffState(this);
  }

  getState() {
    return this.state;
  }

  setState(state: State): void {
    this.state = state;
  }

  lock(): string {
    const msg = "Locking phone and turning off the screen";

    console.log({ msg });
    return msg;
  }

  home(): string {
    const msg = "Going to homescreen";

    console.log({ msg });
    return msg;
  }

  unlock(): string {
    const msg = "Unlocking the phone to home";

    console.log({ msg });
    return msg;
  }

  turnOn(): string {
    const msg = "Turning screen on, device still locked";

    console.log({ msg });
    return msg;
  }
}

class OffState extends State {
  constructor(phone: Phone) {
    super(phone);
  }

  onHome(): string {
    this.phone.setState(new LockedState(this.phone));
    return this.phone.turnOn();
  }

  onOffOn(): string {
    this.phone.setState(new LockedState(this.phone));
    return this.phone.turnOn();
  }
}

class LockedState extends State {
  constructor(phone: Phone) {
    super(phone);
  }

  onHome(): string {
    this.phone.setState(new ReadyState(this.phone));
    return this.phone.unlock();
  }

  onOffOn(): string {
    this.phone.setState(new OffState(this.phone));
    return this.phone.lock();
  }
}

class ReadyState extends State {
  constructor(phone: Phone) {
    super(phone);
  }

  onHome(): string {
    return this.phone.home();
  }

  onOffOn(): string {
    this.phone.setState(new OffState(this.phone));
    return this.phone.lock();
  }
}

class JButton {
  private listeners: Array<(e: Event) => void> = [];

  constructor(private message: string) {
    console.log({ message });
  }

  addActionListener(fn: (e: Event) => void) {
    this.listeners.push(fn);
  }

  press() {
    console.log(`Button "${this.message}" pressed!`);
    const event = new Event("press");
    this.listeners.forEach((listener) => listener(event));
  }
}

function usePhone(): void {
  const phone = new Phone();
  const home = new JButton("Home");
  home.addActionListener((e: Event) => phone.getState().onHome());
  const onOff = new JButton("On/Off");
  onOff.addActionListener((e: Event) => phone.getState().onOffOn());

  // Simulate user interactions:
  onOff.press(); // Turns screen on, device still locked (OffState -> LockedState)
  home.press(); // Unlocking the phone to home (LockedState -> ReadyState)
  home.press(); // Going to homescreen (ReadyState -> ReadyState)
  onOff.press(); // Locking phone and turning off the screen (ReadyState -> OffState)
}

usePhone();
