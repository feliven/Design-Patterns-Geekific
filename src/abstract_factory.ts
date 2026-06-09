abstract class Company {
  assembleGpu(): Gpu {
    const gpu: Gpu = this.createGpu();
    gpu.assemble();
    return gpu;
  }

  abstract createGpu(): Gpu;
}

interface Gpu {
  assemble(): void;
}

class MsiManufacturer extends Company {
  createGpu(): Gpu {
    return new MsiGpu();
  }
}

class MsiGpu implements Gpu {
  assemble(): void {
    // business logic relevant to MSI
  }
}

class AsusManufacturer extends Company {
  createGpu(): Gpu {
    return new AsusGpu();
  }
}

class AsusGpu implements Gpu {
  assemble(): void {
    // business logic relevant to ASUS
  }
}

const msiManufacturer = new MsiManufacturer();
const msiGpu = msiManufacturer.assembleGpu();

const asusManufacturer = new AsusManufacturer();
const asusGpu = asusManufacturer.assembleGpu();

console.log({ msiGpu });
console.log({ asusGpu });
