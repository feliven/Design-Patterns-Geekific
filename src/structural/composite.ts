interface Box {
  calculatePrice(): number;
}

abstract class Product implements Box {
  constructor(
    protected title: string,
    protected price: number,
  ) {}

  getPrice(): number {
    console.log("price", this.price);
    return this.price;
  }

  abstract calculatePrice(): number;
}

class Book extends Product {
  constructor(title: string, price: number) {
    super(title, price);
  }

  calculatePrice(): number {
    return this.getPrice();
  }
}

class VideoGame extends Product {
  constructor(title: string, price: number) {
    super(title, price);
  }

  calculatePrice(): number {
    return this.getPrice();
  }
}

class CompositeBox implements Box {
  private children: Box[] = [];

  constructor(boxes: Box[]) {
    this.children.push(...boxes);
  }

  calculatePrice(): number {
    const aggregatePrice = this.children.reduce((sum, child) => {
      return sum + child.calculatePrice();
    }, 0);

    console.log({ aggregatePrice });

    return aggregatePrice;
  }
}

class DeliveryService {
  private box!: Box;

  setupOrder(boxes: Box[]): void {
    this.box = new CompositeBox(boxes);
    console.log("box:", JSON.stringify(this.box, null, 1));
  }

  calculateOrderPrice(): number {
    return this.box.calculatePrice();
  }
}

function setUpDeliveryOrder(): void {
  const deliveryService = new DeliveryService();

  deliveryService.setupOrder([
    new CompositeBox([new Book("Livro1", 100)]),
    new CompositeBox([
      new CompositeBox([new Book("Livro2", 200), new VideoGame("Livro3", 300)]),
      new VideoGame("Xbox", 400),
      new VideoGame("PlayStation", 500),
    ]),
  ]);

  const finalOrderAmount = deliveryService.calculateOrderPrice(); // 1500
  console.log({ finalOrderAmount });
}

setUpDeliveryOrder();
