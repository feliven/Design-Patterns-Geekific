public class Director {

    public void buildBugatti(CarBuilder builder) {
        builder.brand("Bugatti")
            .color("Blue")
            .nbrDoors(2)
            .engine("8L")
            .height(115);
    }

    public void buildLambo(CarBuilder builder) {
        builder.brand("Lamborghini")
            .model("Aventador")
            .color("Yellow")
            .nbrDoors(2)
            .height(115);
    }

}

public class CarBuilder {
    private int id;
    private String brand;
    private String model;
    private String color;

    public CarBuilder id(int id) {
        this.id = id;
        return this;
    }

    public CarBuilder brand(String brand) {
        this.brand = brand;
        return this;
    }

    public CarBuilder model(String model) {
        this.model = model;
        return this;
    }

    public CarBuilder color(String color) {
        this.color = color;
        return this;
    }

    public Car build() {
        return new Car(id, brand, model, color);
    }
}

public class Car {
    private final int id;
    private final String brand;
    private final String model;
    private final String color;

    Car(int id, String brand, String model, String color) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.color = color;
    }
}

CarBuilder builder = new CarBuilder();
builder.id(2122)
    .brand("Bugatti")
    .model("Chiron")
    .color("Blue");
Car car = builder.build();

Director director = new Director();
CarBuilder builder = new CarBuilder();
director.buildBugatti(builder);
Car car = builder.build();