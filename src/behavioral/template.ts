abstract class BaseGameLoader {
  load(): void {
    const data: number[] = this.loadLocalData();
    this.createObjects(data);
    this.downloadAdditionalFiles();
    this.cleanTempFiles();
    this.initializeProfiles();
  }

  abstract loadLocalData(): number[];
  abstract createObjects(data: number[]): void;
  abstract downloadAdditionalFiles(): void;
  abstract initializeProfiles(): void;

  protected cleanTempFiles(): void {
    console.log("Cleaning temporary files...");
    // Some Code...
  }
}

class WorldOfWarcraftLoader extends BaseGameLoader {
  loadLocalData(): number[] {
    console.log("Loading local WoW files...");
    // Some Warcraft Code...
    return [];
  }

  createObjects(_data: number[]): void {
    console.log("Creating WoW objects...");
    // Some Warcraft Code...
  }

  downloadAdditionalFiles(): void {
    console.log("Downloading WoW sounds...");
    // Some Warcraft Code...
  }

  initializeProfiles(): void {
    console.log("Loading WoW profiles...");
    // Some Warcraft Code...
  }
}

class DiabloLoader extends BaseGameLoader {
  loadLocalData(): number[] {
    console.log("Loading Diablo files...");
    // Some Diablo Code...
    return [];
  }

  createObjects(_data: number[]): void {
    console.log("Creating Diablo objects...");
    // Some Diablo Code...
  }

  downloadAdditionalFiles(): void {
    console.log("Downloading Diablo sounds...");
    // Some Diablo Code...
  }

  initializeProfiles(): void {
    console.log("Loading Diablo profiles...");
    // Some Diablo Code...
  }
}

const wow = new WorldOfWarcraftLoader();
console.log("WoW:");
wow.load();

console.log("---");

const dbl = new DiabloLoader();
console.log("dbl:");
dbl.load();
