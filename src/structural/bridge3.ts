abstract class Pizza {
  protected crust: string = "Thin";
  protected sauce: string = "Tomato sauce";
  protected toppings: string | null = null;

  abstract setCrust(crust: string): void;
  abstract setSauce(sauce: string): void;
  abstract setToppings(toppings: string | null): void;

  abstract assemble(): void;
  abstract qualityCheck(): void;
}

class PepperoniPizza extends Pizza {
  setToppings(toppings: string | null): void {
    this.toppings = toppings;
  }

  setSauce(sauce: string): void {
    this.sauce = sauce;
  }

  setCrust(crust: string): void {
    this.crust = crust;
  }

  assemble(): void {
    console.log("Adding Sauce: " + this.sauce);
    console.log(this.toppings ? "Adding Toppings: " + this.toppings : "No toppings added");
    console.log("Adding Pepperoni");
  }

  qualityCheck(): void {
    console.log("Crust is: " + this.crust);
  }
}

class VeggiePizza extends Pizza {
  setToppings(toppings: string | null): void {
    this.toppings = toppings;
  }

  setSauce(sauce: string): void {
    this.sauce = sauce;
  }

  setCrust(crust: string): void {
    this.crust = crust;
  }

  assemble(): void {
    console.log("Adding Sauce: " + this.sauce);
    console.log(this.toppings ? "Adding Toppings: " + this.toppings : "No toppings added");
    console.log("Adding Cheese");
  }

  qualityCheck(): void {
    console.log("Crust is: " + this.crust);
  }
}

abstract class Restaurant {
  constructor(protected pizza: Pizza) {}

  abstract makeCrust(): void;
  abstract addSauce(): void;
  abstract addToppings(): void;

  deliver(): void {
    this.makeCrust();
    this.addSauce();
    this.addToppings();
    this.pizza.assemble();
    this.pizza.qualityCheck();
    console.log("Order in Progress!");
  }
}

class ItalianRestaurant extends Restaurant {
  constructor(pizza: Pizza) {
    super(pizza);
  }

  makeCrust(): void {
    this.pizza.setCrust("Thin");
  }

  addSauce(): void {
    this.pizza.setSauce("Oil");
  }

  addToppings(): void {
    this.pizza.setToppings(null);
  }
}

class AmericanRestaurant extends Restaurant {
  constructor(pizza: Pizza) {
    super(pizza);
  }

  makeCrust(): void {
    this.pizza.setCrust("Thick");
  }

  addSauce(): void {
    this.pizza.setSauce("Super Secret Recipe");
  }

  addToppings(): void {
    this.pizza.setToppings("Everything");
  }
}

function makePizza(): void {
  const americanRestaurant = new AmericanRestaurant(new PepperoniPizza());
  americanRestaurant.deliver();

  console.log("---");

  const italianRestaurant = new ItalianRestaurant(new VeggiePizza());
  italianRestaurant.deliver();
}

makePizza();
