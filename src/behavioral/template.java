public abstract class BaseGameLoader {
    public void load() {
        byte[] data = loadLocalData();
        createObjects(data);
        downloadAdditionalFiles();
        cleanTempFiles();
        initializeProfiles();
    }

    abstract byte[] loadLocalData();
    abstract void createObjects(byte[] data);
    abstract void downloadAdditionalFiles();
    abstract void initializeProfiles();

    protected void cleanTempFiles() {
        System.out.println("Cleaning temporary files...");
        // Some Code...
    }
}

public class WorldOfWarcraftLoader extends BaseGameLoader {
    @Override
    byte[] loadLocalData() {
        System.out.println("Loading local WoW files...");
        // Some Warcraft Code...
        return new byte[0];
    }

    @Override
    void createObjects(byte[] data) {
        System.out.println("Creating WoW objects...");
        // Some Warcraft Code...
    }

    @Override
    void downloadAdditionalFiles() {
        System.out.println("Downloading WoW sounds...");
        // Some Warcraft Code...
    }

    @Override
    void initializeProfiles() {
        System.out.println("Loading WoW profiles...");
        // Some Warcraft Code...
    }
}

public class DiabloLoader extends BaseGameLoader {
    @Override
    byte[] loadLocalData() {
        System.out.println("Loading Diablo files...");
        // Some Diablo Code...
        return new byte[0];
    }

    @Override
    void createObjects(byte[] data) {
        System.out.println("Creating Diablo objects...");
        // Some Diablo Code...
    }

    @Override
    void downloadAdditionalFiles() {
        System.out.println("Downloading Diablo sounds...");
        // Some Diablo Code...
    }

    @Override
    void initializeProfiles() {
        System.out.println("Loading Diablo profiles...");
        // Some Diablo Code...
    }
}