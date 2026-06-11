public class Room {
    private Light light;

    public Room() {
        this.light = new Light();
    }

    public void switchLights() {
        light.setSwitchedOn(!light.isSwitchedOn());
    }
}

public class Kitchen extends Room {
    private Oven oven;
    //
}

public class Bathroom extends Room {
    private String hotWater;
    //
}

public class LivingRoom extends Room {
    private Windows windows;
    //
}

public class Bedroom extends Room {
    private String music;
    //
}

public class Light {
    private boolean switchedOn;

    public boolean isSwitchedOn() {
        return switchedOn;
    }

    public void setSwitchedOn(boolean switchedOn) {
        this.switchedOn = switchedOn;
    }
}

public class House {
    List<Room> rooms;

    public House() {
        rooms = new ArrayList<>();
    }

    public void addRoom(Room room) {
        rooms.add(room);
    }
}

public static void main(String[] args) {
    House house = new House();
    house.addRoom(new LivingRoom());
    house.addRoom(new Bathroom());
    house.addRoom(new Kitchen());
    house.addRoom(new Bedroom());
    house.addRoom(new Bedroom());
    house.rooms.forEach(Room::switchLights);
}

