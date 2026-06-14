class Book {
  constructor(
    public readonly name: string,
    public readonly price: number,
    public readonly weight: number,
    public readonly height: number,
    public readonly width: number,
    public readonly type: BookType,
  ) {}
}

class BookType {
  constructor(
    public readonly type: string,
    public readonly distributor: string,
    public readonly otherData: string,
    public readonly genre: string,
    public readonly publisher: string,
  ) {}
}

class BookFactory {
  private static bookTypes: Map<string, BookType> = new Map();

  static getBookType(type: string, distributor: string, otherData: string, genre: string, publisher: string): BookType {
    const key = `${type}_${distributor}_${otherData}_${genre}_${publisher}`;
    if (!this.bookTypes.get(key)) {
      this.bookTypes.set(key, new BookType(type, distributor, otherData, genre, publisher));
    }
    return this.bookTypes.get(key)!;
  }
}

class Store {
  private books: Book[] = [];

  storeBook(
    name: string,
    price: number,
    weight: number,
    height: number,
    width: number,
    type: string,
    distributor: string,
    otherData: string,
    genre: string,
    publisher: string,
  ): void {
    const bookType = BookFactory.getBookType(type, distributor, otherData, genre, publisher);
    this.books.push(new Book(name, price, weight, height, width, bookType));
  }

  getNumberOfBooks(): number {
    return this.books.length;
  }

  displayBooks(): void {
    for (const book of this.books) {
      console.log({ book });
    }
  }
}

const BOOK_TYPES = 2;
const BOOKS_TO_INSERT = 100_000;

function insertBooks(): void {
  if (global.gc) {
    global.gc();
  } else {
    console.warn("Warning: Run with 'node --expose-gc' to get accurate heap measurements.");
  }
  const memoryBefore = process.memoryUsage().heapUsed;

  const store = new Store();
  console.time("Execution Time");

  for (let i = 0; i < BOOKS_TO_INSERT / BOOK_TYPES; i++) {
    store.storeBook(getRandomName(), getRandomPrice(), 1.2, 20, 15, "Action", "Follett", "Stuff", "Fiction", "Penguin");
    store.storeBook(
      getRandomName(),
      getRandomPrice(),
      0.8,
      18,
      12,
      "Fantasy",
      "Ingram",
      "Extra",
      "Novel",
      "HarperCollins",
    );
  }

  console.timeEnd("Execution Time");

  if (global.gc) {
    global.gc();
  }
  const memoryAfter = process.memoryUsage().heapUsed;

  const heapUsedBytes = memoryAfter - memoryBefore;
  console.log(`Heap Memory Used: ${(heapUsedBytes / 1024 / 1024).toFixed(2)} MB`);

  // Keep the store (and all books) alive so it isn't garbage collected before measurement
  console.log(`Kept alive: ${store.getNumberOfBooks()} books stored.`);
}

insertBooks();

function getRandomPrice(): number {
  return Number((Math.random() * 100).toFixed(2));
}

function getRandomName(): string {
  const length = getRandomInt(4, 15);
  let sequence = "";

  for (let i = 0; i < length; i++) {
    let char = getRandomCharacter();

    while (
      (char === " " && i === 0) ||
      (char === " " && i === length - 1) ||
      (char === " " && sequence[i - 1] === " ")
    ) {
      char = getRandomCharacter();
    }

    if (char !== " ") {
      const isFirstCharOfWord = i === 0 || sequence[i - 1] === " ";
      char = isFirstCharOfWord ? char.toUpperCase() : char.toLowerCase();
    }

    sequence += char;
  }

  return sequence;
}

function getRandomCharacter(): string {
  const value = Math.floor(Math.random() * 27) + 1;
  return value === 27 ? " " : String.fromCharCode(64 + value);
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
