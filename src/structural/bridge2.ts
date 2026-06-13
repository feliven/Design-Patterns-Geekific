abstract class Pizza {
  constructor(
    protected sauce: string,
    protected toppings: string,
    protected crust: string,
  ) {}

  abstract deliver(): void;
}

class ItalianVeggiePizza extends Pizza {
  deliver(): void {
    console.log("Adding Oil Sauce");
    console.log("Adding No Toppings");
    console.log("Adding Cheese");
    console.log("Crust is: Thin");
    console.log("Order in Progress!");
  }
}

class ItalianPepperoniPizza extends Pizza {
  deliver(): void {
    console.log("Adding Oil Sauce");
    console.log("Adding No Toppings");
    console.log("Adding Pepperoni");
    console.log("Crust is: Thin");
    console.log("Order in Progress!");
  }
}

class AmericanVeggiePizza extends Pizza {
  deliver(): void {
    console.log("Adding Super Secret Sauce");
    console.log("Adding Toppings: Everything");
    console.log("Adding Cheese");
    console.log("Crust is: Thick");
    console.log("Order in Progress!");
  }
}

class AmericanPepperoniPizza extends Pizza {
  deliver(): void {
    console.log("Adding Secret Sauce");
    console.log("Adding All Toppings");
    console.log("Adding Pepperoni");
    console.log("Crust is: Thick");
    console.log("Order in Progress!");
  }
}
