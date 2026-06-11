public interface Prototype {
    Car clone();
}

public class Car implements Prototype {
    private String brand;
    private String model;
    private String color;
    private int topSpeed;

    public Car() { }

    public Car(Car car) {
        this.brand = car.brand;
        this.model = car.model;
        this.color = car.color;
        this.topSpeed = car.topSpeed;
    }

    @Override
    public Car clone() {
        return new Car(this);
    }

}

