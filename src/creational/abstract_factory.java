public abstract class Company {
    public Gpu assembleGpu() {
        Gpu gpu = createGpu();
        gpu.assemble();
        return gpu;
    }

    public abstract Gpu createGpu();
}

public interface Gpu {
    void assemble();
}

public class MsiManufacturer extends Company {
    @Override
    public Gpu createGpu() {
        return new MsiGpu();
    }
}

public class MsiGpu implements Gpu {
    @Override
    public void assemble() {
        // business logic relevant to MSI
    }
}

public class AsusManufacturer extends Company {
    @Override
    public Gpu createGpu() {
        return new AsusGpu();
    }
}

public class AsusGpu implements Gpu {
    @Override
    public void assemble() {
        // business logic relevant to ASUS
    }
}