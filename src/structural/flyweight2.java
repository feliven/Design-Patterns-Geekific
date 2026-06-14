@Data
public class Book {
    private final String name;
    private final double price;
    private final BookType type;
}

@Getter
@AllArgsConstructor
public class BookType {
    private final String type;
    private final String distributor;
    private final String otherData;
}

public class BookFactory {
    private static final Map<String, BookType> bookTypes = new HashMap<>();

    public static BookType getBookType(String type, String distributor, String otherData) {
        if (bookTypes.get(type) == null) {
            bookTypes.put(type, new BookType(type, distributor, otherData));
        }
        return bookTypes.get(type);
    }
}

public class Store {
    private final List<Book> books = new ArrayList<>();

    public void storeBook(String name, double price, String type, String distributor, String otherData) {
        BookType bookType = BookFactory.getBookType(type, distributor, otherData);
        books.add(new Book(name, price, bookType));
    }

    ...
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

    System.out.println(BOOKS_TO_INSERT + " Books Inserted");
    System.out.println("----------------------");
    System.out.println("Memory Usage:");
    System.out.println("Book Size (20 bytes) * " + BOOKS_TO_INSERT + " + BookTypes Size (30 bytes) * " + BOOK_TYPES + " ");
    System.out.println("----------------------");
    System.out.println("Total: " + ((BOOKS_TO_INSERT * 20 + BOOK_TYPES * 30) / 1024 / 1024) + "MB (instead of " + ((BOOKS_TO_INSERT * 50) / 1024 / 1024) + "MB)");
}
