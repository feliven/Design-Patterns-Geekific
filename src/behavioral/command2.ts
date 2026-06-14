interface Command {
  execute(): void;
}

class SwitchLightsCommand implements Command {
  constructor(private light: Light) {}

  execute(): void {
    this.light.switchLights();
  }
}

class Light {
  private switchedOn: boolean = false;

  switchLights() {
    this.switchedOn = !this.switchedOn;
    console.log("this.switchedOn", this.switchedOn);
  }
}

class Room {
  command!: Command;

  setCommand(command: Command): void {
    this.command = command;
  }

  executeCommand(): void {
    this.command.execute();
  }
}

function smartHouse2(): void {
  console.log("smartHouse2()");

  const livingRoom = new Room();
  livingRoom.setCommand(new SwitchLightsCommand(new Light()));
  livingRoom.executeCommand();
}

// class Room {
//   private light: Light;

//   constructor() {
//     this.light = new Light();
//   }

//   switchLights(): void {
//     this.light.setSwitchedOn(!this.light.isSwitchedOn());
//   }
// }

interface Oven {}
interface Windows {}

class Kitchen extends Room {
  public readonly oven!: Oven;

  //
}

class Bathroom extends Room {
  public readonly hotWater!: string;

  //
}

class LivingRoom extends Room {
  public readonly windows!: Windows;

  //
}

class Bedroom extends Room {
  public readonly music!: string;

  //
}

class House {
  rooms: Room[] = [];

  addRoom(room: Room): void {
    this.rooms.push(room);
  }
}

function smartHouse(): void {
  console.log("smartHouse()");

  const house = new House();
  house.addRoom(new LivingRoom());
  house.addRoom(new Bathroom());
  house.addRoom(new Kitchen());
  house.addRoom(new Bedroom());
  house.addRoom(new Bedroom());

  console.log({ house });

  house.rooms.forEach((room) => {
    const light = new Light();
    room.setCommand(new SwitchLightsCommand(light));
    room.executeCommand();
  });
}

smartHouse();
smartHouse2();
