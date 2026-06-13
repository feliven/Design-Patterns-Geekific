public abstract class Pizza {
    protected String sauce;
    protected String toppings;
    protected String crust;

    public abstract void deliver();
}

public class ItalianVeggiePizza extends Pizza {
    @Override
    public void deliver() {
        System.out.println("Adding Oil Sauce");
        System.out.println("Adding No Toppings");
        System.out.println("Adding Cheese");
        System.out.println("Crust is: Thin");
        System.out.println("Order in Progress!");
    }
}

public class ItalianPepperoniPizza extends Pizza {
    @Override
    public void deliver() {
        System.out.println("Adding Oil Sauce");
        System.out.println("Adding No Toppings");
        System.out.println("Adding Pepperoni");
        System.out.println("Crust is: Thin");
        System.out.println("Order in Progress!");
    }
}

public class AmericanVeggiePizza extends Pizza {
    @Override
    public void deliver() {
        System.out.println("Adding Super Secret Sauce");
        System.out.println("Adding Toppings: Everything");
        System.out.println("Adding Cheese");
        System.out.println("Crust is: Thick");
        System.out.println("Order in Progress!");
    }
}

public class AmericanPepperoniPizza extends Pizza {
    @Override
    public void deliver() {
        System.out.println("Adding Secret Sauce");
        System.out.println("Adding All Toppings");
        System.out.println("Adding Pepperoni");
        System.out.println("Crust is: Thick");
        System.out.println("Order in Progress!");
    }
}