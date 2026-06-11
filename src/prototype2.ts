abstract class Vehicle {
  constructor(
    protected brand: string,
    protected model: string,
    protected color: string,
  ) {}

  abstract clone(): Vehicle;
}

class Car extends Vehicle {
  private topSpeed: number;

  constructor(brand: string, model: string, color: string, topSpeed: number) {
    super(brand, model, color);
    this.topSpeed = topSpeed;
  }

  clone(): Car {
    return new Car(this.brand, this.model, this.color, this.topSpeed);
  }
}

class Bus extends Vehicle {
  private doors: number;

  constructor(brand: string, model: string, color: string, doors: number) {
    super(brand, model, color);
    this.doors = doors;
  }

  clone(): Bus {
    return new Bus(this.brand, this.model, this.color, this.doors);
  }
}

function clone(vehicles: Vehicle[]): Vehicle[] {
  const copyList: Vehicle[] = [];

  for (const vehicle of vehicles) {
    copyList.push(vehicle.clone());
  }

  return copyList;
}

const marca = "Mercedes Benz";
const modeloCarro = "carro";
const modeloOnibus = "Marcopolo";
const cor = "branco";
const velMaximaCarro = 200;
const portasOnibus = 4;

const car = new Car(marca, modeloCarro, cor, velMaximaCarro);
const bus = new Bus(marca, modeloOnibus, cor, portasOnibus);

console.log({ car });
console.log({ bus });
console.log(clone([car, bus]));

const carClone = Object.assign(Object.create(Object.getPrototypeOf(car)), car);

console.log({ carClone });

const structuredCarClone = structuredClone(car);

console.log({ structuredCarClone });

console.log(carClone instanceof Car); // false
console.log(carClone instanceof Vehicle); // false
console.log(structuredCarClone instanceof Car); // true
console.log(structuredCarClone instanceof Vehicle); // true

function deepClone<T extends Vehicle>(vehicle: T): T {
  const cloned = Object.create(Object.getPrototypeOf(vehicle));
  for (const key in vehicle) {
    if (vehicle.hasOwnProperty(key)) {
      cloned[key] = JSON.parse(JSON.stringify(vehicle[key]));
    }
  }
  return cloned;
}

const deepCarClone = deepClone(car);
console.log(deepCarClone instanceof Car); // true
