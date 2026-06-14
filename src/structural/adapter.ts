class JsonData {}
class XmlData {}

interface IMultiRestoApp {
  displayMenus(xmlData: XmlData): void;
  displayRecommendations(xmlData: XmlData): void;
}

class MultiRestoApp implements IMultiRestoApp {
  displayMenus(_xmlData: XmlData): void {
    console.log("Displays menus using XML data");
  }

  displayRecommendations(_xmlData: XmlData): void {
    console.log("Displays recommendations using XML data");
  }
}

class FancyUIService {
  displayMenus(_jsonData: JsonData): void {
    console.log("Make use of the JsonData to fetch menus");
  }

  displayRecommendations(_jsonData: JsonData): void {
    console.log("Make use of the JsonData to load recommendations");
  }
}

class FancyUIServiceAdapter implements IMultiRestoApp {
  fancyUIService: FancyUIService;

  constructor() {
    this.fancyUIService = new FancyUIService();
  }

  displayMenus(xmlData: XmlData): void {
    const jsonData = this.convertXmlToJson(xmlData);
    this.fancyUIService.displayMenus(jsonData);
  }

  displayRecommendations(xmlData: XmlData): void {
    const jsonData = this.convertXmlToJson(xmlData);
    this.fancyUIService.displayRecommendations(jsonData);
  }

  private convertXmlToJson(_xmlData: XmlData): JsonData {
    // Convert XmlData to JsonData and return it
    return new JsonData();
  }
}

function dataAdapter(): void {
  const multiRestoApp = new MultiRestoApp();
  multiRestoApp.displayMenus(new XmlData());

  const adapter = new FancyUIServiceAdapter();
  adapter.displayMenus(new XmlData());
}

dataAdapter();
