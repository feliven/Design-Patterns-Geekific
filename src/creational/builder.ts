interface ICar {
  id?: number;
  brand?: string;
  model?: string;
  color?: string;
  engine?: string;
  qtyDoors?: number;
  height?: number;
}

class Car {
  constructor(readonly car: ICar) {}
}

class CarBuilder {
  private car: ICar = {};

  set<K extends keyof ICar>(key: K, value: ICar[K]): CarBuilder {
    this.car[key] = value;
    return this;
  }

  build(): Car {
    return new Car(this.car);
  }
}

const builder = new CarBuilder();
builder.set("id", 2122).set("brand", "Bugatti").set("model", "Chiron").set("color", "Blue");
const car = builder.build();

console.log({ car });

function createCar(config: ICar): Car {
  return new Car(config);
}

const car1 = createCar({ id: 2122, brand: "Bugatti", model: "Chiron", color: "Blue" });
console.log({ car1 });

const car2 = createCar({ id: 23 });
console.log({ car2 });

const car3 = createCar({ engine: "potent", height: 123 });
console.log({ car3 });

class Director {
  buildBugatti(builder: CarBuilder): void {
    builder.set("brand", "Bugatti").set("color", "Blue").set("qtyDoors", 2).set("engine", "8L").set("height", 115);
  }

  buildLambo(builder: CarBuilder): void {
    builder
      .set("brand", "Lamborghini")
      .set("model", "Aventador")
      .set("color", "Yellow")
      .set("qtyDoors", 2)
      .set("height", 115);
  }
}

const director = new Director();
const builderFromDirector = new CarBuilder();
director.buildBugatti(builderFromDirector);
const carFromBuilderDirector = builderFromDirector.build();

console.log({ carFromBuilderDirector });

class NewDirector {
  buildBugatti(): Car {
    return new Car({
      brand: "Bugatti",
      color: "Blue",
      qtyDoors: 2,
      engine: "8L",
      height: 115,
    });
  }

  buildLambo(): Car {
    return new Car({
      brand: "Lamborghini",
      model: "Aventador",
      color: "Yellow",
      qtyDoors: 2,
      height: 115,
    });
  }
}

const newDirector = new NewDirector();
const bugatti = newDirector.buildBugatti();
const lambo = newDirector.buildLambo();

console.log({ bugatti, lambo });
