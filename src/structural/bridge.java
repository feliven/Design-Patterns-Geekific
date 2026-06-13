public abstract class Pizza {
    protected String sauce;
    protected String toppings;
    protected String crust;

    public abstract void deliver();
}

public class PepperoniPizza extends Pizza {
    @Override
    public void deliver() {
        System.out.println("Adding Sauce");
        System.out.println("Adding Toppings");
        System.out.println("Adding Pepperoni");
        System.out.println("Order in Progress!");
    }
}

public class VeggiePizza extends Pizza {
    @Override
    public void deliver() {
        System.out.println("Adding Sauce");
        System.out.println("Adding Different Toppings");
        System.out.println("Adding Cheese");
        System.out.println("Order in Progress!");
    }
}