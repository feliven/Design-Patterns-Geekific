public abstract class Vehicle {
    private String brand;
    private String model;
    private String color;

    protected Vehicle(Vehicle vehicle) {
        this.brand = vehicle.brand;
        this.model = vehicle.model;
        this.color = vehicle.color;
    }

    public abstract Vehicle clone();
}

public class Car extends Vehicle {
    private int topSpeed;

    public Car() {
        super(null);
    }

    public Car(Car car) {
        super(car);
        this.topSpeed = car.topSpeed;
    }

    @Override
    public Car clone() {
        return new Car(this);
    }
}

public class Bus extends Vehicle {
    private int doors;

    @Override
    public Bus clone() {
        return new Bus(this);
    }
}

public void clone(List<Vehicle> vehicles) {
    List<Vehicle> copyList = new ArrayList<>();
    for (Vehicle vehicle : vehicles) {
        copyList.add(vehicle.clone());
    }
}