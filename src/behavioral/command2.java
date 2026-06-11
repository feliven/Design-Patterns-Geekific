public interface Command {
    void execute();
}

public class SwitchLightsCommand implements Command {
    private Light light;

    public SwitchLightsCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        light.switchLights();
    }
}

public class Room {
    Command command;

    public Room() { }

    public void setCommand(Command command) {
        this.command = command;
    }

    public void executeCommand() {
        command.execute();
    }
}

public static void main(String[] args) {
    Room livingRoom = new Room();
    livingRoom.setCommand(
        new SwitchLightsCommand(new Light())
    );
    livingRoom.executeCommand();
}

// public class Room {
//     private Light light;

//     public Room() {
//         this.light = new Light();
//     }

//     public void switchLights() {
//         light.switchLights();
//     }
// }

public class Light {
    private boolean switchedOn;

    public void switchLights() {
        switchedOn = !switchedOn;
    }
}

// public class FloorLamp {
//     private Light light;

//     public FloorLamp() {
//         this.light = new Light();
//     }

//     public void switchLights() {
//         light.switchLights();
//     }
// }

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

