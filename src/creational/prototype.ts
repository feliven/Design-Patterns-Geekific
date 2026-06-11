interface Prototype {
  clone(): Car;
}

class Car implements Prototype {
  constructor(
    private brand: string,
    private model: string,
    private color: string,
    private topSpeed: number,
  ) {}

  clone(): Car {
    return new Car(this.brand, this.model, this.color, this.topSpeed);
  }
}

const marca = "Mercedes Benz";
const modeloCarro = "carro";
const cor = "branco";
const velMaximaCarro = 200;

const car = new Car(marca, modeloCarro, cor, velMaximaCarro);
car.clone();

console.log({ car });
console.log("car.clone():", car.clone());
