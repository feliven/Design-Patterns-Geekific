class Book {
  constructor(
    public readonly name: string,
    public readonly price: number,
    public readonly type: BookType,
  ) {}
}

class BookType {
  constructor(
    public readonly type: string,
    public readonly distributor: string,
    public readonly otherData: string,
  ) {}
}

class BookFactory {
  private static bookTypes: Map<string, BookType> = new Map();

  static getBookType(type: string, distributor: string, otherData: string): BookType {
    if (!this.bookTypes.get(type)) {
      this.bookTypes.set(type, new BookType(type, distributor, otherData));
    }
    return this.bookTypes.get(type)!;
  }
}

class Store {
  private books: Book[] = [];

  storeBook(name: string, price: number, type: string, distributor: string, otherData: string): void {
    const bookType = BookFactory.getBookType(type, distributor, otherData);
    this.books.push(new Book(name, price, bookType));
  }

  getNumberOfBooks(): number {
    return this.books.length;
  }

  displayBooks(): void {
    for (const book of this.books) {
      console.log(book);
    }
  }
}

const BOOK_TYPES = 2;
const BOOKS_TO_INSERT = 100_000;

export function insertBooks(): void {
  const store = new Store();

  console.time();

  for (let i = 0; i < BOOKS_TO_INSERT / BOOK_TYPES; i++) {
    store.storeBook(getRandomName(), getRandomPrice(), "Action", "Follett", "Stuff");
    store.storeBook(getRandomName(), getRandomPrice(), "Fantasy", "Ingram", "Extra");
  }
  store.displayBooks();

  console.timeEnd();
}

// insertBooks();

function insertBooks2(): void {
  // 1. Force GC to get a clean baseline
  if (global.gc) {
    global.gc();
  } else {
    console.warn("Run node with --expose-gc for accurate results");
  }
  const memoryBefore = process.memoryUsage().heapUsed;

  const store = new Store();

  console.time();

  for (let i = 0; i < BOOKS_TO_INSERT / BOOK_TYPES; i++) {
    store.storeBook(getRandomName(), getRandomPrice(), "Action", "Follett", "Stuff");
    store.storeBook(getRandomName(), getRandomPrice(), "Fantasy", "Ingram", "Extra");
  }
  // Comment out this line to avoid console buffer allocation overhead:
  // store.displayBooks();

  console.timeEnd();

  // 2. Force GC again to clean up any temporary objects created during the loop
  if (global.gc) {
    global.gc();
  }
  const memoryAfter = process.memoryUsage().heapUsed;

  const heapUsedBytes = memoryAfter - memoryBefore;
  console.log(`Heap Memory Used: ${(heapUsedBytes / 1024 / 1024).toFixed(2)} MB`);

  // Keep the store (and all books) alive so it isn't garbage collected before measurement
  console.log(`Kept alive: ${store.getNumberOfBooks()} books stored.`);
}

insertBooks2();

function getRandomPrice(): number {
  return Number((Math.random() * 100).toFixed(2));
}

/**
 * Generates a random letter sequence of random length (between 4 and 15).
 * Guarantees no leading/trailing spaces and no consecutive spaces.
 */
function getRandomName(): string {
  const length = getRandomInt(4, 15);
  let sequence = "";

  for (let i = 0; i < length; i++) {
    let char = getRandomCharacter();

    // Check if the character violates the rules:
    // 1. Cannot start with a space (index 0).
    // 2. Cannot end with a space (last index).
    // 3. Cannot have two consecutive spaces (previous char was a space).
    while (
      (char === " " && i === 0) ||
      (char === " " && i === length - 1) ||
      (char === " " && sequence[i - 1] === " ")
    ) {
      char = getRandomCharacter();
    }

    // Enforce casing rules for letters:
    if (char !== " ") {
      const isFirstCharOfWord = i === 0 || sequence[i - 1] === " ";
      char = isFirstCharOfWord ? char.toUpperCase() : char.toLowerCase();
    }

    sequence += char;
  }

  return sequence;
}

/**
 * Generates a random character mapping:
 * 1-26 -> A-Z
 * 27 -> " " (empty space)
 */
function getRandomCharacter(): string {
  // Math.random() generates [0, 1).
  // Math.random() * 27 gives [0, 27).
  // Math.floor(...) + 1 gives an integer from 1 to 27 inclusive.
  const value = Math.floor(Math.random() * 27) + 1;

  // 1 matches 'A' (char code 65), so we add 64 to the value.
  return value === 27 ? " " : String.fromCharCode(64 + value);
}

/**
 * Generates a random integer between min and max (inclusive).
 */
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
