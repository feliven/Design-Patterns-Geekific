@Data
public class Book {
    private final String name;
    private final double price;
    private final String type;
    private final String distributor;
    private final String otherData;
}

public class Book {
    private String name;
    private double price;
    private String type;
    private String distributor;
    private String otherData;

    public Book(String name, double price, String type, String distributor, String otherData) {
        this.name = name;
        this.price = price;
        this.type = type;
        this.distributor = distributor;
        this.otherData = otherData;
    }
}

public class Store {
    private final List<Book> books = new ArrayList<>();

    public void storeBook(String name, double price, String type, String distributor, String otherData) {
        books.add(new Book(name, price, type, distributor, otherData));
    }

    public void displayBooks() {
        for (Book book : books) {
            // render the books on the store website for example
        }
    }
}

private static final int BOOK_TYPES = 2;
private static final int BOOKS_TO_INSERT = 10_000_000;

public static void main(String[] args) {
    Store store = new Store();
    for (int i = 0; i < BOOKS_TO_INSERT / BOOK_TYPES; i++) {
        store.storeBook(getRandomName(), getRandomPrice(), "Action", "Follett", "Stuff");
        store.storeBook(getRandomName(), getRandomPrice(), "Fantasy", "Ingram", "Extra");
    }
    store.displayBooks();
}