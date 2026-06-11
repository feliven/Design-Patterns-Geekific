abstract class Company {
  abstract createGpu(): Gpu;
  abstract createMonitor(): Monitor;
}

interface Monitor {
  assemble(): void;
}

interface Gpu {
  assemble(): void;
}

class MsiManufacturer extends Company {
  createGpu(): Gpu {
    return new MsiGpu();
  }
  createMonitor(): Monitor {
    return new MsiMonitor();
  }
}

class MsiGpu implements Gpu {
  assemble(): void {
    // business logic relevant to MSI
  }
}

class MsiMonitor implements Monitor {
  assemble(): void {
    // business logic relevant to MSI
  }
}

class AsusManufacturer extends Company {
  createGpu(): Gpu {
    return new AsusGpu();
  }
  createMonitor(): Monitor {
    return new AsusMonitor();
  }
}

class AsusGpu implements Gpu {
  assemble(): void {
    // business logic relevant to ASUS
  }
}

class AsusMonitor implements Monitor {
  assemble(): void {
    // business logic relevant to ASUS
  }
}

const msiManufacturer = new MsiManufacturer();
const msiGpu = msiManufacturer.createGpu();

const asusManufacturer = new AsusManufacturer();
const asusMonitor = asusManufacturer.createMonitor();

console.log({ msiGpu });
console.log({ asusMonitor });
