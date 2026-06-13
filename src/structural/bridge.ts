abstract class Pizza {
  constructor(
    protected sauce: string,
    protected toppings: string,
    protected crust: string,
  ) {}

  abstract deliver(): void;
}

class PepperoniPizza extends Pizza {
  deliver(): void {
    console.log("Adding Sauce");
    console.log("Adding Toppings");
    console.log("Adding Pepperoni");
    console.log("Order in Progress!");
  }
}

class VeggiePizza extends Pizza {
  deliver(): void {
    console.log("Adding Sauce");
    console.log("Adding Different Toppings");
    console.log("Adding Cheese");
    console.log("Order in Progress!");
  }
}
