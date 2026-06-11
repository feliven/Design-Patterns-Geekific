interface Burger {
  prepare(): void;
}

class BeefBurger implements Burger {
  prepare(): void {
    //
  }
}

class VeggieBurger implements Burger {
  prepare(): void {
    //
  }
}

abstract class Restaurant {
  burger = this.createBurger();

  orderBurger(): Burger {
    this.burger.prepare();
    return this.burger;
  }

  public abstract createBurger(): Burger;
}

class BeefBurgerRestaurant extends Restaurant {
  createBurger(): BeefBurger {
    return new BeefBurger();
  }
}

class VeggieBurgerRestaurant extends Restaurant {
  createBurger(): VeggieBurger {
    return new VeggieBurger();
  }
}

const beefResto: Restaurant = new BeefBurgerRestaurant();
const beefBurger: Burger = beefResto.orderBurger();

const veggieResto: Restaurant = new VeggieBurgerRestaurant();
const veggieBurger: Burger = veggieResto.orderBurger();

console.log({ beefBurger });
console.log({ veggieBurger });
