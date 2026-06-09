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
