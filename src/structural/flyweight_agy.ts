class Book {
  constructor(
    public readonly name: string,
    public readonly price: number,
    public readonly p1: string,
    public readonly p2: string,
    public readonly p3: string,
    public readonly p4: string,
    public readonly p5: string,
    public readonly p6: string,
    public readonly p7: string,
    public readonly p8: string,
    public readonly p9: string,
    public readonly p10: string,
    public readonly p11: string,
    public readonly p12: string,
    public readonly p13: string,
    public readonly p14: string,
    public readonly p15: string,
    public readonly p16: string,
    public readonly p17: string,
    public readonly p18: string,
    public readonly p19: string,
    public readonly p20: string,
    public readonly p21: string,
    public readonly p22: string,
    public readonly p23: string,
    public readonly p24: string,
    public readonly p25: string,
    public readonly p26: string,
    public readonly p27: string,
    public readonly p28: string,
  ) {}
}

class Store {
  public books: Book[] = [];

  storeBook(
    name: string,
    price: number,
    p1: string, p2: string, p3: string, p4: string, p5: string,
    p6: string, p7: string, p8: string, p9: string, p10: string,
    p11: string, p12: string, p13: string, p14: string, p15: string,
    p16: string, p17: string, p18: string, p19: string, p20: string,
    p21: string, p22: string, p23: string, p24: string, p25: string,
    p26: string, p27: string, p28: string
  ): void {
    this.books.push(
      new Book(
        name, price, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10,
        p11, p12, p13, p14, p15, p16, p17, p18, p19, p20, p21,
        p22, p23, p24, p25, p26, p27, p28
      )
    );
  }
}

const BOOK_TYPES = 2;
const BOOKS_TO_INSERT = 100_000;

function run() {
  if (global.gc) {
    global.gc();
  } else {
    console.warn("Warning: Run with 'node --expose-gc' to get accurate heap measurements.");
  }
  const memoryBefore = process.memoryUsage().heapUsed;

  const store = new Store();
  console.time("Execution Time");

  for (let i = 0; i < BOOKS_TO_INSERT / BOOK_TYPES; i++) {
    store.storeBook(
      getRandomName(), getRandomPrice(),
      "v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9", "v10",
      "v11", "v12", "v13", "v14", "v15", "v16", "v17", "v18", "v19", "v20",
      "v21", "v22", "v23", "v24", "v25", "v26", "v27", "v28"
    );
    store.storeBook(
      getRandomName(), getRandomPrice(),
      "w1", "w2", "w3", "w4", "w5", "w6", "w7", "w8", "w9", "w10",
      "w11", "w12", "w13", "w14", "w15", "w16", "w17", "w18", "w19", "w20",
      "w21", "w22", "w23", "w24", "w25", "w26", "w27", "w28"
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
  console.log(`Kept alive: ${store.books.length} books stored.`);
}

run();

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
