public interface IMultiRestoApp {
    void displayMenus(XmlData xmlData);
    void displayRecommendations(XmlData xmlData);
}

@RequiredArgsConstructor
public class MultiRestoApp implements IMultiRestoApp {
    @Override
    public void displayMenus(XmlData xmlData) {
        // Displays menus using XML data
    }

    @Override
    public void displayRecommendations(XmlData xmlData) {
        // Displays recommendations using XML data
    }
}

public class FancyUIService {
    public void displayMenus(JsonData jsonData) {
        // Make use of the JsonData to fetch menus
    }

    public void displayRecommendations(JsonData jsonData) {
        // Make use of the JsonData to load recommendations
    }
}

public class FancyUIServiceAdapter implements IMultiRestoApp {
    private final FancyUIService fancyUIService;

    public FancyUIServiceAdapter() {
        fancyUIService = new FancyUIService();
    }

    @Override
    public void displayMenus(XmlData xmlData) {
        JsonData jsonData = convertXmlToJson(xmlData);
        fancyUIService.displayMenus(jsonData);
    }

    @Override
    public void displayRecommendations(XmlData xmlData) {
        JsonData jsonData = convertXmlToJson(xmlData);
        fancyUIService.displayRecommendations(jsonData);
    }

    private JsonData convertXmlToJson(XmlData xmlData) {
        // Convert XmlData to JsonData and return it
        return new JsonData();
    }
}

public static void main(String[] args) {
    IMultiRestoApp multiRestoApp = new MultiRestoApp();
    multiRestoApp.displayMenus(new XmlData());

    FancyUIServiceAdapter adapter = new FancyUIServiceAdapter();
    adapter.displayMenus(new XmlData());
}