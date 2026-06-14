class Room {
  private light: Light;

  constructor() {
    this.light = new Light();
  }

  switchLights(): void {
    this.light.setSwitchedOn(!this.light.isSwitchedOn());
  }
}

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

class Light {
  private switchedOn: boolean = false;

  isSwitchedOn(): boolean {
    return this.switchedOn;
  }

  setSwitchedOn(switchedOn: boolean): void {
    console.log({ switchedOn });
    this.switchedOn = switchedOn;
  }
}

class House {
  rooms: Room[] = [];

  addRoom(room: Room): void {
    this.rooms.push(room);
  }
}

function smartHouse(): void {
  const house = new House();
  house.addRoom(new LivingRoom());
  house.addRoom(new Bathroom());
  house.addRoom(new Kitchen());
  house.addRoom(new Bedroom());
  house.addRoom(new Bedroom());

  console.log({ house });

  house.rooms.forEach((room) => {
    room.switchLights();
  });
}

smartHouse();
